import { createNativeStackNavigator } from "@react-navigation/native-stack"
import BottomNavigation from "./BottomNavigation/BottomNavigation"
import { ESCREEN } from "@music/types/screen"
import PlayTrackModal from "./StackNavigation/HomeStack"
import { RootStackParamList } from "./NavigationTypes/types"
import SongListDetail from "@music/component/SongListDetail/SongListDetail"

const RootNavigator = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>()
  return (
    <Stack.Navigator initialRouteName={ESCREEN.MAIN_SCREEN} screenOptions={{ headerShown: false }}>
      <Stack.Screen component={BottomNavigation} name={ESCREEN.MAIN_SCREEN} />
      <Stack.Screen
        name={ESCREEN.PLAYING_TRACK}
        component={PlayTrackModal}
        options={{
          headerShown: false,
          animationTypeForReplace: "push",
          gestureEnabled: true,
          animation: "fade_from_bottom",
          presentation: "modal",
          autoHideHomeIndicator: true,
          gestureDirection: "vertical",
          fullScreenGestureEnabled: true,
          fullScreenGestureShadowEnabled: true,
          sheetCornerRadius: 20,
        }}
      />
      <Stack.Screen name={ESCREEN.SONG_LIST_DETAIL} component={SongListDetail} />
    </Stack.Navigator>
  )
}

export default RootNavigator
