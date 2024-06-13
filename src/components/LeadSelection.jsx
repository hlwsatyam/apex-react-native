import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import creditcard from '../../assets/CREDIT CARD.png';
import presonalLoan from '../../assets/PARSONAL LOAN.png';
import carLoan from '../../assets/CAR LOAN.png';
import homeLoan from '../../assets/HOME LOAN.png';
import fdCard from '../../assets/FS CARD.png';
 
import logo from '../../assets/Logo.jpg';
import { Image } from '@rneui/themed/dist/Image';

const LeadSelection = () => {
  const [leadList, SetList] = useState([
    {
      label: 'Credit Card',
      Icon: 'https://i.imghippo.com/files/GMfFx1717553167.png',
    },
    {
      label: 'Personal Loan',
      Icon: 'https://i.imghippo.com/files/vyZMH1717553035.png',
    },
    {
      label: 'Home Loan',
      Icon: 'https://i.imghippo.com/files/UXlrz1717553210.png',
    },
    {
      label: 'Car Loan',
      Icon: 'https://i.imghippo.com/files/41Dc01717553249.png',
    },
    {
      label: 'Fd Card',
      Icon: 'https://i.imghippo.com/files/pJLHT1717553315.png',
    },
  ]);
  const navigation = useNavigation();
  return (
    <View className="flex-row pt-4 gap-x-4 gap-y-4 justify-center  flex-wrap">
      {leadList.map((item, idx) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('LeadList', {label: item.label})}
          key={idx * idx}
          className=" rounded-xl flex-row  w-[100%]  p-2 h-[90px] items-center justify-around bg-gray-300 ">
          <Image
            source={{uri: item.Icon}}
            className="w-[150px] rounded-[10px] h-[80px]  "
          />
          <View>
            <Text className="font-bold  text-center text-[15px]">
              {item.label}
            </Text>
            <Text className="font-bold my-1 text-center text-[10px]">
              Select Your Option
            </Text>
            <Text className="font-bold bg-white  text-blue-500 rounded-xl text-center text-[12px]">
              Apply Now
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};
export default LeadSelection;
