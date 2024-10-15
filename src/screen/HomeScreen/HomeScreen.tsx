import { StyleSheet, Text, View } from "react-native"
import React from "react"
import Home from "../../component/Home/Home"
import { color } from "@music/theme/color"

const HomeScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: color.appBackground }}>
      <Home />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})
