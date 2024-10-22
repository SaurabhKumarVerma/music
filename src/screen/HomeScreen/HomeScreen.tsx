import { StyleSheet, View } from "react-native"
import Home from "../../component/Home/Home"
import { color } from "@music/theme/color"
import Header from "@music/base/Header/Header"

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      {/* <Header title="Brower" /> */}
      <Home />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.appBackground,
    flex: 1,
  },
})
