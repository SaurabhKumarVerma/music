// import { images } from "../../../assets/index"
import { images } from "@music-image/index"
import MusicImage from "@music/base/MusicImage/MusicImage"
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "@music/constant/constant"

import { StyleSheet, Text, View } from "react-native"

const LoginBackgroundImage = () => {
  return (
      <MusicImage source={images.bg.loginbg}  style={styles.image}/>
  )
}

export default LoginBackgroundImage

const styles = StyleSheet.create({
    image: {
        width: DEVICE_WIDTH,
        height: DEVICE_HEIGHT,
    }
})
