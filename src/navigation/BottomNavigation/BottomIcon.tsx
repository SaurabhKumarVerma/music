/* eslint-disable react-native/no-inline-styles */
import { StyleSheet } from "react-native"

import Animated from "react-native-reanimated"
import { color } from "@music/theme/color"
import { capitalizeFirstLetter } from "@music/utils/toCapital"
import { ESCREENICON } from "@music/types/type"
import { MusicText } from "@music/base/MusicText/MusicText"
import { Ionicons } from "@expo/vector-icons"

interface IBottomIcon {
  isFocused: boolean
  routeName: string
  index: number
}

type RouteNames = "Home" | "Setting" | "Search" | "AudioBooks"

const BottomIcon = (props: IBottomIcon) => {
  const routeMap: Record<RouteNames, ESCREENICON> = {
    Home: ESCREENICON.OUTLINE_PLAY,
    Setting: ESCREENICON.OUTLINE_SETTING,
    Search: ESCREENICON.SEARCH,
    AudioBooks: ESCREENICON.AUDIOBOOKS,
  }

  const selectedRouteMap: Record<RouteNames, ESCREENICON> = {
    Home: ESCREENICON.PLAY,
    Setting: ESCREENICON.SETTING,
    Search: ESCREENICON.SEARCH,
    AudioBooks: ESCREENICON.AUDIOBOOKS,
  }

  const routeName = (name: string): string => {
    const capName = capitalizeFirstLetter(name)
    const defaultIconName = ESCREENICON.PLAY
    const iconName = props.isFocused
      ? selectedRouteMap[capName as RouteNames]
      : routeMap[capName as RouteNames]
    return iconName || defaultIconName
  }

  return (
    <Animated.View
      style={{ justifyContent: "center", alignItems: "center", alignContent: "center" }}
    >
      <Animated.View
        style={{
          paddingBottom: 8,
        }}
      >
        <Animated.View style={styles.container}>
          <Ionicons
            name={routeName(props.routeName) as any}
            size={30}
            color={props.isFocused ? color.selectedColor : color.mediumGray}
          />
          <MusicText
            preset="medium"
            style={{
              color: props.isFocused ? color.selectedColor : color.mediumGray,
              fontSize: 10,
              fontWeight: "700",
              overflow: "hidden",
              textAlign: "center",
            }}
            numberOfLines={1}
          >
            {capitalizeFirstLetter(props.routeName)}
          </MusicText>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 24,
    zIndex: 1,
  },
})

export default BottomIcon
