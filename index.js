import "react-native-gesture-handler"
import "react-native-url-polyfill/auto"
import App from "./App"
import { AppRegistry } from "react-native"
import TrackPlayer from "react-native-track-player"
import { PlaybackService } from "./src/service/audio/PlaybackService"

// registerRootComponent(appName, () => App);
AppRegistry.registerComponent("main", () => App)
TrackPlayer.registerPlaybackService(() => PlaybackService)
