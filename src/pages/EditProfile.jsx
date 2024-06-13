import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import axios from 'axios';
import profileLogo from '../../assets/apex.jpg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ALERT_TYPE, Dialog} from 'react-native-alert-notification';
import PrevNavigation from '../components/PreNavigation';
import {Button} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNPickerSelect from 'react-native-picker-select';
import {useNavigation} from '@react-navigation/native';
import CountrySelection from '../components/SelectAddress';
import {baseAppUrl} from '../supportiveFunctions/Local';
import {Image} from 'react-native';
const EditProfile = ({}) => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({
    name: '',
    nickname: '',
    email: '',
    phone: '',
    occupation: '',
    experience: '',
    country: '',
    userID: '',
    state: '',
    city: '',
    image: null,
  });
  useEffect(() => {
    FetUserData();
  }, []);
  const FetUserData = async () => {
    const token = await AsyncStorage.getItem('guestToken');
    if (!token) {
      return;
    }
    try {
      await axios
        .post(`${baseAppUrl}/api/users`, {
          token: token,
        })
        .then(res => {
          console.log(res.data);
          if (res.status === 200) {
            setUserData({
              name: res.data?.name || 'Guest',
              email: res.data?.email || 'guest@bookie.com',
              nickname: res.data?.nickname || 'Guest',
            });
          } else {
            Dialog.show({
              type: ALERT_TYPE.DANGER,
              title: 'Failed',
              textBody: `${res.data?.message}`,
              button: 'close',
            });
          }
        });
    } catch (error) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Failed',
        textBody: `${error.message}`,
        button: 'close',
      });
    }
  };
  const saveHandler = async () => {
    const token = await AsyncStorage.getItem('agentId');
    if (!token) {
      return Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Failed',
        textBody: `Authentication Failed!`,
        button: 'close',
      });
    }
    try {
      await axios
        .post(`${baseAppUrl}/api/updateuser`, {
          agentId: token,
          name: userData.name,
          phone: userData.phone,
          occupation: userData.occupation,
          experience: userData.experience,
          country: userData.country,
          state: userData.state,
          city: userData.city,
        })
        .then(res => {
          if (res.status === 200) {
            setUserData({
              name: res.data?.name || 'Guest',
              email: res.data?.email || 'guest@bookie.com',
              nickname: res.data?.nickname || 'Guest',
            });
            navigation.navigate('setting');
          } else {
            Dialog.show({
              type: ALERT_TYPE.DANGER,
              title: 'Failed',
              textBody: `${res.data?.message}`,
              button: 'close',
            });
          }
        });
    } catch (error) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Failed',
        textBody: `${error.message}`,
        button: 'close',
      });
    }
  };
  const onChangeText = (value, name) => {
    setUserData(PREV => ({...PREV, [name]: value}));
  };
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem('agentId');
      const response = await axios.post(`${baseAppUrl}/api/v1/user`, {
        token,
      });
      if (response.status === 200) {
        setUserData({
          name: response.data?.name,
          userID: response.data?.userID,
          email: response.data?.email,
          occupation: response.data?.occupation,
          experience: response.data?.experience,
          country: response.data?.country,
          state: response.data?.state,
          city: response.data?.city,
          image: response.data?.userPic,
          phone: response.data?.phone,
        });
      } else {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Failed',
          textBody: `${response.data?.message}`,
          button: 'close',
        });
      }
    } catch (error) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Failed',
        textBody: `${error.message}`,
        button: 'close',
      });
    }
  };
  return (
    <View className="flex-1">
      <PrevNavigation
        text={'Edit Profile'}
        navigation={navigation}
        iconColor={'black'}
        styleForText={'text-black font-bold '}
        className="px-3"
      />
      <ScrollView className=" bg-black mt-4 pt-6 ">
        <Text className="text-white text-2xl font-bold  text-center">
          {userData.name}
        </Text>
        <Text className="text-white font-mono text-[11px] text-center">
          {userData.userID}
        </Text>
        <View className="bg-white rounded-t-[70px] px-5 mt-5 ">
          <TouchableOpacity
            onPress={() => null}
            className="flex-row gap-x-4 my-2 justify-center items-center ">
            <Image
              source={
                userData.image
                  ? {
                      uri: `${baseAppUrl}/uploads/${userData.image}`,
                    }
                  : profileLogo
              }
              className="w-[100px] rounded-full h-[100px]"
            />
          </TouchableOpacity>
          <View className="mt-0 flex-row items-center px-4  border rounded-full h-[50px] ">
            <Icon name="user" size={17} color="black" />
            <TextInput
              className="px-3"
              value={userData.name}
              name={'name'}
              onChangeText={text => onChangeText(text, 'name')}
            />
          </View>
          <View className="mt-3 flex-row items-center px-4  border rounded-full h-[50px] ">
            <Icon name="mobile" size={17} color="black" />
            <TextInput
              className="px-3"
              value={userData?.phone}
              name={'Phone'}
              onChangeText={text => onChangeText(text, 'phone')}
            />
          </View>
          <View className="mt-3 flex-row items-center px-4  border rounded-full h-[50px] ">
            <Icon name="envelope" size={17} color="black" />
            <TextInput
              className="px-3 text-black "
              value={userData?.email}
              name={'email'}
              readOnly
              onChangeText={text => onChangeText(text, 'email')}
            />
          </View>
          <CountrySelection userData={userData} setUserData={setUserData} />
          <View className="mt-3">
            <Text className="text-sm font-extralight">Occupation*</Text>
            <RNPickerSelect
              onValueChange={value =>
                setUserData(PREV => ({...PREV, occupation: value}))
              }
              value={userData.occupation}
              placeholder={{
                label: 'Your Occupation*',
                value: null,
              }}
              items={[
                {label: 'Bank Employee', value: 'bank employee'},
                {label: 'Student', value: 'student'},
                {label: 'Financial Advisor', value: 'financial advisor'},
                {label: 'DSA', value: 'dsa'},
                {label: 'Influencer', value: 'influencer'},
                {label: 'Others', value: 'others'},
              ]}
            />
          </View>
          <View className="mt-3">
            <Text className="text-sm font-extralight">Work Exprience*</Text>
            <RNPickerSelect
              onValueChange={value =>
                setUserData(PREV => ({...PREV, experience: value}))
              }
              placeholder={{
                label: 'Experience*',
                value: null,
              }}
              value={userData.experience}
              items={[
                {label: '<1 Years', value: '<1 Years'},
                {label: '1-3 Years', value: '1-3 Years'},
                {label: '5-10 Years', value: '5-10 Years'},
                {label: '10+ Years', value: '10+ Years'},
              ]}
            />
          </View>
          <View className="my-3">
            <Button onPress={saveHandler} title={'Update'} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default EditProfile;