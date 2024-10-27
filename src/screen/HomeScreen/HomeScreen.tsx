import { StyleSheet, View } from "react-native"
import Home from "../../component/Home/Home"
import { color } from "@music/theme/color"
import Header from "@music/base/Header/Header"
import MusicScreen from "@music/base/MusicScreen/MusicScreen"

const HomeScreen = () => {
  return (
    <MusicScreen style={styles.container}>
      <Home />
    </MusicScreen>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    // backgroundColor: color.deepBlack,
    flex: 1,
  },
})
