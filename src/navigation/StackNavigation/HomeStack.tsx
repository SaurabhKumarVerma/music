import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ESCREEN } from '@music/types/screen';
import PlayingTrack from '@music/component/PlayingTrack/PlayingTrack';

const Stack = createNativeStackNavigator();

const PlayTrackModal = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen  name={ESCREEN.PLAYTRACK_SCREEN} component={PlayingTrack} />
    </Stack.Navigator>
  )
}

export default PlayTrackModal;