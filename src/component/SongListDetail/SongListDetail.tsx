import Header from "@music/base/Header/Header"
import { MusicText } from "@music/base/MusicText/MusicText"
import { useRoute } from "@react-navigation/native"
import { StyleSheet, Text, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const SongListDetail = () => {
  const insets = useSafeAreaInsets()
  const props = useRoute()

  return (
    <View style={{ top: insets.top }}>
      <View style={{ }}>
        <Header title={`Browser ${props.params?.artistName}`} />
      </View>

      {/* <MusicText text="Hello"/> */}

      {/* <Text>SongListDetail</Text> */}
    </View>
  )
}

export default SongListDetail

const styles = StyleSheet.create({})
