import React from 'react';
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import PrevNavigation from '../components/PreNavigation';

const PrivacyPolicy = ({navigation}) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PrevNavigation
        navigation={navigation}
        iconColor={'black'}
        text={'Privacy Policy'}
        styleForText={'text-sm font-semibold'}
      />
      <View className="" style={styles.content}>
        <Text style={styles.sectionTitle}>Introduction</Text>
        <Text style={styles.paragraph}>
          Welcome to Apex Finance! This Privacy Policy describes how we collect,
          use, and share information when you use our mobile application.
        </Text>
        <Text style={styles.sectionTitle}>Information We Collect</Text>
        <Text style={styles.paragraph}>
          We collect information you provide directly to us, such as your name,
          email address, and personal details when you create an account or
          submit a lead.
        </Text>
        <Text style={styles.sectionTitle}>How We Use Your Information</Text>
        <Text style={styles.paragraph}>
          We use the information we collect to provide and improve our services,
          communicate with you, and personalize your experience.
        </Text>
        {/* Add more sections as needed */}
        <Text style={styles.sectionTitle}>Contact Us</Text>
        <Text style={styles.paragraph}>
          If you have any questions about our Privacy Policy, please contact us
          at support@apexfinance.com.
        </Text>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  content: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 15,
  },
});

export default PrivacyPolicy;
