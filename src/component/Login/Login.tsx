import { useEffect } from "react"
import { Button, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useWarmUpBrowser } from "@music/hook/useWarmUpBrowser"
import * as WebBrowser from "expo-web-browser"
import { makeRedirectUri, useAuthRequest } from "expo-auth-session"

WebBrowser.maybeCompleteAuthSession()

const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
}

const Login = () => {
  const insets = useSafeAreaInsets()
  useWarmUpBrowser()
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: "52460fe035aa452385f9d53b7f769e09",
      scopes: ["user-read-email", "playlist-modify-public"],
      usePKCE: false,
      redirectUri: makeRedirectUri({ native: "myapp://" }),
    },
    discovery,
  )

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params
    }
  }, [response])

  console.log("response ==>", response)

  const onPress = () => {
    promptAsync()
  }

  return (
    <View style={{ top: insets.top }}>
      <Button onPress={onPress} title="Sign in with apple" />
    </View>
  )
}
export default Login
