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
const LoanForm = ({label}) => {
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();
  const [agentInfo, setAgentInfo] = useState({
    'Full Name': '',
    'Mobile No': '',
  });
  const [formName, setFormName] = useState(label);
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
        .post(`${baseAppUrl}/api/formSubmit/loanForm`, {
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
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Failed',
        textBody: `Server Internal Error`,
        button: 'close',
      });
    }
  };
  return (
    <View className="flex-1 ">
      <ScrollView className="pt-3  ">
        <View className="e p-5  min-h-screen">
          {Object.entries(agentInfo).map(([key, value], index) => (
            <View key={index}>
              <Text className="text-black font-bold mt-10">{key}</Text>
              {
                <TextInput
                  onChangeText={value => onChangeHandler(value, key)}
                  className="border-b-[1px] mt-0 pt-0 pb-1"
                  value={value}
                  placeholder={key}
                />
              }
            </View>
          ))}
          <TouchableOpacity
            onPress={saveHandler}
            className="bg-black p-1 rounded">
            <Text className="text-center  font-bold text-white">Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
export default LoanForm;
