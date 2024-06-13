import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {Icon} from 'react-native-paper';
import {TouchableOpacity} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseAppUrl} from '../supportiveFunctions/Local';
const AccountStatus = () => {
  const [accountDetails, setAccountDetails] = useState({
    accountHolderName: 'dummy',
    accountNumber: '1234567890',
    ifscCode: 'SBI000000',
  });
  useFocusEffect(
    React.useCallback(() => {
      fetData();
    }, []), // Empty dependency array ensures that the effect runs only once when the component mounts
  );
  const fetData = async () => {
    try {
      const agentId = await AsyncStorage.getItem('agentId');
      await axios
        .post(`${baseAppUrl}/api/vi/accountInfo`, {agentId})
        .then(res => {
          if (res.status == 200) {
            console.log(res.data);
            setAccountDetails({
              accountHolderName: res.data.accountHolderName,
              accountNumber: res.data.accountNumber,
              ifscCode: res.data.ifscCode,
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  const navigation = useNavigation();
  return (
    <View className="flex-row items-center mt-4 p-2 bg-orange-500/20   justify-between">
      <View>
        <Text className="text-[10px]">
          {' '}
          Holder Name: {accountDetails.accountHolderName}{' '}
        </Text>
        <Text className="text-[10px]">
          {' '}
          Account Number: {accountDetails.accountNumber}{' '}
        </Text>
        <Text className="text-[10px]">
          {' '}
          Ifsc Code: {accountDetails.ifscCode}{' '}
        </Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('AccountDetails')}>
        <Icon source={'pencil'} size={22} color={'#000'} />
      </TouchableOpacity>
    </View>
  );
};
export default AccountStatus;
