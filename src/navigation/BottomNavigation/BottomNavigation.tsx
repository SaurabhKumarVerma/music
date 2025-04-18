import { BottomTabBarProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { ESCREEN } from "@music/types/screen"
import { BottomTabParamList } from "../NavigationTypes/types"
import SearchScreen from "@music/screen/SearchScreen/SearchScreen"
import SettingScreen from "@music/screen/SettingScreen/SettingScreen"
import CustomBottomTabBar from "./CustomTabBar"
import HomeScreen from "@music/screen/HomeScreen/HomeScreen"
import AudioBooksScreen from "@music/screen/AudioBooksScreen/AudioBooksScreen"

const BottomNavigation = () => {
  const Tabs = createBottomTabNavigator<BottomTabParamList>()

  const CustomBottomTabs = (props: BottomTabBarProps) => {
    return <CustomBottomTabBar {...props} key={Math.random()} />
  }

  return (
    <Tabs.Navigator
      initialRouteName={ESCREEN.HOME_SCREEN}
      screenOptions={{
        headerShown: false,
      }}
      tabBar={CustomBottomTabs}
    >
      <Tabs.Screen name={ESCREEN.HOME_SCREEN} component={HomeScreen} />
      <Tabs.Screen name={ESCREEN.SEARCH_SCREEN} component={SearchScreen} />
      <Tabs.Screen name={ESCREEN.SETTING_SCREEN} component={SettingScreen} />
      <Tabs.Screen name={ESCREEN.AUDIO_BOOKS_SCREEN} component={AudioBooksScreen} />
    </Tabs.Navigator>
  )
}
export default BottomNavigation
