import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import Footer from '../components/Footer';
import LeadSelection from '../components/LeadSelection';
const FeedBack = () => {
  return (
    <View className="flex-1 ">
      <ScrollView>
        <LeadSelection />
      </ScrollView>
      <Footer  />
    </View>
  );
};

export default FeedBack;
