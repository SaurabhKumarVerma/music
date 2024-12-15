import LottieView from "lottie-react-native"
import { Modal, StyleSheet, View } from "react-native"
import { MusicText } from "../MusicText/MusicText"
import MusicButton from "../MusicButton/MusicButton"
import { DEVICE_WIDTH } from "@music/constant/constant"
import { color } from "@music/theme/color"

interface IError {
  isError: boolean
  retry: () => void
}

const Error = (props: IError) => {
  return (
    <Modal
      presentationStyle="overFullScreen"
      visible={props.isError}
      transparent
      statusBarTranslucent
    >
      <View style={styles.lottieContainerStyle}>
        <LottieView
          source={require("../../../assets/lottie/error.json")}
          style={styles.lottieStyle}
          autoPlay
        />
        <MusicText text="Opps! " preset="bold" weight="extraBold" />
        <View style={{ marginVertical: 18 }}>
          <MusicButton
            onPress={props.retry}
            buttonWidth={DEVICE_WIDTH * 0.5}
            buttonCta={"Retry"}
            buttonColor={color.redWine}
          />
        </View>
      </View>
    </Modal>
  )
}

export default Error

const styles = StyleSheet.create({
  lottieContainerStyle: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  lottieStyle: { height: 100, width: 100 },
})
