import { MusicText } from "@music/base/MusicText/MusicText"
import { DEVICE_HEIGHT } from "@music/constant/constant"
import { color } from "@music/theme/color"
import { BlurView } from "expo-blur"
import { Pressable, StyleSheet, View } from "react-native"
import Left from "../../../assets/svg/leftLine.svg"
import Right from "../../../assets/svg/rightLine.svg"
import Spotify from "../../../assets/svg/spotify.svg"
import { makeRedirectUri, useAuthRequest } from "expo-auth-session"
import { SCOPES } from "@music/service/api/scope"
import { discovery } from "@music/lib/servicepath"
import { useDispatch } from "react-redux"
import { storeUserToken } from "@music/store/slice/userSlice"
import { useEffect } from "react"

const LoginBody = () => {
  const dispatch = useDispatch()
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: process.env.EXPO_PUBLIC_CLIENT_ID!,
      scopes: SCOPES,
      usePKCE: false,
      redirectUri: makeRedirectUri({ native: "myapp://" }),
    },
    discovery,
  )

  useEffect(() => {
    console.log(" this hs response", response)
  }, [response])

  const onPress = () => {
    promptAsync()
      .then((response) => {
        // console.log(" this", response)
        // tokenCache.saveToken(keys.storeKey, response?.params?.code)
        if (response.type === "success") {
          dispatch(storeUserToken(response?.params?.code))
        } else {
          dispatch(storeUserToken(null))
        }
      })
      .catch((error) => {
        console.log("Error", error)
      })
  }

  return (
    <BlurView style={styles.container} intensity={25}>
      <View style={styles.spotifyLogoContainer}>
        <View style={styles.spotifyLogo}>
          <Spotify width={70} height={100} />
          <MusicText preset="largeHeading" text="Spotify" style={styles.spotifyText} />
        </View>
        <View style={styles.textContainer}>
          <MusicText preset="bold" size="lg" text="Millions of Songs." style={styles.textSpacing} />
          <MusicText preset="bold" size="lg" text="Free on Spotify." style={styles.textSpacing} />
        </View>
      </View>
      <MusicText
        text="Get Started Free"
        preset="semiBold"
        size="bold"
        style={styles.headingStyle}
      />
      <MusicText text="Free Forever. No Ads" preset="bold" size="xxs" style={styles.cta} />

      <View style={styles.loginTextContainer}>
        <Left width={150} height={2} />
        <MusicText text="Signing with" preset="semiBold" size="xxs" style={styles.loginText} />
        <Right width={150} height={2} />
      </View>
      <Pressable disabled={!request} onPress={onPress} style={styles.buttonContainer}>
        <View>
          <MusicText
            preset="bold"
            size="sm"
            text="Continue with Spotify"
            style={styles.buttonText}
          />
        </View>
      </Pressable>
    </BlurView>
  )
}

export default LoginBody

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: color.spotifyGreen,
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 40,
    paddingVertical: 18,
  },
  buttonText: {
    color: color.black,
    textAlign: "center",
  },
  container: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: DEVICE_HEIGHT * 0.71,
    overflow: "hidden",
  },
  cta: {
    color: color.grey5,
    marginTop: 10,
    textAlign: "center",
  },
  headingStyle: {
    marginTop: "20%",
    textAlign: "center",
  },
  loginText: {
    color: color.grey5,
    letterSpacing: 1,
  },
  loginTextContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "20%",
  },
  spotifyLogo: {
    alignItems: "center",
    flexDirection: "row",
  },
  spotifyLogoContainer: {
    alignItems: "center",
    marginTop: 30,
  },
  spotifyText: {
    marginLeft: 20,
  },
  textContainer: {
    alignItems: "center",
    marginTop: 14,
  },
  textSpacing: {
    marginTop: 10,
  },
})
