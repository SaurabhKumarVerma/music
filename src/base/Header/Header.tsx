import { Pressable, StyleSheet, View } from "react-native"
import { MusicText } from "../MusicText/MusicText"
import { AntDesign } from "@expo/vector-icons"
import { color } from "@music/theme/color"
import { useNavigation } from "@react-navigation/native"

interface IHeader {
  title: string
}

const Header = (props: IHeader) => {
  const navigation = useNavigation()

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack()
    }
  }
  return (
    <View style={styles.container}>
      <Pressable onPress={goBack}>
        <AntDesign name="left" size={18} color={color.white} />
      </Pressable>

      <MusicText
        size="xs"
        preset="bold"
        weight="bold"
        text={props.title}
        style={styles.textStyle}
      />
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 10,
  },
  textStyle: {
    color: color.white,
    marginLeft: 8,
  },
})
