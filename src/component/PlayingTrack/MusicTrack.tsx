/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { BOTTOM_BAR_HEIGHT, DEVICE_HEIGHT } from "@music/constant/constant"
import { color } from "@music/theme/color"
import { LinearGradient } from "expo-linear-gradient"
import { StyleSheet, Text, View } from "react-native"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import Animated, { clamp, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"


const BASE_HEIGHT = BOTTOM_BAR_HEIGHT + 10
const MusicTrack = () => {
    const translateY = useSharedValue(BASE_HEIGHT);
  const startTranslateY = useSharedValue(BASE_HEIGHT);


    const pan = Gesture.Pan().onBegin(event => {
        
    })
    .onUpdate((event) => {
       if(event.translationY < DEVICE_HEIGHT -100){
        translateY.value = withSpring(Math.max(
            BASE_HEIGHT,
            Math.min(DEVICE_HEIGHT, DEVICE_HEIGHT - event.translationY)
          ));
       }
      })
      .onEnd(() => {
        if (translateY.value < BASE_HEIGHT + 50) {
            translateY.value = withSpring(BASE_HEIGHT);
          }
      })
      .onTouchesMove(event => {
        console.log('"startTranslateY', event.allTouches[0].absoluteY);
        startTranslateY.value = event.allTouches[0].absoluteY
      })
      .runOnJS(true);

    const boxAnimatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
      }));

      console.log("translateY.value", translateY.value);
      
      
      
  return (
    <GestureDetector gesture={pan}>
    <Animated.View style={[styles.container]}>
      <LinearGradient colors={color.background} style={{}}>
        <Text style={{marginVertical: 20}}>MusicTrack</Text>
      </LinearGradient>
    </Animated.View>
    </GestureDetector>
  )
}

export default MusicTrack

const styles = StyleSheet.create({
  container: {
    bottom: BOTTOM_BAR_HEIGHT + 2,
    left: 2,
    overflow: "visible",
    position: "absolute",
    right: 2,
    zIndex: 1,
  },
})
