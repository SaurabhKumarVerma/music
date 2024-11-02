import LottieView from "lottie-react-native"
import { Modal, StyleSheet, View } from "react-native"

interface ILoading {
  isVisible: boolean
}

const Loading = (props: ILoading) => {
  return (
    <Modal
      presentationStyle="overFullScreen"
      visible={props.isVisible}
      transparent
      statusBarTranslucent
    >
      <View style={styles.lottieContainerStyle}>
        <LottieView
          source={require("../../../assets/lottie/loading.json")}
          style={styles.lottieStyle}
          autoPlay
        />
      </View>
    </Modal>
  )
}

export default Loading

const styles = StyleSheet.create({
  lottieContainerStyle: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  lottieStyle: { height: 100, width: 100 },
})
