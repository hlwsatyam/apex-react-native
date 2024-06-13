import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from './src/pages/Splash';
import Auth from './src/pages/Auth';
import {StatusBar, Text, View} from 'react-native';
import Signup from './src/pages/Signup';
import ForgetPassword from './src/pages/ForgetPassword';
import Home from './src/pages/Home';
import {AlertNotificationRoot} from 'react-native-alert-notification';
import ClientForm from './src/pages/ClientForm';
import Setting from './src/pages/Setting';
import FeedBack from './src/pages/FeedBack';
import Response from './src/pages/Response';
import EditProfile from './src/pages/EditProfile';
import Wallet from './src/pages/Wallet';
import Privacypolicy from './src/pages/Privacypolicy';
import TermsCondition from './src/pages/TermsCondition';
import LeadList from './src/pages/LeadList';
import LeadDetails from './src/pages/LeadDetails';
import AccountDetails from './src/components/AccountDetails';
import FullDetailsOfResponse from './src/pages/FullDetailsOfResponse';
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <AlertNotificationRoot>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="green" />
        <Stack.Navigator
          initialRouteName="splash"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="splash" component={Splash} />
          <Stack.Screen name="login" component={Auth} />
          <Stack.Screen name="signup" component={Signup} />
          <Stack.Screen name="forgetpass" component={ForgetPassword} />
          <Stack.Screen name="home" component={Home} />
          <Stack.Screen name="clientForm" component={ClientForm} />
          <Stack.Screen name="setting" component={Setting} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="feedback" component={FeedBack} />
          <Stack.Screen name="fullDetailsOfResponse" component={FullDetailsOfResponse} />
          <Stack.Screen name="LeadList" component={LeadList} />
          <Stack.Screen name="LeadDetails" component={LeadDetails} />
          <Stack.Screen name="AccountDetails" component={AccountDetails} />
          <Stack.Screen name="lead" component={Response} />
          <Stack.Screen name="wallet" component={Wallet} />
          <Stack.Screen name="PrivacyAndPolicy" component={Privacypolicy} />
          <Stack.Screen name="TermsConditions" component={TermsCondition} />
        </Stack.Navigator>
      </NavigationContainer>
    </AlertNotificationRoot>
  );
};
export default App;
