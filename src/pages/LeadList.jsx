import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import PrevNavigation from '../components/PreNavigation';
import FormList from '../supportiveFunctions/Leadlist.json';
import LoanForm from '../components/LoanForm';
import logo from '../../assets/Logo.jpg';
const LeadList = () => {
  const navigation = useNavigation();
  const label = useRoute().params.label;
  const [list, setList] = useState([]);
  const [isLoanFormAvailable, setIsLoanFormAvailable] = useState(false);
  useEffect(() => {
    FormList.map((item, index) => {
      if (item.label === label) {
        setList(item.list);
      } else {
        setIsLoanFormAvailable(true);
      }
    });
  });
  const pressHandler = item => {
    navigation.navigate('LeadDetails', {item: item});
  };
  return (
    <View className="flex-1 bg-black">
      <PrevNavigation
        navigation={navigation}
        text={`${label} List`}
        iconColor={'white'}
        styleForText={'text-white'}
        className={'mt-0'}
      />
      <View>
        <Image
          className="w-[100px]  rounded m-auto my-4  h-[100px]"
          source={logo}
        />
      </View>
      <ScrollView className="p-4 rounded-tl-[80px] bg-white  ">
        {!isLoanFormAvailable && (
          <Text className="text-center py-3 text-black text-[14px] ">
            Select Your Bank
          </Text>
        )}
        <View className="flex-row justify-center gap-x-4 gap-y-4  flex-wrap ">
          {list?.map((item, idx) => (
            <TouchableOpacity
              onPress={() => pressHandler(item)}
              className=" p-1 w-[90px] rounded border"
              key={idx * idx + 2}>
              <ImageBackground
                className="h-[80px]     rounded-lg"
                resizeMode="contain"
                source={{uri: item.bankName.image}}></ImageBackground>
              <Text className="text-center  text-[10px]">
                {item.bankName.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {isLoanFormAvailable && <LoanForm label={label} />}
      </ScrollView>
    </View>
  );
};

export default LeadList;
