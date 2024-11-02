/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { BOTTOM_BAR_HEIGHT, DEVICE_HEIGHT } from "@music/constant/constant"
import { color } from "@music/theme/color"
import { StyleSheet, Text } from "react-native"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import Animated, { clamp, ReduceMotion, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"


const BASE_HEIGHT = BOTTOM_BAR_HEIGHT + 10
const THRESHOLD = 80
const MusicTrack = () => {
    const translateY = useSharedValue(BASE_HEIGHT);
  const startTranslateY = useSharedValue(BASE_HEIGHT);


  const pan = Gesture.Pan()
        .onBegin(() => {
            startTranslateY.value = translateY.value;
        })
        .onUpdate((event) => {
            const newHeight = startTranslateY.value - event.translationY;
            translateY.value = clamp(newHeight, BASE_HEIGHT, DEVICE_HEIGHT);
          //   
            
        })
        .onEnd(() => {
          const halfHeight = DEVICE_HEIGHT * 0.50;
          const secnodHalfHeight = DEVICE_HEIGHT * 0.4999
          if (translateY.value > halfHeight) {
            translateY.value = withSpring(DEVICE_HEIGHT - THRESHOLD, {
              damping: 8,
              reduceMotion: ReduceMotion.System,
              mass: 1,
              stiffness: 20,
              overshootClamping: false,
              restDisplacementThreshold: 0.01,
              restSpeedThreshold: 2,
            });
          } else if(translateY.value < secnodHalfHeight){
            translateY.value = withSpring(clamp(translateY.value, DEVICE_HEIGHT, BASE_HEIGHT), {
              damping: 6,
              reduceMotion: ReduceMotion.System,
              mass: 1,
              stiffness: 20,
              overshootClamping: false,
              restDisplacementThreshold: 0.01,
              restSpeedThreshold: 2,
            });
          }
           else {
          translateY.value = withSpring(clamp(translateY.value, BASE_HEIGHT, DEVICE_HEIGHT - THRESHOLD), {
            damping: 8,
            reduceMotion: ReduceMotion.System,
            mass: 1,
            stiffness: 20,
            overshootClamping: false,
            restDisplacementThreshold: 0.01,
            restSpeedThreshold: 2,
          });
        }
          // if()
        })
      // .onTouchesMove(event => {
        
      //   if(event.allTouches[0].absoluteY < DEVICE_HEIGHT - 50){
      //     console.log('"startTranslateY if con', event.allTouches[0].absoluteY);
      //     startTranslateY.value = event.allTouches[0].absoluteY
      //   } 
        
      //   else {
      //     console.log('"startTranslateY else', event.allTouches[0].absoluteY);
      //     translateY.value = (DEVICE_HEIGHT - BASE_HEIGHT) 
      //   }
        
      // })
      .runOnJS(true);

    const boxAnimatedStyles = useAnimatedStyle(() => ({
        height: translateY.value,
        color:  color.spotifyGreen
      }));

      console.log("translateY.value", translateY);
      
    const handleStyle = useAnimatedStyle(() => ({
      height: translateY.value
    }))
      
  return (
    <GestureDetector gesture={pan}>
    <Animated.View style={[styles.container, boxAnimatedStyles]}>
      <Animated.View  style={[styles.music, boxAnimatedStyles]}>
        <Text style={{marginVertical: 20}}>MusicTrack</Text>
      </Animated.View>
    </Animated.View>
    </GestureDetector>
  )
}

export default MusicTrack

const styles = StyleSheet.create({
  container: {
    bottom: BOTTOM_BAR_HEIGHT + 2,
    height: DEVICE_HEIGHT,
    left: 2,
    overflow: "visible",
    position: "absolute",
    right: 2,
    zIndex: 1
  },
  music : {
    backgroundColor: color.spotifyGreen
  }
})
