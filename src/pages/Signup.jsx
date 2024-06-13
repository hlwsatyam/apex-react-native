import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import GoToAnywhere from '../supportiveFunctions/GoToAnywhere';
import PrevNavigation from '../components/PreNavigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {launchImageLibrary} from 'react-native-image-picker';
import {Image} from 'react-native';
import {ALERT_TYPE, Dialog} from 'react-native-alert-notification';
import {baseAppUrl} from '../supportiveFunctions/Local';
import axios from 'axios';
import logo from '../../assets/Logo.jpg';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Signup = ({navigation}) => {
  const [agentDetails, setAgentDetails] = React.useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
    aadhaarNumber: '',
    panNumber: '',
  });
  const [userPic, setUserPic] = React.useState(null);
  const [adhaarFrontPic, setAdhaarFrontPic] = React.useState(null);
  const [adhaarBackPic, setAdhaarBackPic] = React.useState(null);

  const pickImage = async nameOfImage => {
    try {
      launchImageLibrary(
        {
          mediaType: 'photo',
          quality: 1,
          maxWidth: 640,
          maxHeight: 480,
          selectionLimit: 1,
        },
        response => {
          if (response.didCancel) {
            return console.log('User cancelled image picker');
          } else if (response.errorMessage) {
            return console.log('ImagePicker Error: ', response.errorMessage);
          } else {
            const selectedImage = response.assets[0].uri;
            if (nameOfImage === 'user') {
              setUserPic(selectedImage);
            } else if (nameOfImage === 'adhaarFront') {
              setAdhaarFrontPic(selectedImage);
            } else if (nameOfImage === 'adhaarBack') {
              setAdhaarBackPic(selectedImage);
            }
          }
        },
      );
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const onChangeHandler = (value, field) => {
    setAgentDetails({...agentDetails, [field]: value});
  };
  const handleSubmit = async () => {
    const formData = new FormData();
    try {
      Object.entries(agentDetails).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append(`userPic`, {
        uri: userPic,
        type: `image/*`,
        name: 'image',
      });

      if (!userPic) {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Failed',
          textBody: `Please Upload All The image!`,
          button: 'close',
        });
        return;
      }
      await axios
        .post(`${baseAppUrl}/api/signup`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
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
      console.log(error);
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Failed',
        textBody: `Server Internal Error!`,
        button: 'close',
      });
    }
  };
  return (
    <View className="flex-1 bg-black">
      <PrevNavigation
        iconColor={'white'}
        styleForText={'text-white'}
        text="Signup"
        navigation={navigation}
      />
      <Image source={logo} className="w-[100px]  m-auto h-[100px]" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        className="p-6 rounded-tl-[100px] bg-white">
        <Text className="text-center  text-xl font-bold ">Signup</Text>
        <TextInput
          onChangeText={value => onChangeHandler(value, 'name')}
          className="  bg-neutral-300 mt-4 p-3 rounded-2xl"
          placeholder="Full Name"
          placeholderTextColor={'gray'}
        />
        <TextInput
          className="  bg-neutral-300 mt-4 p-3 rounded-2xl"
          onChangeText={value => onChangeHandler(value, 'email')}
          placeholder="Email"
        />
        <TextInput
          className="  bg-neutral-300 mt-4 p-3 rounded-2xl"
          onChangeText={value => onChangeHandler(value, 'password')}
          placeholder="Password"
        />
        <TextInput
          className="  bg-neutral-300 mt-4 p-3 rounded-2xl"
          onChangeText={value => onChangeHandler(value, 'confirmPassword')}
          placeholder="Confirm Password"
        />

        <TouchableOpacity
          className="my-4  border rounded-2xl p-2"
          onPress={() => pickImage('user')}>
          {userPic ? (
            <View className="flex-row items-center ">
              <Text className="text-left    text-black  ">
                Upload Your Image :
              </Text>
              <Image
                source={{uri: userPic}}
                className="h-[80px] rounded-full w-[80px] m-auto "
              />
            </View>
          ) : (
            <View className="flex-row justify-between items-center ">
              <Text className="text-left  text-black  ">Upload Your Image</Text>
              <Text className="text-blue-600">Click Here</Text>
            </View>
          )}
        </TouchableOpacity>

        <TextInput
          className="  bg-neutral-300 mt-4 p-3 rounded-2xl"
          onChangeText={value => onChangeHandler(value, 'aadhaarNumber')}
          placeholder="Aadhaar Number"
        />
        <TextInput
          className="  bg-neutral-300 mt-4 p-3 rounded-2xl"
          onChangeText={value => onChangeHandler(value, 'panNumber')}
          placeholder="PAN Number"
        />

        <TouchableOpacity
          onPress={handleSubmit}
          className="bg-blue-600 mt-4 rounded-xl">
          <Text className="text-center p-3 text-[18px] font-bold text-white">
            Continue
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-row items-center mt-4 justify-center gap-x-2 "
          onPress={() => GoToAnywhere('login', navigation)}>
          <Text className="  text-black ">Already Have Account?</Text>
          <Text className="text-center font-semibold ">Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Signup;
