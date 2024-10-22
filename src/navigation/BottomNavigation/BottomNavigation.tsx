import { BottomTabBarProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { ESCREEN } from "@music/types/screen"
import { BottomTabParamList } from "../NavigationTypes/types"
import SearchScreen from "@music/screen/SearchScreen/SearchScreen"
import SettingScreen from "@music/screen/SettingScreen/SettingScreen"
import CustomBottomTabBar from "./CustomTabBar"
import HomeScreen from "@music/screen/HomeScreen/HomeScreen"
import LoginScreen from "@music/screen/LoginScreen/LoginScreen"

const BottomNavigation = () => {
  const Tabs = createBottomTabNavigator<BottomTabParamList>()

  const CustomBottomTabs = (props: BottomTabBarProps) => {
    return <CustomBottomTabBar {...props} key={Math.random()} />
  }

  return (
    <Tabs.Navigator
      initialRouteName={ESCREEN.HOME_SCREEN}
      screenOptions={{ headerShown: false }}
      tabBar={CustomBottomTabs}
    >
      {/* <Tabs.Screen name={ESCREEN.LOGIN_SCREEN} component={LoginScreen} /> */}
      <Tabs.Screen name={ESCREEN.HOME_SCREEN} component={HomeScreen} />
      <Tabs.Screen name={ESCREEN.SEARCH_SCREEN} component={SearchScreen} />
      <Tabs.Screen name={ESCREEN.SETTING_SCREEN} component={SettingScreen} />
    </Tabs.Navigator>
  )
}

export default BottomNavigation
