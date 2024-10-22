import { View, StyleSheet } from "react-native"
import { useWarmUpBrowser } from "@music/hook/useWarmUpBrowser"
import * as WebBrowser from "expo-web-browser"

import LoginBackgroundImage from "./LoginBackgroundImage"
import LoginBody from "./LoginBody"
import LoginHeaderImage from "./LoginHeaderImage"

WebBrowser.maybeCompleteAuthSession()

const Login = () => {
  useWarmUpBrowser()
  // const insets = useSafeAreaInsets()

  return (
    <View>
      {/* <Button title="Sign in with apple" /> */}
      <View>
        <LoginBackgroundImage />
      </View>

      <View style={styles.img}>
        <LoginHeaderImage />
      </View>

      <View style={styles.body}>
        <LoginBody />
      </View>
    </View>
  )
}
export default Login

const styles = StyleSheet.create({
  body: {
    bottom: 0,
    position: "absolute",
    width: "100%",
    zIndex: 10,
  },
  img: {
    alignSelf: "flex-end",
    position: "absolute",
  },
})
