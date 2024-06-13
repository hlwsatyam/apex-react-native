import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import PrevNavigation from '../components/PreNavigation';
import {formatDate} from '../components/formDate';

const FullDetailsOfResponse = () => {
  const navigation = useNavigation();
  const item = useRoute().params;

  return (
    <View className="flex-1">
      <PrevNavigation
        styleForText={'text-black'}
        iconColor={'black'}
        text={item?.modalName}
        navigation={navigation}
      />

      <ScrollView className="bg-black   p-4 rounded-tr-[90px]">
        {item?.fullName ? (
          <Text className="text-white font-semibold border-b-[1px] border-white py-3 ">
            Name: {item?.fullName}
          </Text>
        ) : null}
        {item?.mobileNo ? (
          <Text className="text-white font-semibold border-b-[1px] border-white py-3 ">
            Mobile No: {item?.mobileNo}
          </Text>
        ) : null}
        {item?.fatherName ? (
          <Text className="text-white font-semibold border-b-[1px] border-white py-3 ">
            Father Name: {item?.fatherName}
          </Text>
        ) : null}
        {item?.panNo ? (
          <Text className="text-white font-semibold border-b-[1px] border-white py-3 ">
            Pan No: {item?.panNo}
          </Text>
        ) : null}
        {item?.aadhaarNo ? (
          <Text className="text-white font-semibold border-b-[1px] border-white py-3 ">
            Aadhaar No: {item?.aadhaarNo}
          </Text>
        ) : null}
        {item?.dateOfBirth ? (
          <Text className="text-white font-semibold border-b-[1px] border-white py-3 ">
            Date Of Birth: {item?.dateOfBirth}
          </Text>
        ) : null}
        {item?.status ? (
          <Text className="text-white font-semibold border-b-[1px] border-white py-3 ">
            Lead Status: {item?.status}
          </Text>
        ) : null}
        {item?.emailId ? (
          <Text className="text-white font-semibold border-b-[1px] border-white py-3 ">
            Email Id: {item?.emailId}
          </Text>
        ) : null}
        {item?.officeEmaill ? (
          <Text className="text-white font-semibold border-b-[1px] border-white py-3 ">
            Office Optional Email Id: {item?.officeEmaill}
          </Text>
        ) : null}
        {item?.residenceAddress ? (
          <Text className="text-white font-semibold border-b-[1px] border-white py-3 ">
            Residence Address Line 1: {item?.residenceAddress?.line1}
          </Text>
        ) : null}
        {item?.residenceAddress ? (
          <Text className="text-white font-semibold border-b-[1px] border-white py-3 ">
            Residence Address Line 3: {item?.residenceAddress?.line3}
          </Text>
        ) : null}
        {item?.residenceAddress ? (
          <Text className="text-white font-semibold border-b-[1px] border-white py-3 ">
            Residence Address Lank mark: {item?.residenceAddress?.landmark}
          </Text>
        ) : null}
        {item?.residenceAddress ? (
          <Text className="text-white font-semibold border-b-[1px] border-white py-3 ">
            Residence Address Pin Code: {item?.residenceAddress?.pincode}
          </Text>
        ) : null}

        {item?.officeAddress ? (
          <Text className="text-white font-semibold border-b-[1px] border-white py-3 ">
            Office Address Line 1: {item?.officeAddress?.line1}
          </Text>
        ) : null}

        {item?.officeAddress ? (
          <Text className="text-white font-semibold border-b-[1px] border-white py-3 ">
            Office Address Land mark: {item?.officeAddress?.landmark}
          </Text>
        ) : null}
        {item?.officeAddress ? (
          <Text className="text-white font-semibold border-b-[1px] border-white py-3 ">
            Office Address Pin Code: {item?.officeAddress?.pincode}
          </Text>
        ) : null}
        {item?.modalName ? (
          <Text
            className="text-white font-semibold border-b-[1px] border-white py-3 "
            t>
            Form Name: {item?.modalName}
          </Text>
        ) : null}
        {item?.companyName ? (
          <Text className="text-white font-semibold border-b-[1px] border-white py-3 ">
            Compony Name: {item?.companyName}
          </Text>
        ) : null}
        {item?.designation ? (
          <Text className="text-white font-semibold border-b-[1px] border-white py-3 ">
            Designation: {item?.designation}
          </Text>
        ) : null}
        {item?.createdAt ? (
          <Text className="text-white font-semibold   border-b-[1px] border-white py-3 ">
            Submission Date: {formatDate(item?.createdAt)}
          </Text>
        ) : null}
      </ScrollView>
    </View>
  );
};
export default FullDetailsOfResponse;
