/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "@music/constant/constant"
import { useAppDispatch, useAppSelector } from "@music/hook/hook"
import { setIsMenuClose } from "@music/store/slice/menuSlice"
import { BlurView } from "expo-blur"
import { Pressable, StyleSheet, View } from "react-native"
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated"
import { MusicText } from "../MusicText/MusicText"
import { IMenuData } from "@music/types/type"
import Ionicons from "@expo/vector-icons/Ionicons"
import { color } from "@music/theme/color"

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)
const AnimatedBlurView = Animated.createAnimatedComponent(BlurView)
const MusicMenu = () => {
  const { yPosition, menuData } = useAppSelector((state) => state.menuStore)
  const dispatch = useAppDispatch()

  const handleMenuAction = (actionId: number) => {
    switch (actionId) {
      case 0:
        console.log("Play action triggered")
        break
      case 1:
        console.log("Share action triggered")
        break
      case 2:
        console.log("Share action triggered")
        break
      case 3:
        console.log("Share action triggered")
        break
      default:
        console.log(`Action ${actionId} not implemented`)
    }

    dispatch(setIsMenuClose())
  }

  const renderItem = (data: { item: IMenuData }) => {
    return (
      <AnimatedPressable
        onPress={() => {
          handleMenuAction(data.item.id)
          dispatch(setIsMenuClose())
        }}
        entering={FadeInRight.duration(300)}
        exiting={FadeOutLeft.duration(200)}
        style={{
          zIndex: 10,
          flexDirection: "row",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "space-between",
          paddingVertical: 20,
          paddingHorizontal: 16,
          borderRadius: 20,
          overflow: "hidden",
        }}
      >
        <MusicText text={data.item.title} preset="semiBold" size="xs" />

        <Ionicons
          name={data.item.icon as keyof typeof Ionicons.glyphMap}
          size={20}
          color={color.white}
        />
      </AnimatedPressable>
    )
  }
  return (
    <AnimatedPressable onPress={() => dispatch(setIsMenuClose())} style={styles.visibleMenuStyle}>
      <Animated.View
        style={{
          top: yPosition,
          left: DEVICE_WIDTH / 3,
          width: DEVICE_WIDTH / 1.6,
          zIndex: 10,
          overflow: "hidden",
          borderRadius: 20,
        }}
      >
        <Animated.FlatList
          data={menuData as IMenuData[]}
          renderItem={renderItem}
          style={{ zIndex: 10, overflow: "hidden" }}
          contentContainerStyle={{
            overflow: "hidden",
            zIndex: 10,
          }}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 1,
                backgroundColor: color.charcoalGray,
                top: 0,
                opacity: 0.2,
                width: DEVICE_WIDTH / 1.8,
                left: 10,
              }}
            />
          )}
        />
        <AnimatedBlurView
          intensity={30}
          tint="systemMaterialDark"
          style={{ ...StyleSheet.absoluteFillObject, overflow: "hidden" }}
        />
      </Animated.View>
      <Animated.View
        entering={FadeInRight.duration(200)}
        exiting={FadeOutLeft.duration(200)}
        style={styles.container}
      >
        <AnimatedBlurView
          intensity={30}
          tint="dark"
          style={{ ...StyleSheet.absoluteFillObject, overflow: "hidden" }}
        />
      </Animated.View>
    </AnimatedPressable>
  )
}

export default MusicMenu

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
    width: DEVICE_WIDTH,
  },
  visibleMenuStyle: {
    height: DEVICE_HEIGHT,
    position: "absolute",
    width: DEVICE_WIDTH,
    zIndex: 10,
  },
})
