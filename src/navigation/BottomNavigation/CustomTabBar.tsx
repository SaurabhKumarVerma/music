/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, View, Pressable } from "react-native"
import { BottomTabBarProps } from "@react-navigation/bottom-tabs"
import BottomIcon from "./BottomIcon"
import { color } from "@music/theme/color"
import * as Haptics from "expo-haptics"
import { BOTTOM_BAR_HEIGHT } from "@music/constant/constant"
import { BlurView } from "expo-blur"
import Animated from "react-native-reanimated"

const BlurAnimatedView = Animated.createAnimatedComponent(BlurView)

const CustomBottomTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const MARGIN = 0
  return (
    <View
      // tint="regular"
      // intensity={100}
      style={[styles.container, { width: "100%", bottom: MARGIN }]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]

        const isFocused = state.index === index

        const onPress = () => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params)
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          })
        }
        return (
          <Pressable
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
            }}
          >
            <View style={[styles.content, { borderRadius: 24 }]}>
              <BottomIcon isFocused={isFocused} routeName={route.name} index={state.index} />
            </View>
          </Pressable>
        )
      })}
    </View>
    // </Shadow>
  )
}

export default CustomBottomTabBar
const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    borderTopColor: color.mediumGray,
    borderTopWidth: 0.2,
    flexDirection: "row",
    flex: 1,
    height: BOTTOM_BAR_HEIGHT,
    justifyContent: "space-around",
    overflow: "hidden",
    position: "absolute",
  },
  content: {
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
})
