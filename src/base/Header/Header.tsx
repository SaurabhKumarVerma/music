import { BlurView } from "expo-blur"
import { StyleSheet, View } from "react-native"
import { MusicText } from "../MusicText/MusicText"
import { AntDesign } from "@expo/vector-icons"
import { color } from "@music/theme/color"

interface IHeader {
  title: string
}

const Header = (props: IHeader) => {
  return (
    <View style={styles.container}>
      <BlurView intensity={100} style={styles.blurContainer}>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 28, marginBottom: 10 }}
        >
          <AntDesign name="left" size={32} color={color.selectedColor} />
          <MusicText
            size="lg"
            preset="medium"
            text={props.title}
            style={{ color: color.selectedColor, marginLeft: 8 }}
          />
        </View>
      </BlurView>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  blurContainer: {
    borderRadius: 20,
    paddingTop: 34,
    // overflow: "hidden",
  },
  container: {
    flex: 1,
  },
})
