import { StyleSheet } from "react-native"
import Home from "../../component/Home/Home"
import MusicScreen from "@music/base/MusicScreen/MusicScreen"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const HomeScreen = () => {
  const insets = useSafeAreaInsets()
  return (
    <MusicScreen style={[styles.container, { top: insets.top }]}>
      <Home />
    </MusicScreen>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
