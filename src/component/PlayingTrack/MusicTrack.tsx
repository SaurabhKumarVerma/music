/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { BOTTOM_BAR_HEIGHT, DEVICE_HEIGHT } from "@music/constant/constant"
import { color } from "@music/theme/color"
import { LinearGradient } from "expo-linear-gradient"
import { Alert, StyleSheet, Text, View } from "react-native"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import Animated, { clamp, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"


const BASE_HEIGHT = BOTTOM_BAR_HEIGHT + 10
const THRESHOLD = 10
const MusicTrack = () => {
    const translateY = useSharedValue(BASE_HEIGHT);
  const startTranslateY = useSharedValue(BASE_HEIGHT);


  const pan = Gesture.Pan()
        .onBegin(() => {
            // Capture initial translation when scroll begins
            startTranslateY.value = translateY.value;
        })
        .onUpdate((event) => {
            const newHeight = startTranslateY.value - event.translationY;

            // Ensure height doesn't exceed boundaries
            translateY.value = Math.max(BASE_HEIGHT, Math.min(DEVICE_HEIGHT, newHeight));
          //   
            
        })
        // .onEnd(() => {
        //     // Snap back if close to base height, else keep current height
        //     if (translateY.value < BASE_HEIGHT + 50) {
        //         translateY.value = withSpring(BASE_HEIGHT);
        //     } else if (translateY.value > DEVICE_HEIGHT - 50) {
        //         translateY.value = withSpring(DEVICE_HEIGHT);
        //     }
        // })
      .onTouchesMove(event => {
        
        if(event.allTouches[0].absoluteY < BASE_HEIGHT + 10){
          startTranslateY.value = (DEVICE_HEIGHT - BASE_HEIGHT) 
        } 
        
        else {
          console.log('"startTranslateY', event.allTouches[0].absoluteY);
          startTranslateY.value = event.allTouches[0].absoluteY
        }
        
      })
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
