import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text } from "react-native"

import * as Splash from "expo-splash-screen"
import { Provider } from "react-redux"
import * as WebBrowser from "expo-web-browser"
import { NavigationContainer } from "@react-navigation/native"
import { store } from "@music/store/store"
import SplashScreen from "@music/screen/SplashScreen"
import FloatingScreen from "@music/screen/FloatingScreen/FloatingScreen"
import { navigationRef } from "@music/navigation/Rootnavigation"
import { BOTTOM_BAR_HEIGHT } from "@music/constant/constant"
import RootNavigator from "@music/navigation/RootNavigator"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { createIconSetFromIcoMoon } from "@expo/vector-icons"
import { useFonts } from "expo-font"
import { useEffect } from "react"
import * as Linking from "expo-linking"
import { typography } from "@music/theme/typography"

Splash.preventAutoHideAsync()
export const Icon = createIconSetFromIcoMoon(
  require("./assets/icons/selection.json"),
  "IcoMoon",
  "icomoon.ttf",
)
WebBrowser.maybeCompleteAuthSession()
export default function App() {
  const [loaded, error] = useFonts(typography)
  useEffect(() => {
    if (loaded || error) {
      Splash.hideAsync()
    }
  }, [loaded, error])

  if (!loaded && !error) {
    return null
  }

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

  // tokenCache={tokenCache}
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#131212" }}>
      <Provider store={store}>
        <NavigationContainer
          ref={navigationRef}
          linking={linking}
          fallback={<Text>Loading...</Text>}
        >
          <SplashScreen />
          <RootNavigator />
          <StatusBar style="auto" />
          <FloatingScreen style={styles.floatingScreen} />
        </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  floatingScreen: {
    bottom: BOTTOM_BAR_HEIGHT + 2,
    left: 6,
    position: "absolute",
    right: 6,
  },
})
