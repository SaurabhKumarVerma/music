import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { color } from '@music/theme/color'

const Indicator = () => {
  return (
    <View style={styles.container}/>
  )
}

export default Indicator

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.jetGrey,
        height: 8,
        width: 80, 
        borderRadius: 8
    }
})