import {View, Text, ScrollView, BackHandler, Image} from 'react-native';
import React from 'react';
import Footer from '../components/Footer';
import LeadSelection from '../components/LeadSelection';
import {Searchbar} from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/native';
import UserHeader from '../components/UserHeader';
import logo from '../../assets/Logo.jpg';
const Home = () => {
  useFocusEffect(
    React.useCallback(() => {
      const backPressHandler = () => {
        BackHandler.exitApp();
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', backPressHandler);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', backPressHandler);
      };
    }, []),  
  );

  return (
    <View className="flex-1 bg-black">
      <Header />
      <ScrollView className="bg-white p-6 rounded-tl-[100px]">
        <LeadSelection />
      </ScrollView>
      <Footer />
    </View>
  );
};

export default Home;

const Header = () => {
  return (
    <View className="flex-row justify-center gap-x-4 items-center p-4 bg-black">
      <Image className="w-[50px]  rounded  h-[50px]" source={logo} />
      <Text className="text-white uppercase underline  text-xl">
        Our Service
      </Text>
    </View>
  );
};
