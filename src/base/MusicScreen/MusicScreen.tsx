import { useAppSelector } from "@music/hook/hook"
import { color } from "@music/theme/color"
import { IMusicScreen } from "@music/types/type"
import { View } from "react-native"

const MusicScreen = (props: IMusicScreen) => {
  const { isDarkMode } = useAppSelector((state) => state.globalStore)
  return (
    <View
      style={[
        props.style ?? props.style,
        { backgroundColor: isDarkMode ? color.deepBlack : color.white },
      ]}
    >
      {props.children}
    </View>
  )
}

export default MusicScreen
