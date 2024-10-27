/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import { StatusBar } from "expo-status-bar"

import * as Splash from "expo-splash-screen"
import { Provider } from "react-redux"
import * as WebBrowser from "expo-web-browser"
import { store } from "@music/store/store"
import { navigationRef } from "@music/navigation/Rootnavigation"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { useFonts } from "expo-font"
import * as Linking from "expo-linking"
import { typography } from "@music/theme/typography"
import { useEffect } from "react"
import { appTheme } from "@music/theme/appTheme"
import Main from "@music/app"
import { ActivityIndicator } from "react-native"
import { color } from "@music/theme/color"

Splash.preventAutoHideAsync()
WebBrowser.maybeCompleteAuthSession()

export default function App() {
  const [loaded, error] = useFonts({
    IcoMoon: require("./assets/icons/icomoon.ttf"),
    typography,
  })


  useEffect(() => {
    if (loaded || error) {
      Splash.hideAsync()
      // fetchFonts()
    }
  }, [loaded, error])

  if (!loaded && !error && !navigationRef.isReady()) {
    return <ActivityIndicator color={color.selectedColor}/>
  }

  // if () {
  //   return null
  // }

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
