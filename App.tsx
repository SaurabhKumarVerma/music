/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import { StatusBar } from "expo-status-bar"

import * as Splash from "expo-splash-screen"
import { Provider } from "react-redux"
import * as WebBrowser from "expo-web-browser"
import { store } from "@music/store/store"
import SplashScreen from "@music/screen/SplashScreen"
import { navigationRef } from "@music/navigation/Rootnavigation"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { createIconSetFromIcoMoon } from "@expo/vector-icons"
import { useFonts } from "expo-font"
import * as Linking from "expo-linking"
import { typography } from "@music/theme/typography"
import { useEffect } from "react"
import { appTheme } from "@music/theme/appTheme"
import Main from "@music/app"
import AppleMusicUI from "@music/screen/FloatingScreen/Test"
import FloatingScreen from "@music/screen/FloatingScreen/FloatingScreen"
import { View } from "react-native"
import { BOTTOM_BAR_HEIGHT } from "@music/constant/constant"

Splash.preventAutoHideAsync()
export const Icon = createIconSetFromIcoMoon(
  require("./assets/icons/selection.json"),
  "IcoMoon",
  "icomoon.ttf",
)
WebBrowser.maybeCompleteAuthSession()

export default function App() {
  // console.log("app==Id", appId)

  const [loaded, error] = useFonts(typography as unknown as string)
  useEffect(() => {
    if (loaded || error) {
      Splash.hideAsync()
    }
  }, [loaded, error])

  if (!loaded && !error && !navigationRef.isReady()) {
    return null
  }

  // if () {
  //   return null
  // }

  console.log("navigationRef.isReady()", navigationRef.isReady())
  

  const linking = {
    prefixes: [
      Linking.createURL("/"),
      "music://auth/spotify",
      "exp://localhost:8081/--/spotify-auth-callback",
      "myapp://",
    ],
    config: {
      // main: {
      initialRouteName: "main",
      screens: {
        Home: "home",
        Setting: "setting",
        Search: "search",
      },
    },
    // }
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        {/* <SplashScreen /> */}

        <Main appTheme={appTheme} linking={linking} navigationRef={navigationRef} />
        {/*  */}
      </Provider>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  )
}
