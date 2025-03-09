import { Pressable, StyleSheet, View } from "react-native"
import { MusicText } from "../MusicText/MusicText"
import { AntDesign } from "@expo/vector-icons"
import { color } from "@music/theme/color"
import { useNavigation } from "@react-navigation/native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { BlurView } from "expo-blur"

interface IHeader {
  title: string
  subtitle?: string
}

const Header = (props: IHeader) => {
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack()
    }
  }
  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingLeft: 14 }]}>
      <Pressable
        onPress={goBack}
        hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
        style={{ zIndex: 10 }}
      >
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
      {/* <BlurView intensity={46} tint="dark" style={styles.blurStyle} /> */}
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  blurStyle: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
  },
  container: {
    alignItems: "center",
    backgroundColor: "transparent",
    flexDirection: "row",
    // backgroundColor: "rgba(0, 0, 0, 0.9)",
    // opacity: 1
  },
  textStyle: {
    color: color.white,
    marginLeft: 8,
    textAlign: "center",
    zIndex: 10,
  },
  titleContainer: {
    alignItems: "center",
    alignSelf: "center",
    flex: 1,
    paddingBottom: 10,
    textAlign: "center",
    zIndex: 10,
  },
})
