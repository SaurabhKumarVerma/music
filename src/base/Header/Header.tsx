import { Pressable, StyleSheet, View } from "react-native"
import { MusicText } from "../MusicText/MusicText"
import { AntDesign } from "@expo/vector-icons"
import { color } from "@music/theme/color"
import { useNavigation } from "@react-navigation/native"

interface IHeader {
  title: string
  subtitle?: string
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
        <AntDesign name="left" size={20} color={color.white} />
      </Pressable>

      <View style={styles.titleContainer}>
        <MusicText preset="subheading" weight="bold" text={props.title} style={styles.textStyle} />
        <MusicText
          size="xxs"
          preset="subHeading"
          weight="bold"
          text={props.subtitle}
          style={[styles.textStyle, { color: color.grey6, marginTop: 4 }]}
        />
      </View>
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
    textAlign: "center",
  },
  titleContainer: {
    alignItems: "center",
    alignSelf: "center",
    flex: 1,
    textAlign: "center",
  },
})
