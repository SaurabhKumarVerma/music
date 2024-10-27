import { StyleSheet, View } from "react-native"
import Setting from "../../component/Setting/Setting"
import { color } from "@music/theme/color"

const SettingScreen = () => {
  return (
    <View style={styles.container}>
      <Setting />
    </View>
  )
}

export default SettingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
