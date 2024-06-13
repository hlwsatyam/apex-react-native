import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Button,
  TouchableOpacity,
  Modal,
} from 'react-native';

import React, {useEffect, useState} from 'react';
import Footer from '../components/Footer';
import LeadSelection from '../components/LeadSelection';
import {Searchbar} from 'react-native-paper';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {baseAppUrl} from '../supportiveFunctions/Local';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ALERT_TYPE, Dialog} from 'react-native-alert-notification';
import RNPickerSelect from 'react-native-picker-select';

const Response = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filter, setFilter] = useState(null);
  const [page, setPage] = React.useState(1);
  const [leadList, setLeadList] = React.useState([]);
  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [page, searchQuery, filter]),
  );
  const getData = async () => {
    try {
      const agentId = await AsyncStorage.getItem('agentId');
      await axios
        .post(`${baseAppUrl}/api/leadDetails/${page}/${filter}`, {
          agentId,
          text: searchQuery,
        })
        .then(async res => {
          if (res.status == 200) {
            setLeadList(res.data);
          } else {
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

  const updateFilter = value => {
    setFilter(value);
  };
  const updatePage = cond => {
    if (cond == 'Inc') {
      setPage(page + 1);
    }
    if (cond == 'Dec') {
      if (page != 1) setPage(page - 1);
    }
  };
  return (
    <View className="flex-1 ">
      <View className="mx-3 flex-row  justify-between  my-2">
        <Searchbar
          onClearIconPress={getData}
          placeholder="Search"
          className="w-[70%] "
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
        <Filter setFilter={updateFilter} />
      </View>
      <ScrollView className="  bg-black p-8 rounded-tl-[70px]">
        {leadList?.map(item => (
          <Card item={item} key={item._id} />
        ))}
      </ScrollView>
      <View className="flex-row mt-3 justify-end gap-x-4 items-center mx-3 mb-3">
        <TouchableOpacity onPress={() => updatePage('Dec')}>
          <Text className="bg-green-500/20 px-4 py-1 rounded-xl">Prev</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => updatePage('Inc')}>
          <Text className="bg-green-500/20 px-4 py-1 rounded-xl">Next</Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </View>
  );
};

export default Response;

const Card = ({item}) => {
  const handleReapply = async item => {
    try {
      const res = await axios.post(`${baseAppUrl}/api/v1/reapply`, {
        leadId: item._id,
        modalName: item.modalName,
      });
      if (res.status == 200) {
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'information',
          textBody: `${res.data.message}`,
          button: 'close',
        });
      } else {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Failed',
          textBody: `${res.data.message}`,
          button: 'close',
        });
      }
    } catch (error) {
      console.log(error);
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Failed',
        textBody: `Server Internal Error`,
        button: 'close',
      });
    }
  };
  const navigation = useNavigation();
  const handleCardPress = () => {
    navigation.navigate('fullDetailsOfResponse', {...item});
  };
  return (
    <View>
      <TouchableOpacity
        onPress={handleCardPress}
        className="bg-white my-3 rounded p-2 ">
        {item?.fullName ? (
          <Text className="text-black font-semibold border-b-[1px] border-white py-1 ">
            Name: {item?.fullName}
          </Text>
        ) : null}
        {item?.mobileNo ? (
          <Text className="text-black font-semibold border-b-[1px] border-white py-1 ">
            Mobile No: {item?.mobileNo}
          </Text>
        ) : null}
        {item?.modalName ? (
          <Text className="text-black font-semibold border-b-[1px] border-white py-1 ">
            Form Name: {item?.modalName}
          </Text>
        ) : null}
        <View className="flex-row justify-between items-center ">
          <Text>{item.status !== 'null' ? item.status : ''}</Text>
          {item.status === 'null' ? (
            ''
          ) : item.status == 'ring' ||
            item.status == 'not-intrested' ||
            item.status == 'not-reachable' ? (
            <TouchableOpacity
              onPress={() => handleReapply(item)}
              className="bg-green-500/60 px-4 py-1 rounded-xl">
              <Text className="text-[8px] text-white font-bold">Reapply</Text>
            </TouchableOpacity>
          ) : (
            ''
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const Filter = ({setFilter}) => {
  const [selectedOption, setSelectedOption] = useState('');

  const options = [
    {label: 'Decline', value: 'decline'},
    {label: 'V-KYC Pending', value: 'v-kyc-pending'},
    {label: 'Approved', value: 'approved'},
    {label: 'In Process', value: 'in process'},
    {label: 'Incomplete', value: 'incomplete'},
    {label: 'Activation Pending', value: 'activation pending'},
    {label: 'Documentation Pending', value: 'documentation pending'},
  ];

  return (
    <View
      style={styles.container}
      className="border  w-[30%]  rounded-2xl border-gray-300  ">
      <RNPickerSelect
        onValueChange={value => {
          setSelectedOption(value);
          setFilter(value);
        }}
        items={options}
        placeholder={{label: 'Select Status', value: null}}
        style={pickerSelectStyles}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {},
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  selectedText: {
    marginTop: 20,
    fontSize: 16,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
