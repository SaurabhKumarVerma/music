import LoginScreen from "@music/screen/LoginScreen/LoginScreen"
import { ESCREEN } from "@music/types/screen"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

const AuthNavigator = () => {
  const Stack = createNativeStackNavigator()
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ESCREEN.LOGIN_SCREEN} component={LoginScreen} />
    </Stack.Navigator>
  )
}

export default AuthNavigator
