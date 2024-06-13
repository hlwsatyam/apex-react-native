import {View, Text, Image, StatusBar, TextInput} from 'react-native';
import React, {useState} from 'react';

import axios from 'axios';
import {baseApiURL} from '../../components/Variable';
import {ALERT_TYPE, Dialog} from 'react-native-alert-notification';
import {baseAppUrl} from '../supportiveFunctions/Local';
import PrevNavigation from '../components/PreNavigation';
import LoadingButton from '../components/LoadingButton';

import logo from '../../assets/Logo.jpg';
import {TouchableOpacity} from 'react-native';
const ForgotPassword = ({navigation}) => {
  const [forgetPasswordError, setForgotPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      setIsLoading(true);
      await axios
        .post(`${baseAppUrl}/api/forgetPassword`, {
          email,
        })
        .then(res => {
          if (res.status == 200) {
            Dialog.show({
              type: ALERT_TYPE.SUCCESS,
              title: 'Success',
              textBody: `We Sent Your Password On ${email}`,
              button: 'close',
            });
            setIsLoading(false);
          } else {
            Dialog.show({
              type: ALERT_TYPE.DANGER,
              title: 'Failed',
              textBody: `${res.data.message}`,
              button: 'close',
            });
            setIsLoading(false);
          }
        });
    } catch (error) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Failed',
        textBody: `Server Internal Error!`,
        button: 'close',
      });
      setIsLoading(false);
    }
  };
  return (
    <View className="flex-1  bg-black  ">
      <PrevNavigation
        iconColor={'white'}
        styleForText={'text-white'}
        navigation={navigation}
        className={'px-2'}
        text={'Forgot Password'}
      />
      <Image source={logo} className="w-[150px]  m-auto h-[150px]" />
      <View className="px-2 bg-white flex-1 rounded-tl-[100px] p-12">
        <Text className="text-center text-black font-bold text-xl ">
          Find your account
        </Text>

        <Text className="text-center mb-8 font-bold text-[10px] ">
          Enter Your email linked Your Account
        </Text>

        <TextInput
          className="border-[1px] border-neutral-400 p-2 rounded-md"
          onChangeText={text => setEmail(text)}
          placeholder={'Enter your email'}
        />
        <View>
          <Text>{forgetPasswordError}</Text>
        </View>
        {isLoading ? (
          <LoadingButton />
        ) : (
          <TouchableOpacity
            className="bg-blue-500 rounded p-1"
            onPress={handleSubmit}>
            <Text className="text-white text-center font-semibold text-[13px]">
              NEXT
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
export default ForgotPassword;
