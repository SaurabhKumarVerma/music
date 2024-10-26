// import { images } from "../../../assets/index"
import { images } from "@music-image/index"
import MusicImage from "@music/base/MusicImage/MusicImage"
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "@music/constant/constant"

import { StyleSheet, Text, View } from "react-native"

const LoginBackgroundImage = () => {
  return <MusicImage source={require("../../../assets/images/bgLogin.png")} style={styles.image} />
}

export default LoginBackgroundImage

const styles = StyleSheet.create({
  image: {
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
  },
})
