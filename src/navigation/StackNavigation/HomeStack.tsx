import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ESCREEN } from '@music/types/screen';
import Login from '@music/component/Login/Login';
import HomeScreen from '@music/screen/HomeScreen/HomeScreen';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen  name={ESCREEN.MAIN_SCREEN} component={HomeScreen}/>
    </Stack.Navigator>
  )
}

export default HomeStack

const styles = StyleSheet.create({})