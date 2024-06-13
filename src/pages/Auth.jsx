import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import GoToAnywhere from '../supportiveFunctions/GoToAnywhere';
import {useFocusEffect} from '@react-navigation/native';
import {BackHandler} from 'react-native';

import axios from 'axios';
import {baseAppUrl} from '../supportiveFunctions/Local';
import {ALERT_TYPE, Dialog} from 'react-native-alert-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logo from '../../assets/Logo.jpg';
const Auth = ({navigation}) => {
  const [agentInfo, setAgentInfo] = useState({
    email: '',
    password: '',
  });
  const onChangeHandler = (value, field) => {
    setAgentInfo({...agentInfo, [field]: value});
  };

  useFocusEffect(
    React.useCallback(() => {
      const backPressHandler = () => {
        navigation.reset({
          index: 0,
          routes: [{name: 'splash'}],
        });
        BackHandler.exitApp();
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', backPressHandler);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', backPressHandler);
      };
    }, []), // Empty dependency array ensures that the effect runs only once when the component mounts
  );

  const [isUserLogged, setIsUserLogged] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userStatus = await AsyncStorage.getItem('agentId');

        if (userStatus) {
          setIsUserLogged(true);
          navigation.navigate('home');
        } else {
          setIsUserLogged(false);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
        // Handle error if needed
      }
    };
    fetchData(); // Call the fetchData function
  }, []); // Empty dependency array means this effect runs only once on mount
  const saveHandler = async () => {
    try {
      await axios
        .post(`${baseAppUrl}/api/login`, {
          email: agentInfo.email,
          password: agentInfo.password,
        })
        .then(async res => {
          if (res.status == 200) {
            Dialog.show({
              type: ALERT_TYPE.SUCCESS,
              title: 'Success',
              textBody: `${res.data?.message}`,
              button: 'close',
            });
            await AsyncStorage.setItem('agentId', res.data.agentId);
            navigation.navigate('home');
          } else {
            Dialog.show({
              type: ALERT_TYPE.DANGER,
              title: 'Failed',
              textBody: `${res.data.message}`,
              button: 'close',
            });
          }
        });
    } catch (error) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Failed',
        textBody: `Server Internal Error!`,
        button: 'close',
      });
    }
  };

  return (
    !isUserLogged && (
      <ScrollView className="h-screen bg-black pt-12">
        <Image source={logo} className="w-[200px]  m-auto h-[200px]" />
        <View className="bg-white   p-10  rounded-tl-[90px] ">
          <Text className="text-black font-bold text-[15px] mt-10"> Email</Text>
          <TextInput
            onChangeText={value => onChangeHandler(value, 'email')}
            className=" border-b-[1px] text-[13px]  font-light mt-0 pt-0 pb-1 "
            placeholder="hello@gmail.com"
          />
          <Text className="text-black font-bold  text-[15px] mt-10">
            {' '}
            Password
          </Text>
          <TextInput
            onChangeText={value => onChangeHandler(value, 'password')}
            className=" border-b-[1px] text-[13px]  font-light mt-0 pt-0 pb-1 "
            placeholder="type here123"
          />
          <TouchableOpacity
            onPress={saveHandler}
            className="bg-black mt-8 p-3 rounded">
            <Text className="text-center  font-extrabold text-[17px] text-white">
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => GoToAnywhere('forgetpass', navigation)}>
            <Text className="text-center text-[12px] font-semibold text-black mt-4">
              Forgot Your login details?
            </Text>
          </TouchableOpacity>
          <View className=" h-[150px] ">
            <Text></Text>
          </View>
          <TouchableOpacity onPress={() => GoToAnywhere('signup', navigation)}>
            <Text className="text-center text-black  text-[12px] ">
              Dont have any account?{' '}
              <Text className="font-bold text-black">Sign up</Text>{' '}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  );
};

export default Auth;
