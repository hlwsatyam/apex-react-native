import React from 'react';
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import PrevNavigation from '../components/PreNavigation';

const TermsAndConditions = ({navigation}) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PrevNavigation
        navigation={navigation}
        iconColor={'black'}
        text={'Privacy Policy'}
        styleForText={'text-sm font-semibold'}
      />
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Introduction</Text>
        <Text style={styles.paragraph}>
          Welcome to Apex Finance! These Terms and Conditions govern your use of
          our mobile application. By accessing or using our app, you agree to be
          bound by these terms.
        </Text>
        <Text style={styles.sectionTitle}>Account Registration</Text>
        <Text style={styles.paragraph}>
          In order to access certain features of our app, you may be required to
          create an account. You agree to provide accurate and complete
          information when creating an account.
        </Text>
        <Text style={styles.sectionTitle}>Use of Content</Text>
        <Text style={styles.paragraph}>
          All content provided in our app is for informational purposes only.
          You may not modify, reproduce, or distribute any content without our
          prior written consent.
        </Text>
        {/* Add more sections as needed */}
        <Text style={styles.sectionTitle}>Changes to Terms</Text>
        <Text style={styles.paragraph}>
          We reserve the right to update or modify these Terms and Conditions at
          any time without prior notice. Your continued use of the app after any
          changes indicates your acceptance of the revised terms.
        </Text>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
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

export default TermsAndConditions;
