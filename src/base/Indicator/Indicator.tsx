import { StyleSheet, View } from "react-native"
import React from "react"
import { color } from "@music/theme/color"

const Indicator = () => {
  return <View style={styles.container} />
}

export default Indicator

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.jetGrey,
    borderRadius: 8,
    height: 8,
    width: 80,
  },
})
