import { StyleSheet, View, ViewProps } from "react-native"
import { DEVICE_WIDTH } from "@music/constant/constant"
import { color } from "@music/theme/color"

interface IDivider {
  dividerStyle?: ViewProps
}

const Divider = (props: IDivider) => {
  return <View style={props.dividerStyle ? props.dividerStyle : styles.container} />
}

export default Divider

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.dividerColor,
    height: 0.33,
    width: DEVICE_WIDTH,
  },
})
