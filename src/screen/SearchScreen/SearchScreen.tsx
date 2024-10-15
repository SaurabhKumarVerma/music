import { StyleSheet, Text, View } from "react-native"
import React from "react"
import Search from "../../component/Search/Search"
import { color } from "@music/theme/color"

const SearchScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: color.appBackground }}>
      <Search />
    </View>
  )
}

export default SearchScreen

const styles = StyleSheet.create({})
