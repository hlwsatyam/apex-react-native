import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import profileLogo from '../../assets/apex.jpg';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {baseAppUrl} from '../supportiveFunctions/Local';
import PrevNavigation from '../components/PreNavigation';
import {useFocusEffect} from '@react-navigation/native';
import LogoutModal from '../components/LogoutModal';
const AppSetting = ({navigation}) => {
  const [settingList, setSettingList] = useState([
    {
      label: 'My Account',
      icon: 'https://s3-alpha-sig.figma.com/img/56ad/b8fb/3eadee11e5dbc9e72fb27e5371f360b7?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Wfdy7b~u3hz8ZJ9sRXsbDKH0LYDnjDgJLWw2RoFVzuZkinVMjK-vTyp5vqw~e1eooVYYbRdvPnhWnNWrqAzk8oFRhSjhU9oPSo7GPQ00mb0aZOo01Ffv9xvV5SaZjt~kzwvc~tjO2GzylrBXh21HshXKOJtHtonPrBF1cSJWSY9u7ai6vAsNwISHs~xT~IUw~9vXRZRunoTyK-N~Cjbzn~h7qNeWwqIXsOQs0bzN3kQOE8TxcL1Ppy4RRs~Vqq0Gb-2zvqdYzR64wNKcU0YQssA~on~PnIiXp8Lt0Ay0LnfdA9GL2UF6fk0YioqVTBb1QmzLHxbar071mXFai-lePA__',
      route: 'EditProfile',
    },
    {
      label: 'Payment Account Detail',
      icon: 'https://s3-alpha-sig.figma.com/img/8a3b/e3f5/a0171e40ecd47d851cf46bc78ddfce99?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Jh0dFeIkZmr~QyfnEuzqHzCcBd7DGa05dYcG1cgHV2N015S6Bex8dCBfX~5qy5wcnxEz-2zlZOhp6jb0h83Gfb2OV7DznO6-gL70WQrIZvA1KbaAsZCwGFsK7lC9i1LqMcNp-EHdkDBvmrUO8fC-jcpBJSp890vxTzWMFoPoId3Mt6uigmxmqxnITB34T6-9he~~lJJLN-edeZianNJRoaNg5-Z8bk8Dw7H0Bbv4vZPorwwLDf8pNIkGbh569b~ZKkarnRg-Pu14aBkNUjTu3yoKyA7U464CFJvrTojWNl638qnr59VU~KrWWbv5MU3ktWlWJUcZCXnzSZM6c0wEpw__',
      route: 'wallet',
    },
    {
      label: 'My Earning',
      icon: 'https://s3-alpha-sig.figma.com/img/b546/8883/d9ac7465b606b56b50f4cd866e04eb39?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bHnCLM00bZDw8GT5u4TD-fYCXMFjnpt1J8PPei~n3LceXwFunoA51pL-33LPJynItpwo6Im~YzcqzNlexBtRXgP3xytaM4QEIu2SJOXoAsNhq0UX2zV63ivundF2ppNFsIG0vwAyDH7dWKePo9x26Jo-Rd6D0VzizgBTvo9l1sAdRfu055yQ7bm9HBKA0M5ZSTjM2wEUFdzgSY0AqMcvIWgLj1NpjvXY2ML2X64OxwwWwRPthIE5GbLUxUrgMqwubvgaTNR--1MlS5y-d1P-9QID6q~3unWf4LCJex6opu60sPTNYoo~B6uf0RPCdiccL~D9E1OdVW4D3ZYcySIraw__',
      route: '',
    },
    {
      label: 'My Team',
      icon: 'https://s3-alpha-sig.figma.com/img/b07c/06ae/3347b97b0e6c459618364daea6833e5f?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZUz-d7bkqnk-OO50JzJlI32SwvfZloyFSpf1SMS5D45MShM-VgJB4b-0rHC95DPLXLWLI7dH1oyO-Tz702mXdjzVcqcdFSBmqBeb37URVJQZ6berXT3SYtlUehrlZbFTGopDfDoEhhXg9KMqG8Mo35Ny8BQWjXrXLlO50UZK6BPf8KjQl4gBcmTkVcp1pEyXN0U9LulKASUATmvMc1fa2qRcFLKHKvxNRAkk2c~FjlHb99IMi4rmmmsgrWp19NjSZlTHSkKSzWpL6jiUrugH3y50MG0LZGGiGf-hYpBV5JuDph0HNsrF5p~thW6ZLAYYZYFEKE8G6-EQnZA75y2vSg__',
      route: '',
    },
    {
      label: 'Refer & Earns',
      icon: 'https://s3-alpha-sig.figma.com/img/9611/81c0/26edce88fa944f6b34422ebb293ca6f5?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dYSdOWzLVgMN2qVfVhu4mKMHqbiuioL3LhUxWV78PavLhtpJtlAMzVGQYE5-LutfHW8j-JSZIFMebzFicibJzkSFXXVJPDtnlxFU1L1ldO-4Euzoqyo8uom1Lx3AlQ~y2Z3QpANXjYMWVGPNLMvpaG3sD9dNifMrPjvjUiH3YGyR9INNsYr3i9JLWW04d6DdzyW4kFU7DV~PHC8NvObFe9cajTJXQ53Usumo8xSKeWfoQ0qxQcxYdZfNCgIsu-wSoSYSairTjwBByplV7Pyq2FAvxHFUhNK5OK-A4JJOwFF6W8Y0M8oVQbkFIQDEOrc8tB9tzjz~t1apnyMm-OnV8Q__',
      route: '',
    },
    {
      label: 'Language',
      icon: 'https://s3-alpha-sig.figma.com/img/d622/bad5/d07f872b538b2061ab8dd27b9b583799?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NIDJ0ril3bVPQWuss7AdNnyHLJAWpfn1UxWvAdiaQnC~jOpKLoEw03R2DvN46QwoL8iWxfkrvv3n26~tI6QUkmzEY0gofd5Jp-7yXVvaSgtPvdOR~ykw5aakJGMHRgWwEXDKQM0zz6fVrZK8Ao00xWfO8sXnaXkgssZrPxocimLhnJOcHe681lwz3VD96qELQ25n-bynZbM5UCuwl4DcbMKoUJp2C0vooh7SMXdqPsYf7Sf2uYoM6oFOUMaYrnj~ZXGDuY-OhofAIO9BGDkUseDHHnNhTnLfIQzzAZgb-0RT581990NDeirWcBg60ylgkdMknvJM2B~865CyVSYPog__',
      route: '',
    },
    {
      label: 'Help & Support',
      icon: 'https://s3-alpha-sig.figma.com/img/a651/81c9/6a2a780407a3169b6decced40c8b9eb2?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qboz~M4XvVycTMe30SEGKConGlz9eVIf2RScVwLUZBCLuYsoGtT0gkmRKz~Bdmupg2dRj8w5g2gNGhIJtmSE4tiVVU1DU3lBNEmLb5rAt~Iqftllo4WzjS4~EZTebNOo5djYNhlFxd49-PAiUmsZby~VGsQ-uj3qggz1yRP-nSqZV5npaHGQT-tkQogG65B1KeUbxwnTAbYQP-m6DnIwce0Kqjr4NPLKqAjLsU0EKp4fY8nadJ9HiO9U-qs-m0QfgLW2p7-esHPIG3CJFS4qwlW5v3-DAW8fpxSqn27ADCh6CKmHsx2GwA3ZKabQHrdIFehp1FiqjgHJEPOt6ut2AA__',
      route: '',
    },
    {
      label: 'Terms and Conditions',
      icon: 'https://s3-alpha-sig.figma.com/img/62a7/5fd3/e070ec3d6b5910e1f4850b06572f858b?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hEp-xtZzmPRmay24PGmj~5OnvQwJCk8HRDof6HsLqs9aCxzF1iv6k2Ok9UW3MuYA5Fur29dHeTeenqedT1a0hDEn1m6h46kYBbPtLcfLQWK6EmWZzP-Jt6pPbve8GyjfMbFm5EOCjmt~fW7EdgZU7H8CtwP3z8WIHV4vN5L8vblEDDIK-dqrT57l31eXM4HfS~cC2fholf9aFPDX2AdgEFW2YcV1sxskkv-Si1jhcttYfHpjP-7ytm3L41p7uBv2iEb4X6H2p7shmQskioxXuMYMxPzQbsj96V1~ircWDwJYkHq7SyRJl2V3SOpqcEoX0zNcaGs9BjHyuuMwE1i0pQ__',
      route: 'TermsConditions',
    },
  
  ]);
  const [userDetails, setUserDetails] = useState({
    name: 'Apex App',
    image: profileLogo,
    email: 'apex@rt.com',
    phone: '90999039223',
  });
  useEffect(() => {
    FetchData();
  });
  const FetchData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      await axios
        .post(`${baseAppUrl}/api/vi/hotelOwnerInfo`, {token})
        .then(res => {
          if (res.status == 200) {
            setUserDetails(res.data);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchData(); // Call your fetchData function
    }, []),
  );
  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem('agentId');
      const response = await axios.post(`${baseAppUrl}/api/v1/user`, {
        token,
      });
      if (response.status === 200) {
        setUserDetails({
          name: response.data?.name,
          email: response.data?.email,
          occupation: response.data?.occupation,
          experience: response.data?.experience,
          country: response.data?.country,
          image: response.data?.userPic,
          state: response.data?.state,
          city: response.data?.city,
          phone: response.data?.phone,
        });
        setImage(response.data?.userPic);
      } else {
      }
    } catch (error) {}
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const logoutHandler = () => {
    setIsModalVisible(true);
    setTimeout(() => {
      setIsModalVisible(false);
    }, 2000);
  };
  const [image, setImage] = useState(null);
  return (
    <View className="flex-1 bg-black ">
      {isModalVisible ? (
        <LogoutModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
      ) : (
        ''
      )}
      <PrevNavigation
        navigation={navigation}
        text={'Setting'}
        iconColor={'white'}
        styleForText={'text-white text-sm'}
        className={'mt-0'}
      />
      <View className="my-3">
        <Text className="text-white font-bold text-xl text-center">
          FASIAL KHAN
        </Text>
        <Text className="text-white text-[13px] text-center">fas434332</Text>
      </View>
      <ScrollView className="bg-slate-200 relative  rounded-tl-[70px] rounded-tr-[70px]">
        <TouchableOpacity
          onPress={() => navigation.navigate('EditProfile')}
          className="flex-row gap-x-4 my-2 justify-center items-center ">
          <Image
            source={
              image
                ? {
                    uri: `${baseAppUrl}/uploads/${userDetails.image}`,
                  }
                : profileLogo
            }
            className="w-[100px] rounded-full h-[100px]"
          />
        </TouchableOpacity>

        {settingList.map((item, idx) => (
          <View
            className="bg-white  m-2 rounded-2xl p-2 "
            key={idx + idx * idx}>
            <TouchableOpacity
              onPress={() =>
                item.route === 'logout'
                  ? logoutHandler()
                  : navigation.navigate(item.route)
              }
              className="my-2 items-center flex-row">
              <View className="w-[12%]">
                {/* <Icon name={item.icon} size={30} color="black" /> */}
                <Image source={{uri: item.icon}} style={{width: 30, height: 30}} />
              </View>
              <Text className="font-bold  text-sm">{item.label}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
export default AppSetting;
