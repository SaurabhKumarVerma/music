import { Modal, StyleSheet, View } from "react-native"
import { useEffect, useState } from "react"
import LottieView from "lottie-react-native"
import { color } from "@music/theme/color"

const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true)
  // const navigation = useNavigation<NativeStackNavigationProp<BottomTabParamList>>()

  const startSplash = () => {
    return setTimeout(() => {
      setIsVisible(false)
    }, 5500)
  }

  useEffect(() => {
    startSplash()
  }, [])

  return (
    <Modal animationType="fade" visible={isVisible} presentationStyle="fullScreen" style={{}}>
      <View style={styles.container}>
        <LottieView
          source={require("../../assets/lottie/splash.json")}
          autoPlay
          style={styles.lottieStyle}
        />
      </View>
    </Modal>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: color.splashBackgroundColor,
    flex: 1,
    justifyContent: "center",
  },
  lottieStyle: { height: 250, width: 250 },
})
