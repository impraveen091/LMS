import React from 'react';
import {StackNav} from '../NavigationKeys';
import {StackRoute} from '../NavigationRoutes';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={StackNav.Login}>
      <Stack.Screen name={StackNav.Login} component={StackRoute.Login} />
      <Stack.Screen name={StackNav.SignUp} component={StackRoute.SignUp} />
      <Stack.Screen
        name={StackNav.Otpverify}
        component={StackRoute.Otpverify}
      />
      <Stack.Screen
        name={StackNav.CreatePassword}
        component={StackRoute.CreatePassword}
      />
      <Stack.Screen
        name={StackNav.ForgotPassword}
        component={StackRoute.ForgotPassword}
      />
      <Stack.Screen
        name={StackNav.PasswordReset}
        component={StackRoute.PasswordReset}
      />
      <Stack.Screen name={StackNav.Success} component={StackRoute.Success} />
    </Stack.Navigator>
  );
}
