/* eslint-disable react-native/no-inline-styles */
import MusicScreen from "@music/base/MusicScreen/MusicScreen"
import tokenCache from "@music/utils/tokenCache"
import { Pressable, StyleSheet, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import HomeHeader from "./HomeHeader"
import Divider from "@music/base/Divider/Divider"
import { MusicText } from "@music/base/MusicText/MusicText"
import TopPick from "./TopPick"
import { color } from "@music/theme/color"
import { AuthConfiguration, authorize } from "react-native-app-auth"
import AUTH_CONFIG from "@music/config/config"
import { ACCESS_TOKEN, RESFRESH_TOKEN } from "@music/utils/pckeVerifier"
import { useAppDispatch } from "@music/hook/hook"
import { onLogout } from "@music/store/slice/userSlice"
import apiService from "@music/service/api/api"
import { IAuthRefreshTokenResponse } from "@music/types/type"
import axios from "axios"

export default function Home() {
  const insets = useSafeAreaInsets()
  const dispatch = useAppDispatch()

  const getRefreshToken = async () => {
    // refresh token that has been previously stored
    const refreshToken = await tokenCache.getToken(RESFRESH_TOKEN)
    const url = "https://accounts.spotify.com/api/token"

    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: {
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: process.env.EXPO_PUBLIC_CLIENT_ID,
      },
    }
    const body = await fetch(url, payload)
    const response = await body.json()

    console.log("access_token", response)
    console.log("refresh_token", response)
  }

  const onPress = async () => {
    console.log("called")

    getRefreshToken()
    // apiService
    //   .get("albums/4aawyAB9vmqN3uQ7FjRGTy")
    //   .then((res) => console.log("res", res.data))
    //   .catch((error) => console.log("Error", error))
  }

  const onPressDel = async () => {
    await tokenCache.deleteSaveToken(ACCESS_TOKEN)
  }

  return (
    <MusicScreen style={[styles.container, { top: insets.top }]}>
      <Pressable onPress={onPress} style={styles.headerStyle}>
        <HomeHeader />
      </Pressable>

      <Divider />

      <View style={styles.topPicsContainer}>
        <MusicText
          text="Top Picks"
          // preset="heading"
          // weight="extraBold"
          preset="largeHeading"
          size="lg"
          style={{ color: color.white, fontSize: "40", fontWeight: "700" }}
        />
        <TopPick />
      </View>
      {/* <MusicIcon name='play' size={30} color={color.torchRed as string}/> */}
    </MusicScreen>
  )
}

const styles = StyleSheet.create({
  container: {
    // marginHorizontal: 16,
  },
  headerStyle: {
    marginBottom: 20,
    marginHorizontal: 16,
    marginTop: 30,
  },
  topPicsContainer: {
    marginLeft: 16,
    marginTop: 30,
  },
})
