import { ActivityIndicator, StyleSheet, View } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import RootNavigator from "./navigation/RootNavigator"
import { useAppDispatch, useAppSelector } from "./hook/hook"
import AuthNavigator from "./navigation/AuthNavigator/AuthNavigator"
import { useEffect } from "react"
import { getRefreshToken, getStoreToken } from "./store/slice/authSlice"
import { color } from "./theme/color"
import MusicTrack from "./component/PlayingTrack/MusicTrack"

interface IMain {
  navigationRef: any
  linking: any
  appTheme: any
}

const Main = (props: IMain) => {
  const auth = useAppSelector((state) => state.authStore)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getStoreToken())
    dispatch(getRefreshToken())
  }, [])

  if (auth.isLoading) {
    return (
      <View style={styles.activityIndicatorStyle}>
        <ActivityIndicator size={"large"} color={color.selectedColor} />
      </View>
    )
  }

  return (
    <NavigationContainer ref={props.navigationRef} linking={props.linking} theme={props.appTheme}>
      {auth.access_token === null ? (
        <>
          <AuthNavigator />
        </>
      ) : (
        <>
          {/* <View style={{overflow: 'visible', zIndex: 1}}>
            <FloatingScreen />
          </View> */}
          <MusicTrack />
          <RootNavigator />
        </>
      )}
    </NavigationContainer>
  )
}

export default Main

const styles = StyleSheet.create({
  activityIndicatorStyle: {
    flex: 1,
    justifyContent: "center",
  },
  //   floatingScreen: {
  //     left: 6,
  //     // position: "absolute",
  //     right: 6,
  //     overflow: "visible",
  //     zIndex: 1,
  //   },
})
