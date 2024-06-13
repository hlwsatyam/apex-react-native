import {
  View,
  Text,
  ScrollView,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import DatePicker from 'react-native-date-picker';
import axios from 'axios';
import {baseAppUrl} from '../supportiveFunctions/Local';
import {ALERT_TYPE, Dialog} from 'react-native-alert-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const AuBank = ({}) => {
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();
  const [agentInfo, setAgentInfo] = useState({
    'Full Name': '',
    'Mobile No': '',
    'Mother Name': '',
    'Father Name': '',
    'Pan No': '',
    'Aadhaar No': '',
    'Date Of Birth': '',
    'Email Id': '',
    'Office Optional Email': '',
    'Residence Address Line 1': '',
    'Residence Address Line 2': '',
    'Residence Address Line 3': '',
    'Residence Address Landmark': '',
    'Residence Address Pincode': '',
    'Company Name': '',
    'Office Address Line 1': '',
    'Office Address Line 2': '',
    'Office Address Landmark': '',
    'Office Address Pincode': '',
    Designation: '',
  });
  const [formName, setFormName] = useState('Yes Bank');
  const [date, setDate] = useState(new Date());
  const onChangeHandler = (value, field) => {
    if (field === 'Mobile No' && value.length >= 11) {
      return null;
    }
    if (field === 'Mobile No' && isNaN(value)) {
      return null;
    } else {
      setAgentInfo({...agentInfo, [field]: value});
    }
  };
  const saveHandler = async () => {
    try {
      const agentId = await AsyncStorage.getItem('agentId');
      await axios
        .post(`${baseAppUrl}/api/formSubmit/auBank`, {
          formName: formName,
          agentId: agentId,
          formData: agentInfo,
        })
        .then(async res => {
          if (res.status == 200) {
            Dialog.show({
              type: ALERT_TYPE.SUCCESS,
              title: 'Success',
              textBody: `${res.data?.message}`,
              button: 'close',
            });
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
        textBody: `Server Internal Error`,
        button: 'close',
      });
    }
  };
  return (
    <View className="flex-1 bg-black">
    <View className="flex-row my-4 gap-x-4 justify-center items-center">
        <Image
          source={require('../../assets/Logo.jpg')}
          className="w-[70px] h-[70px]"
        />
        <Text className="text-white text-2xl">Lead Detail</Text>
      </View>
      <ScrollView className="pt-3 bg-white p-5  min-h-screen rounded-tl-[70px] ">
        <View className="">
          {Object.entries(agentInfo).map(([key, value], index) => (
            <View key={index}>
              <Text className="text-black font-bold mt-10">{key} <Text className="text-red-400">*</Text></Text>
              <TextInput
                  onChangeText={value => onChangeHandler(value, key)}
                  className="border-[0.9px] p-4 mt-2  "
                  value={value}
                  placeholder={key}
                />
            </View>
          ))}
          <TouchableOpacity
            onPress={saveHandler}
            className="bg-black   p-1 rounded">
            <Text className="text-center  font-bold text-white">Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default AuBank;
