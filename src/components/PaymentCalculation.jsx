import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseAppUrl} from '../supportiveFunctions/Local';
import axios from 'axios';

const PaymentCalculation = () => {
  const [accountDetails, setAccountDetails] = useState({
    balance: '0',
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
            setAccountDetails({
              balance: res.data.balance,
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View className="bg-green-500/20 rounded-2xl  w-[200px] m-auto p-5">
      <Text className="text-[10px] ">Your Estimated Earning</Text>
      <Text className="text-[20px] text-center font-bold">
        ${accountDetails.balance}
      </Text>
    </View>
  );
};
export default PaymentCalculation;
