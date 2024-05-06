import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserLogin from '../screens/auth/userLogin';
import CreateAccount from '../screens/auth/CreateAccount';
import ForgotPassword from '../screens/auth/ForgotPassword';
import VerifyAccount from '../screens/auth/VerifyAccount';
import VerifyForgotPassword from '../screens/auth/VerifyForgotPassword';
import SetPassword from '../screens/auth/SetPassword';
import ResetPassword from '../screens/auth/ResetPassword';
import RegisterConfirm from '../screens/auth/RegisterConfirm';
import ContactUep from '../screens/contact/ContactUEP';
import HomeScreen from '../screens/Home/HomeScreen';
import Chat from '../screens/contact/Chat';

const UepNavigator = () => {

  const Stack = createNativeStackNavigator();

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="UserLogin"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="UserLogin" component={UserLogin} />
          <Stack.Screen name="CreateAccount" component={CreateAccount} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="VerifyAccount" component={VerifyAccount} />
          <Stack.Screen name="VerifyForgotPassword" component={VerifyForgotPassword} />
          <Stack.Screen name="SetPassword" component={SetPassword} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen name="RegisterConfirm" component={RegisterConfirm} />
          <Stack.Screen name="ContactUep" component={ContactUep} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="Chat" component={Chat} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}

export default UepNavigator