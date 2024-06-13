import React, {useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useFocusEffect} from '@react-navigation/native';
import logo from '../../assets/apex.jpg';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({navigation}) => {
  useFocusEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('login');
    }, 1800);
    return () => clearTimeout(timer);
  });

 
  return (
    <View style={styles.backgroundImage}>
      <Animatable.View
        animation="zoomIn"
        duration={2000}
        style={styles.zoomContainer}>
        <Image source={logo} style={styles.profilePic} />
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  profilePic: {
    height: 180,
    width: 300,
    borderRadius: 300,
  },
  backgroundImage: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoomContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Splash;
