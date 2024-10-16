import { Button, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useWarmUpBrowser } from "@music/hook/useWarmUpBrowser"
import * as WebBrowser from "expo-web-browser"
import { makeRedirectUri, useAuthRequest } from "expo-auth-session"
import { SCOPES } from "@music/service/api/scope"

WebBrowser.maybeCompleteAuthSession()

const discovery = {
  authorizationEndpoint: process.env.EXPO_PUBLIC_AUTHORIZATION_ENDPOINT!,
  tokenEndpoint: process.env.EXPO_PUBLIC_TOKEN_ENDPOINT!,
}

const Login = () => {
  const insets = useSafeAreaInsets()
  useWarmUpBrowser()
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: process.env.EXPO_PUBLIC_CLIENT_ID!,
      scopes: SCOPES,
      usePKCE: false,
      redirectUri: makeRedirectUri({ native: "myapp://" }),
    },
    discovery,
  )

  const onPress = () => {
    promptAsync()
      .then((response) => {
        console.log(" this", response)
      })
      .catch((error) => {
        console.log("Error", error)
      })
  }

  return (
    <View style={{ top: insets.top }}>
      <Button disabled={!request} onPress={onPress} title="Sign in with apple" />
    </View>
  )
}
export default Login
