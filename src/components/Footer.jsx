import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Footer = ({}) => {
  const navigation = useNavigation();

  // Define an array of icon data
  const icons = [
    {name: 'home', label: 'Home', onPress: () => navigation.navigate('home')},

    {
      name: 'thumbs-up',
      label: 'Lead',
      onPress: () => navigation.navigate('lead'),
    },
    {
      name: 'cog',
      label: 'Settings',
      onPress: () => navigation.navigate('setting'),
    },
  ];

  return (
    <View style={styles.container}>
      {icons.map((icon, index) => (
        <TouchableOpacity
          key={index}
          style={styles.iconContainer}
          onPress={icon.onPress}>
          <Icon name={icon.name} size={25} color="#333" />
          <Text style={styles.text}>{icon.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  iconContainer: {
    alignItems: 'center',
  },
  text: {
    marginTop: 5,
    fontSize: 12,
    color: '#333',
  },
});

export default Footer;
