/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import MusicImage from "@music/base/MusicImage/MusicImage"
import { BOTTOM_BAR_HEIGHT, DEVICE_HEIGHT, DEVICE_WIDTH } from "@music/constant/constant"
import { usePlayerBackground } from "@music/hook/usePlayerBackground"
import { color } from "@music/theme/color"
import { Image } from "expo-image"
import { LinearGradient } from "expo-linear-gradient"
import { useState } from "react"
import { StyleSheet } from "react-native"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import Animated, { clamp, interpolate, interpolateColor, ReduceMotion, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"


const BASE_HEIGHT = 50 + 10
const THRESHOLD = 80

const MusicTrack = () => {
  const translateY = useSharedValue(BASE_HEIGHT);
  const startTranslateY = useSharedValue(BASE_HEIGHT);
  const [showGradient, setShowGradient] = useState(false)
  const { imageColors } = usePlayerBackground("https://img.icons8.com/fluency/48/music-library.png") // testing adding this image

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
      } else if (translateY.value < secnodHalfHeight) {
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
      imageColors ? [imageColors.background, imageColors.primary, imageColors.secondary] : ['rgba(0,0,0,0.8)', 'rgb(255, 255, 255)'],
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
        [0, DEVICE_HEIGHT - 500, DEVICE_HEIGHT - THRESHOLD],
        [1, 0.5, 1]
      ),
    };
  });

  const animateIndicator = useAnimatedStyle(() => {
    const height = interpolate(
      translateY.value,
      [BASE_HEIGHT, DEVICE_HEIGHT - 500, DEVICE_HEIGHT - THRESHOLD],
      [0, 10, 10]
    );

    const marginTop = interpolate(
      translateY.value,
      [BASE_HEIGHT, DEVICE_HEIGHT - 500, DEVICE_HEIGHT - THRESHOLD],
      [0, 30, 60]
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

  
  const animateHeightWidth = useAnimatedStyle(() => {
    const height = interpolate(
      translateY.value,
      [BASE_HEIGHT, DEVICE_HEIGHT - THRESHOLD],
      [50, 200],
      "clamp"
    );
  
    const width = interpolate(
      translateY.value,
      [BASE_HEIGHT, DEVICE_HEIGHT - THRESHOLD],
      [50, 200],
      "clamp"
    );
  
    const opacity = interpolate(
      translateY.value,
      [BASE_HEIGHT, DEVICE_HEIGHT * 0.3],
      [1, 0],
      "clamp"
    );
  
    const translateX = interpolate(
      translateY.value,
      [BASE_HEIGHT, DEVICE_HEIGHT],
      [0, (DEVICE_WIDTH - 200) / 2],
      "clamp"
    );
  
    // Maintain border radius during animation
    const borderRadius = interpolate(
      translateY.value,
      [BASE_HEIGHT, DEVICE_HEIGHT - THRESHOLD],
      [10, 20],
      "clamp"
    );
  
    const marginTop = interpolate(
      translateY.value,
      [BASE_HEIGHT, DEVICE_HEIGHT - THRESHOLD],
      [6, 20],
      "clamp"
    );

    const marginLeft = interpolate(
      translateY.value,
      [BASE_HEIGHT, DEVICE_HEIGHT - THRESHOLD],
      [10, 0],
      "clamp"
    );

    const marginBottom = interpolate(
      translateY.value,
      [BASE_HEIGHT, DEVICE_HEIGHT - THRESHOLD],
      [10, 0],
      "clamp"
    )
  
    return {
      height,
      width,
      marginTop,
      borderRadius,
      marginLeft,
      marginBottom,
      transform: [{ translateX }],
    };
  });

  const animatedImageMarginLeft = useAnimatedStyle(() => {
    const marginLeft = interpolate(
      translateY.value,
      [0, DEVICE_HEIGHT - 90],
      [DEVICE_WIDTH / 2 - 100, 10],
      "clamp"
    );
  
    return {
      marginLeft,
    };
  });
  

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.container, boxAnimatedStyles,]}>
        <Animated.View style={[styles.music, boxAnimatedStyles]}>

          {showGradient && (
            <LinearGradient
              colors={imageColors ? [imageColors.background, imageColors.primary, imageColors.secondary] : color.background}
              style={{ ...StyleSheet.absoluteFillObject }}
            />
          )}
          <Animated.View>
            {/* <Text style={{ color: 'white' }} >MusicTrack</Text> */}
            <Animated.View style={[styles.bottomSheetIndicator, animateIndicator]} />
            {/* <Animated.View style={animateHeightWidth}>
              <AnimatedImage cachePolicy="memory" style={[styles.imageStyle, animatedImageStyle]}
              source={{ uri: "https://picsum.photos/seed/picsum/200/300" }} />
            </Animated.View> */}
            <Animated.View style={[{marginLeft: animatedImageMarginLeft.marginLeft},styles.imageStyle,animateHeightWidth]}>
            <MusicImage cachePolicy="memory" style={{ flex: 1, width: null, height: null }}
              source={{ uri: "https://picsum.photos/seed/picsum/200/300" }} />
          </Animated.View>
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
    borderRadius: 10,
    bottom: BOTTOM_BAR_HEIGHT + 2,
    left: 1,
    overflow: "hidden",
    position: "absolute",
    right: 1,
    zIndex: 1

  },
  imageStyle: {
    // flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    overflow: 'hidden',
    // alignItems: 'center',
    // alignSelf: 'center'
  },
  music: {
    backgroundColor: color.spotifyGreen,
  }
})
