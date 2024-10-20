/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-single-element-style-arrays */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import { Animated, PanResponder, Pressable, ScrollView, StyleSheet, View, ViewStyle } from "react-native"
import Floating from "@music/component/Floating/Floating"
import { BlurView } from "expo-blur"
import { useNavigation } from "@react-navigation/native"
import { ESCREEN } from "@music/types/screen"
import { BOTTOM_BAR_HEIGHT, DEVICE_HEIGHT, DEVICE_WIDTH } from "@music/constant/constant"
import { useEffect, useRef, useState } from "react"
import MusicImage from "@music/base/MusicImage/MusicImage"
import { MusicText } from "@music/base/MusicText/MusicText"
import { AntDesign } from "@expo/vector-icons"
import { color } from "@music/theme/color"
import { useSharedValue } from 'react-native-reanimated';
import { Slider } from 'react-native-awesome-slider';

interface IFloatingScreen {
  style: ViewStyle
}

const FloatingScreen = (props: IFloatingScreen) => {
  const pan = useRef(new Animated.ValueXY()).current
  const top = 30
  const animation = useRef(new Animated.ValueXY({ x: 0, y: DEVICE_HEIGHT - 90 })).current;
  const progress = useSharedValue(50);
  const min = useSharedValue(0);
  const max = useSharedValue(100);
  const [isScrollEnabled , setScrollEnabled] = useState<boolean>(false)
  const scrollOffset = useRef(0);


  const panResponder = useRef(PanResponder.create({

    onMoveShouldSetPanResponder: (event, gestureState) => {
      if((isScrollEnabled && scrollOffset.current <= 0 && gestureState.dy > 0) || !isScrollEnabled && gestureState.dy < 0  ){
        return true
      }else {
        return true
      }
    },
    onPanResponderGrant: (event, gestureState) => {
      animation.extractOffset()
    },
    onPanResponderMove: (event, gestureState) => {

      animation.setValue({ x: 0, y: gestureState.dy })

    },

    onPanResponderRelease: (event, gestureState) => {
      if(gestureState.moveY > DEVICE_HEIGHT - 90){
        console.log("cal -90");
        
        Animated.spring(animation.y ,{
          toValue: 0, 
          tension: 1,
          useNativeDriver: false
        }).start()
      } else if(gestureState.moveY < 90){
        console.log("cal < 90");
        Animated.spring(animation.y ,{
          toValue: 1, 
          tension: 0,
          useNativeDriver: false
        }).start()
      } else
      if (gestureState.dy < 0) {
        setScrollEnabled(true)
        Animated.spring(animation.y, {
          toValue: -DEVICE_HEIGHT + 90,
          tension: 0,
          useNativeDriver: false
        }).start()
      } else if (gestureState.dy > 0) {
        setScrollEnabled(false )
        Animated.spring(animation.y, {
          toValue: DEVICE_HEIGHT - 90,
          tension: 0,
          useNativeDriver: false
        }).start()
      }
    },
  })).current

  const animatedHeight = {
    transform: animation.getTranslateTransform()
  }

  const animatedImageHeight = animation.y.interpolate({
    inputRange: [0, DEVICE_HEIGHT - 90],
    outputRange: [200, 50],
    extrapolate: 'clamp',
  })

  const animatedSongTitle = animation.y.interpolate({
    inputRange: [0, DEVICE_HEIGHT - 500, DEVICE_HEIGHT - 90],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  })

  const animatedImageMarginLeft = animation.y.interpolate({
    inputRange: [0, DEVICE_HEIGHT - 90],
    outputRange: [DEVICE_WIDTH / 2 - 100, 10],
    extrapolate: 'clamp',
  })

  const animatedHeaderHeight = animation.y.interpolate({
    inputRange: [0, DEVICE_HEIGHT - 90],
    outputRange: [DEVICE_WIDTH / 2 + top, 90],
    extrapolate: 'clamp',
  })

  const animatedSongDetailOpacity = animation.y.interpolate({
    inputRange: [0, DEVICE_HEIGHT - 500, DEVICE_HEIGHT - 90],
    outputRange: [1, 0, 0],
    extrapolate: 'clamp',
  })

  const animatedBackgroundColor = animation.y.interpolate({
    inputRange: [0,  DEVICE_HEIGHT - 90],
    outputRange: ['rgba(0,0,0,0.5)', color.white],
    extrapolate: 'clamp',
  })
  return (
    <Animated.View style={{ flex: 1, backgroundColor: animatedBackgroundColor}}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[animatedHeight, { backgroundColor: color.spotifyGreen, position: 'absolute', left: 0, right: 0, height: DEVICE_HEIGHT, }]}>

        <ScrollView 
          scrollEnabled={!isScrollEnabled}
          scrollEventThrottle={16}
          onScroll={(event) => {
            scrollOffset.current = event.nativeEvent.contentOffset.y
          }}
        >
        <Animated.View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: animatedHeaderHeight, borderTopWidth: 1, borderTopColor: 'red' }}>
          <Animated.View style={{ height: animatedImageHeight, width: animatedImageHeight, marginLeft: animatedImageMarginLeft, alignContent: 'center' }}>
            <MusicImage cachePolicy="memory" style={{ flex: 1, width: null, height: null }}
              source={{ uri: "https://img.icons8.com/fluency/48/music-library.png" }} />
          </Animated.View>
          <Animated.View>
            <Animated.Text numberOfLines={1} style={{ marginLeft: 10, opacity: animatedSongTitle }}>Bayaan</Animated.Text>
            {/* <MusicText text="Bayaan" preset="semiBold" style={{ marginLeft: 10, opacity: animatedSongTitle }} numberOfLines={1} /> */}
          </Animated.View>
          <Animated.View style={{ flexDirection: "row", marginRight: 20, opacity: animatedSongTitle }}>
            <AntDesign name="caretright" size={28} color={color.white} />
            <AntDesign name="forward" size={28} color={color.white} style={{ marginLeft: 18 }} />
          </Animated.View>
        </Animated.View>

        <Animated.View style={{ height: animatedHeaderHeight, opacity: animatedSongDetailOpacity }}>
          <View style={{ alignItems: 'center', justifyContent: 'space-around', alignSelf: 'center' }}>
            <MusicText text="Hotel Californial" preset="semiBold" size="bold" style={{ color: color.black }} />
            <MusicText text="Hotel Californial" preset="semiBold" size="rg" style={{ color: color.deepRed, marginTop: 20 }} />
            {/* <Animated.Text>Hotel Californial</Animated.Text>
            <Animated.Text></Animated.Text> */}
          </View>

          <View style={{marginTop: 50, alignItems: 'center'}}>
            <Slider
              // style={styles.container}
              style={{width: DEVICE_WIDTH - 100}}
              progress={progress}
              minimumValue={min}
              maximumValue={max}

            />
          </View>
          <View style={{ flex: 2, alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row' }}>
            <AntDesign name="banckward" size={30} color={color.white} />
            <AntDesign name="play" size={30} color={color.white} />
            <AntDesign name="forward" size={30} color={color.white} />
          </View>
        </Animated.View>
        {/* <View style={{height: 8000, backgroundColor: 'red', flex: 1}}/> */}
        { console.log('Scroll Enable', isScrollEnabled) }
        </ScrollView>
      </Animated.View>

    </Animated.View>
  )
}

const style = StyleSheet.create({
  container: {
    backgroundColor: color.spotifyGreen,
    borderRadius: 8,
    bottom: BOTTOM_BAR_HEIGHT + 2,
    flex: 1,
    left: 6,
    overflow: "hidden",
    position: "absolute",
    right: 6,
  },
})
export default FloatingScreen
