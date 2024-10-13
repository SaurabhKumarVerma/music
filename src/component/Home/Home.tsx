import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function Home() {
  const insets = useSafeAreaInsets()
  return (
    <View style={{top: insets.top}}>
      <Text>Home</Text>
      {/* <MusicIcon name='play' size={30} color={color.torchRed as string}/> */}
    </View>
  )
}

const styles = StyleSheet.create({})