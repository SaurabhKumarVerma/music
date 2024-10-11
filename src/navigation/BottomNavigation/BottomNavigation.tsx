import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ESCREEN } from '@music/types/screen';
import { BottomTabParamList } from '../NavigationTypes/types';
import HomeStack from '../StackNavigation/HomeStack';

const BottomNavigation = () => {
    const Tabs = createBottomTabNavigator<BottomTabParamList>()
  return (
    <Tabs.Navigator screenOptions={{headerShown: false}}>
      <Tabs.Screen name={ESCREEN.HOME_SCREEN} component={HomeStack}/>
    </Tabs.Navigator>
  )
}

export default BottomNavigation