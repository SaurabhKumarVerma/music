/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { BOTTOM_BAR_HEIGHT, DEVICE_HEIGHT, DEVICE_WIDTH } from "@music/constant/constant"
import { usePlayerBackground } from "@music/hook/usePlayerBackground"
import { color } from "@music/theme/color"
import { LinearGradient } from "expo-linear-gradient"
import { useState } from "react"
import { StyleSheet, Text } from "react-native"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import Animated, { clamp, interpolate, interpolateColor, ReduceMotion, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"


const BASE_HEIGHT = 50 + 10
const THRESHOLD = 80
const MusicTrack = () => {
  const translateY = useSharedValue(BASE_HEIGHT);
  const startTranslateY = useSharedValue(BASE_HEIGHT);
  const [showGradient, setShowGradient] = useState(false)
  const { imageColors } = usePlayerBackground("https://picsum.photos/id/237/200/300") // testing adding this image

  const pan = Gesture.Pan()
        .onBegin(() => {
            startTranslateY.value = translateY.value;
        })
        .onUpdate((event) => {
            const newHeight = startTranslateY.value - event.translationY;
            translateY.value = clamp(newHeight, BASE_HEIGHT, DEVICE_HEIGHT);
            
        })
        .onEnd(() => {
          const halfHeight = DEVICE_HEIGHT * 0.50;
          const secnodHalfHeight = DEVICE_HEIGHT * 0.4999
          if (translateY.value > halfHeight) {
            setShowGradient(true)
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
            setShowGradient(false)
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
        })
      .runOnJS(true);

      const boxAnimatedStyles = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
          translateY.value,
          [1, DEVICE_HEIGHT],
          imageColors ? [imageColors.background, imageColors.primary, imageColors.secondary]:['rgba(0,0,0,0.8)', 'rgb(255, 255, 255)'] ,
          'RGB',
        {
          gamma: 3.2,
        }
        );
      
        return {
          height: translateY.value,
          backgroundColor,
          opacity: interpolate(
            translateY.value,
            [0, DEVICE_HEIGHT - 500, DEVICE_HEIGHT - 90],
            [0.5, 0.8, 1]
          ),
        };
      });

      const animateIndicator = useAnimatedStyle(() => {
        const height = interpolate(
          translateY.value,
          [BASE_HEIGHT, DEVICE_HEIGHT - 500, DEVICE_HEIGHT - 90],
          [0, 10,10]
        );
      
        const marginTop = interpolate(
          translateY.value,
          [BASE_HEIGHT, DEVICE_HEIGHT - 500, DEVICE_HEIGHT - 90],
          [0, 25, 50]
        );
      
        const opacity = interpolate(
          translateY.value,
          [BASE_HEIGHT, DEVICE_HEIGHT * 0.1],
          [0, 1]
        );
      
        return {
          height,
          marginTop,
          opacity,
        };
      });
       

  return (
    <GestureDetector gesture={pan}>
    <Animated.View style={[styles.container,  boxAnimatedStyles,]}>
      <Animated.View  style={[styles.music, boxAnimatedStyles]}>
     
      {showGradient && (
        <LinearGradient
          colors={imageColors ? [imageColors.background, imageColors.primary, imageColors.secondary]: color.background}
          style={{ ...StyleSheet.absoluteFillObject }}
        />
      )}
      <Animated.View>
      <Text style={{ color: 'white'}} >MusicTrack</Text>
      <Animated.View style={[styles.bottomSheetIndicator, animateIndicator]}/>
      </Animated.View>
       
        
      </Animated.View>
    </Animated.View>
    </GestureDetector>
  )
}

export default MusicTrack

const styles = StyleSheet.create({
  bottomSheetIndicator: {
    alignSelf: 'center',
    backgroundColor: color.selectedColor,
    borderRadius: 10, 
    overflow: "visible",
    width: DEVICE_WIDTH * 0.14,
  },
  container: {
    bottom: BOTTOM_BAR_HEIGHT + 2,
    left: 1,
    overflow: "hidden",
    position: "absolute",
    right: 1,
    zIndex: 1,
    borderRadius: 10
    
  },
  music : {
    backgroundColor: color.spotifyGreen,
  }
})
