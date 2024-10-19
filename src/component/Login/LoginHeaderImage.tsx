import { View, StyleSheet } from "react-native"
import AuthLogo from "../../../assets/svg/auth.svg"
import { DEVICE_HEIGHT } from "@music/constant/constant"

const LoginHeaderImage = () => {
  return (
    <View>
      <AuthLogo height={DEVICE_HEIGHT * 0.25} style={styles.container} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { marginTop: DEVICE_HEIGHT * 0.044 },
})
export default LoginHeaderImage
