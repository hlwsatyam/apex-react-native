import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {baseAppUrl} from '../supportiveFunctions/Local';
import profileLogo from '../..//assets/apex.jpg';
import {Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const UserHeader = () => {
  const [userDetails, setUserDetails] = useState({
    name: 'Apex App',
    image: profileLogo,
    email: 'apex@rt.com',
    phone: '90999039223',
  });
  useFocusEffect(
    React.useCallback(() => {
      fetchData(); // Call your fetchData function
    }, []),
  );
  const [image, setImage] = useState(null);
  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem('agentId');
      const response = await axios.post(`${baseAppUrl}/api/v1/user`, {
        token,
      });
      if (response.status === 200) {
        setUserDetails({
          name: response.data?.name,
          email: response.data?.email,
          occupation: response.data?.occupation,
          experience: response.data?.experience,
          country: response.data?.country,
          image: response.data?.userPic,
          state: response.data?.state,
          city: response.data?.city,
          phone: response.data?.phone,
        });
        setImage(response.data?.userPic);
      } else {
      }
    } catch (error) {}
  };
  const navigation = useNavigation();
  return (
    <View className="bg-yellow-400/40 m-2 rounded-2xl p-2 ">
      <TouchableOpacity
        onPress={() => navigation.navigate('EditProfile')}
        className=" flex-row gap-x-4  items-center ">
        <Image
          source={
            image
              ? {
                  uri: `${baseAppUrl}/uploads/${userDetails.image}`,
                }
              : profileLogo
          }
          className="w-[50px] rounded-full h-[50px] "
        />
        <Text>Hello, {userDetails.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserHeader;
