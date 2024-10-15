import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ESCREEN } from '@music/types/screen';
import LoginScreen from '@music/screen/LoginScreen/LoginScreen';

const Stack = createNativeStackNavigator();

const LoginStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen  name={ESCREEN.LOGIN_SCREEN} component={LoginScreen} />
    </Stack.Navigator>
  )
}

export default LoginStack;