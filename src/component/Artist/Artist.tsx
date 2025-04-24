/* eslint-disable react-hooks/rules-of-hooks */
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native"
import { useEffect, useRef } from "react"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useAppDispatch, useAppSelector } from "@music/hook/hook"
import MusicImage from "@music/base/MusicImage/MusicImage"
import Loading from "@music/base/Loading/Loading"
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "@music/constant/constant"
import { artistData } from "@music/store/slice/artistSlice"
import { MusicText } from "@music/base/MusicText/MusicText"
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons"
import { color } from "@music/theme/color"
import Animated, {
  FadeInLeft,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { LinearGradient } from "expo-linear-gradient"
import { images } from "assets"
import { usePlayerBackground } from "@music/hook/usePlayerBackground"
import LottieView from "lottie-react-native"
import { Gesture, GestureDetector } from "react-native-gesture-handler"

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient)
const AnimatedImage = Animated.createAnimatedComponent(MusicImage)
const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const Artist = () => {
  const route = useRoute()
  const dispatched = useAppDispatch()
  const translateY = useSharedValue(4)
  const height = useSharedValue(0)

  const ref = useRef<ScrollView>(null)
  const inset = useSafeAreaInsets()
  const navigation = useNavigation()
  const { artist, isArtistError, isArtistLoading } = useAppSelector((state) => state.artist)

  const { imageColors } = usePlayerBackground(
    artist[0]?.data?.images[1]?.url || images.variousArtisit1,
  )

  useEffect(() => {
    dispatched(artistData((route.params as { artistId: string }).artistId))
  }, [])

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      translateY.value = event.contentOffset.y
    },
  })

  const opacityStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [80, 90, 100, 120, 140, 160, 200, 220, 240],
      [1, 0.5, 0.5, 0.4, 0.2, 0.1, 0.1, 0, 0],
      "clamp",
    )

    return {
      opacity,
      // width,
      // height,
      // aspectRatio,
    }
  })

  const animatedImageHeight = useAnimatedStyle(() => {
    const height = interpolate(translateY.value, [0, 100, 200], [200, 100, 0], "clamp")
    const width = interpolate(translateY.value, [0, 100, 200], [200, 100, 0], "clamp")

    return {
      height,
      width,
    }
  })

  const animatedTextContainer = useAnimatedStyle(() => {
    const opacity = interpolate(translateY.value, [0, 100, 150, 200], [1, 0.4, 0.3, 0], "clamp")

    return {
      opacity,
    }
  })

  const animatedPressableContainer = useAnimatedStyle(() => {
    const opacity = interpolate(translateY.value, [0, 10, 12, 20], [1, 0.2, 0.1, 0], "clamp")

    return {
      opacity,
    }
  })

  if (isArtistLoading && artist !== undefined) {
    return (
      <View style={{}}>
        <Loading isVisible={isArtistLoading} />
      </View>
    )
  }

  const header = () => {
    return (
      <Animated.View>
        <AnimatedImage
          source={{ uri: artist[0]?.data?.images[1]?.url }}
          style={[styles.authorImageStyle, animatedImageHeight]}
          contentFit="cover"
        />
        <Animated.View>
          {artist[0]?.data?.images[1]?.url ? (
            <Animated.View entering={FadeInLeft.delay(2000)} style={{ marginTop: 20 }}>
              <MusicText
                numberOfLines={3}
                text={artist[0]?.data?.name}
                style={[styles.textStyle, { flexShrink: 1, justifyContent: "flex-start" }]}
                preset="semiBold"
                size="lg"
              />
            </Animated.View>
          ) : null}

          <Animated.View style={[styles.popularityContainer, animatedTextContainer]}>
            <View style={styles.popularityContainer}>
              <LottieView
                source={require("../../../assets/lottie/active.json")}
                style={{ height: 50, width: 50 }}
                autoPlay={true}
                loop
              />
            </View>

            <MusicText
              text={` 987438274320840932`}
              style={[styles.textStyle, {}]}
              preset="semiBold"
              size="xs"
            />
          </Animated.View>
        </Animated.View>
      </Animated.View>
    )
  }

  const navigateBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack()
    }
  }

  const measure = (data) => {
    console.log("measure ===>", data)
  }

  const androidGradientColor = [
    // imageColors?.average,
    imageColors?.darkMuted,
    imageColors?.darkVibrant,
    // imageColors?.dominant,
    imageColors?.lightVibrant,
  ]

  return (
    <>
      <Animated.ScrollView
        stickyHeaderHiddenOnScroll
        showsVerticalScrollIndicator={false}
        onScrollBeginDrag={onScroll}
        scrollEventThrottle={16}
      >
        <Animated.View>
          <AnimatedLinearGradient
            colors={
              Platform.OS === "android" ? androidGradientColor : ["#2A7B9B", "#57C785", "#EDDD53"]
            }
            style={[
              styles.authorImageContainer,
              {
                width: DEVICE_WIDTH,
              },
              opacityStyle,
            ]}
          >
            {header()}
          </AnimatedLinearGradient>

          <AnimatedPressable
            onPress={navigateBack}
            style={[
              styles.onBackNavigationContainer,
              { top: inset.top + 5 },
              animatedPressableContainer,
            ]}
          >
            <AntDesign name="arrowleft" size={24} color="black" />
          </AnimatedPressable>
        </Animated.View>

        <View style={{ height: 100 }}>
          <MusicText
            numberOfLines={3}
            text={artist[0]?.data?.name}
            style={[styles.textStyle, { flexShrink: 1, justifyContent: "flex-start" }]}
            preset="heading"
          />
        </View>

        <View style={{ height: 100 }}>
          <MusicText
            numberOfLines={3}
            text={artist[0]?.data?.name}
            style={[styles.textStyle, { flexShrink: 1, justifyContent: "flex-start" }]}
            preset="heading"
          />
        </View>

        <View style={{ height: 100 }}>
          <MusicText
            numberOfLines={3}
            text={artist[0]?.data?.name}
            style={[styles.textStyle, { flexShrink: 1, justifyContent: "flex-start" }]}
            preset="heading"
          />
        </View>

        <View style={{ height: 100 }}>
          <MusicText
            numberOfLines={3}
            text={artist[0]?.data?.name}
            style={[styles.textStyle, { flexShrink: 1, justifyContent: "flex-start" }]}
            preset="heading"
          />
        </View>

        <View style={{ height: 100 }}>
          <MusicText
            numberOfLines={3}
            text={artist[0]?.data?.name}
            style={[styles.textStyle, { flexShrink: 1, justifyContent: "flex-start" }]}
            preset="heading"
          />
        </View>

        <View style={{ height: 100 }}>
          <MusicText
            numberOfLines={3}
            text={artist[0]?.data?.name}
            style={[styles.textStyle, { flexShrink: 1, justifyContent: "flex-start" }]}
            preset="heading"
          />
        </View>

        <View style={{ height: 100 }}>
          <MusicText
            numberOfLines={3}
            text={artist[0]?.data?.name}
            style={[styles.textStyle, { flexShrink: 1, justifyContent: "flex-start" }]}
            preset="heading"
          />
        </View>

        <View style={{ height: 100 }}>
          <MusicText
            numberOfLines={3}
            text={artist[0]?.data?.name}
            style={[styles.textStyle, { flexShrink: 1, justifyContent: "flex-start" }]}
            preset="heading"
          />
        </View>

        <View style={{ height: 100 }}>
          <MusicText
            numberOfLines={3}
            text={artist[0]?.data?.name}
            style={[styles.textStyle, { flexShrink: 1, justifyContent: "flex-start" }]}
            preset="heading"
          />
        </View>

        <View style={{ height: 100 }}>
          <MusicText
            numberOfLines={3}
            text={artist[0]?.data?.name}
            style={[styles.textStyle, { flexShrink: 1, justifyContent: "flex-start" }]}
            preset="heading"
          />
        </View>

        <View style={{ height: 100 }}>
          <MusicText
            numberOfLines={3}
            text={artist[0]?.data?.name}
            style={[styles.textStyle, { flexShrink: 1, justifyContent: "flex-start" }]}
            preset="heading"
          />
        </View>

        <View style={{ height: 100 }}>
          <MusicText
            numberOfLines={3}
            text={artist[0]?.data?.name}
            style={[styles.textStyle, { flexShrink: 1, justifyContent: "flex-start" }]}
            preset="heading"
          />
        </View>

        <View style={{ height: 100 }}>
          <MusicText
            numberOfLines={3}
            text={artist[0]?.data?.name}
            style={[styles.textStyle, { flexShrink: 1, justifyContent: "flex-start" }]}
            preset="heading"
          />
        </View>

        <View style={{ height: 100 }}>
          <MusicText
            numberOfLines={3}
            text={artist[0]?.data?.name}
            style={[styles.textStyle, { flexShrink: 1, justifyContent: "flex-start" }]}
            preset="heading"
          />
        </View>

        <View style={{ height: 100 }}>
          <MusicText
            numberOfLines={3}
            text={artist[0]?.data?.name}
            style={[styles.textStyle, { flexShrink: 1, justifyContent: "flex-start" }]}
            preset="heading"
          />
        </View>

        <View style={{ height: 100 }}>
          <MusicText
            numberOfLines={3}
            text={artist[0]?.data?.name}
            style={[styles.textStyle, { flexShrink: 1, justifyContent: "flex-start" }]}
            preset="heading"
          />
        </View>

        <View style={{ height: 100 }}>
          <MusicText
            numberOfLines={3}
            text={artist[0]?.data?.name}
            style={[styles.textStyle, { flexShrink: 1, justifyContent: "flex-start" }]}
            preset="heading"
          />
        </View>

        <View style={{ height: 100 }}>
          <MusicText
            numberOfLines={3}
            text={artist[0]?.data?.name}
            style={[styles.textStyle, { flexShrink: 1, justifyContent: "flex-start" }]}
            preset="heading"
          />
        </View>
      </Animated.ScrollView>
    </>
  )
}

export default Artist

const styles = StyleSheet.create({
  authorImageStyle: {
    alignSelf: "center",
    borderRadius: 120,
    height: 200,
    width: 200,
  },
  authorImageContainer: {
    alignItems: "center",
    aspectRatio: 1,
    justifyContent: "center",
  },
  followerContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  followingContainer: {
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  onBackNavigationContainer: {
    alignContent: "center",
    alignItems: "center",
    backgroundColor: color.white,
    borderRadius: 15,
    height: 30,
    justifyContent: "center",
    left: 10,
    position: "absolute",
    width: 30,
    zIndex: 10,
  },
  popularityContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  // sectionHeader: {
  //   backgroundColor: color.grey1,
  //   padding: 10,
  // },
  // sectionTitle: {
  //   color: "#fff",
  //   fontWeight: "bold",
  // },

  textStyle: {
    textAlign: "center",
  },
})
