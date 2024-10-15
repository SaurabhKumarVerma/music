import { StyleSheet, Text, View } from "react-native"
import React from "react"
import Setting from "../../component/Setting/Setting"
import { color } from "@music/theme/color"

const SettingScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: color.appBackground }}>
      <Setting />
    </View>
  )
}

export default SettingScreen

const styles = StyleSheet.create({})
