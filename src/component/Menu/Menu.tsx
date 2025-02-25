import { DEVICE_WIDTH } from "@music/constant/constant"
import { useState } from "react"
import { StyleSheet, Text, View } from "react-native"

const Menu = () => {
  const [position, setPosition] = useState({ x:0,y: 0 })

  const handleLayout = (event) => {
    const { x, y } = event.nativeEvent.layout
    setPosition({x:420, y: 900 })
  }

  return (
    <View></View>
  )
}

export default Menu

const styles = StyleSheet.create({})