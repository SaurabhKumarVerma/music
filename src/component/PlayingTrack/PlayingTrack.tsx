import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Indicator from '@music/base/Indicator/Indicator'

const PlayingTrack = () => {
  return (
    <View>
        <View style={styles.indicatorStyle}> 
            <Indicator />
        </View>
      <Text>PlayingTrack</Text>
    </View>
  )
}

export default PlayingTrack

const styles = StyleSheet.create({
    indicatorStyle: {
        alignSelf: 'center',
        paddingVertical: 12,
    }
})