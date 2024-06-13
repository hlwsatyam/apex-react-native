import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import axios from 'axios';
import {baseAppUrl} from '../supportiveFunctions/Local';
import {ALERT_TYPE, Dialog} from 'react-native-alert-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PrevNavigation from './PreNavigation';
import {useFocusEffect} from '@react-navigation/native';

const AccountDetails = ({navigation}) => {
  const [agentInfo, setAgentInfo] = useState({
    'Account Holder Name': '',
    'Account No': '',
    'Ifsc Code': '',
  });
  const [isUpdated, setIsUpdated] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      fetData();
    }, []),
  );

  const fetData = async () => {
    try {
      const agentId = await AsyncStorage.getItem('agentId');
      await axios
        .post(`${baseAppUrl}/api/vi/accountInfo`, {agentId})
        .then(res => {
          if (res.status == 200) {
            setIsUpdated(true);
            setAgentInfo({
              'Account Holder Name': res.data.accountHolderName,
              'Account No': res.data.accountNumber,
              'Ifsc Code': res.data.ifscCode,
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const [formName, setFormName] = useState('SBI');
  const onChangeHandler = (value, field) => {
    setAgentInfo({...agentInfo, [field]: value});
  };

  const saveHandler = async () => {
    console.log(agentInfo);
    try {
      const agentId = await AsyncStorage.getItem('agentId');
      await axios
        .post(`${baseAppUrl}/api/accountDetails`, {
          formName: formName,
          agentId: agentId,
          isUpdated,
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
            navigation.navigate('wallet');
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
    <View className="flex-1  ">
      <PrevNavigation
        navigation={navigation}
        text={'Account Details'}
        iconColor={'black'}
        styleForText={'text-black text-xl '}
        className={'mt-0'}
      />
      <ScrollView className="bg-stone-400 rounded-tl-[90px]">
        <View className="  p-5   min-h-screen">
          {Object.entries(agentInfo).map(([key, value], index) => (
            <View key={index}>
              <Text className="text-black font-bold mt-10">{key}</Text>
              <TextInput
                value={value}
                onChangeText={value => onChangeHandler(value, key)}
                className="border-b-[1px] mt-0 pt-0 pb-1"
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

export default AccountDetails;
