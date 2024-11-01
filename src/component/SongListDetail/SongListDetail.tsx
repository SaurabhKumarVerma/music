import Header from "@music/base/Header/Header"
import { StyleSheet, Text, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const SongListDetail = () => {
  const insets = useSafeAreaInsets()
  return (
    <View style={{ top: insets.top }}>
        <View style={{backgroundColor: 'red'}}>
        <Header title="Browser" />
        </View>
      
      <Text>SongListDetail</Text>
    </View>
  )
}

export default SongListDetail

const styles = StyleSheet.create({})
