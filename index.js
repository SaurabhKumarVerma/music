import "react-native-url-polyfill/auto"
import App from "./App"
import { AppRegistry } from "react-native"

// registerRootComponent(appName, () => App);
// TrackPlayer.registerPlaybackService(() => PlaybackService);
AppRegistry.registerComponent("main", () => App)
