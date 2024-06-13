import {View, Text, ScrollView, ImageBackground} from 'react-native';
import React from 'react';
import PrevNavigation from '../components/PreNavigation';
import {useNavigation} from '@react-navigation/native';
import bg1 from '../../assets/Bg1.jpg';
import PaymentCalculation from '../components/PaymentCalculation';
import AccountStatus from '../components/AccountStatus';
const Wallet = () => {
  const navigation = useNavigation();
  return (
    <ImageBackground className="flex-1" source={bg1}>
      <PrevNavigation
        navigation={navigation}
        iconColor={'white'}
        text={'Account'}
        styleForText={'text-sm text-white font-semibold'}
      />
      <ScrollView className="bg-slate-50 pt-4  px-2 rounded-tr-[100px]  ">
        <PaymentCalculation />
        <AccountStatus />
      </ScrollView>
    </ImageBackground>
  );
};
export default Wallet;
