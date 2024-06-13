import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import PrevNavigation from '../components/PreNavigation';
import {useNavigation, useRoute} from '@react-navigation/native';
import SBI from '../Form/SBI';
import YesBank from '../Form/YesBank';
import AuBank from '../Form/AuBank';
import InduslndBank from '../Form/InduslndBank';
import Axis from '../Form/Axis';
import Hsbc from '../Form/Hsbc';
import Hdfc from '../Form/Hdfc';
import Idfc from '../Form/Idfc';
import American from '../Form/American';
import Standard from '../Form/Standard';
const LeadDetails = () => {
  const navigation = useNavigation();
  const selectedItem = useRoute().params.item.bankName.name;
  const component = {
  'STATE BANK OF INDIA': SBI,
    'YES BANK': YesBank,
    'AU BANK': AuBank,
    'INDUSLND BANK': InduslndBank,
    'AXIS BANK': Axis,
    'HSBC BANK': Hsbc,
    'HDFC BANK': Hdfc,
    'IDFC BANK': Idfc,
    'AMERICAN EXPRESS': American,
    'STANDARD CHARTERED': Standard,
  };
  const RenderedComponent = component[selectedItem];
  return (
    <View className="flex-1">
      <PrevNavigation
        navigation={navigation}
        iconColor={'#000'}
        styleForText={'text-[#000]'}
        text={'Form'}
      />
      <ScrollView>
      
        <RenderedComponent />
      </ScrollView>
    </View>
  );
};
export default LeadDetails;
