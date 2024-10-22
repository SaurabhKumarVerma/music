import { MusicText } from "@music/base/MusicText/MusicText"
import { useAppSelector } from "@music/hook/hook"
import apiService from "@music/service/api/api"
import { keys } from "@music/utils/pckeVerifier"
import tokenCache from "@music/utils/tokenCache"
import { useEffect } from "react"
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
export default function Home() {
  const insets = useSafeAreaInsets()
  const auth = useAppSelector((state) => state.authStore)

  useEffect(() => {}, [])

  const onPress = async () => {
    apiService
      .get(`albums/4aawyAB9vmqN3uQ7FjRGTy`)
      .then((response) => console.log("response ==>", response))
      .catch((error) => {
        console.log("Error", error)
      })
  }

  if (auth.isLoading) {
    return (
      <View style={{ justifyContent: "center", flex: 1, backgroundColor: color.appBackground }}>
        <ActivityIndicator size={"large"} />
      </View>
    )
  }

  const onPressDel = async () => {
    await tokenCache.deleteSaveToken(keys)
  }

  return (
    <View style={{ top: insets.top }}>
      <Text>Home</Text>
      <Pressable style={{ marginTop: 30 }} onPress={onPress}>
        <MusicText text="CLICK ME" />
      </Pressable>

      <Pressable style={{ marginTop: 30 }} onPress={onPressDel}>
        <MusicText text="DELETE ME" />
      </Pressable>
      {/* <MusicIcon name='play' size={30} color={color.torchRed as string}/> */}
    </View>
  )
}

const styles = StyleSheet.create({})
