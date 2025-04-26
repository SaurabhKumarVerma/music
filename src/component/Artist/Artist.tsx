/* eslint-disable react-hooks/rules-of-hooks */
import { Platform, Pressable, ScrollView, StyleSheet, View } from "react-native"
import { useEffect, useRef } from "react"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useAppDispatch, useAppSelector } from "@music/hook/hook"
import MusicImage from "@music/base/MusicImage/MusicImage"
import Loading from "@music/base/Loading/Loading"
import { DEVICE_WIDTH } from "@music/constant/constant"
import { artistData } from "@music/store/slice/artistSlice"
import { MusicText } from "@music/base/MusicText/MusicText"
import { AntDesign } from "@expo/vector-icons"
import { color } from "@music/theme/color"
import Animated, {
  FadeInLeft,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { LinearGradient } from "expo-linear-gradient"
import { images } from "assets"
import { usePlayerBackground } from "@music/hook/usePlayerBackground"
import LottieView from "lottie-react-native"

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient)
const AnimatedImage = Animated.createAnimatedComponent(MusicImage)
const AnimatedPressable = Animated.createAnimatedComponent(Pressable)
const AnimatedText = Animated.createAnimatedComponent(MusicText)

const Artist = () => {
  const route = useRoute()
  const dispatched = useAppDispatch()
  const translateY = useSharedValue(4)
  const inset = useSafeAreaInsets()
  const navigation = useNavigation()
  const { artist, isArtistLoading } = useAppSelector((state) => state.artist)

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

  const animatedArtistName = useAnimatedStyle(() => {
    const opacity = interpolate(translateY.value, [0, 100, 150, 200], [1, 0.1, 0.1, 0], "clamp")

    return {
      opacity,
    }
  })

  const animatedPressableContainer = useAnimatedStyle(() => {
    const opacity = interpolate(translateY.value, [60, 100, 200], [0, 0.7, 1], "clamp")

    return {
      opacity,
    }
  })

  const animatedHeader = useAnimatedStyle(() => {
    const translY = interpolate(translateY.value, [60, 200], [0, 1], "clamp")

    const opacity = interpolate(translateY.value, [60, 200], [0, 1], "clamp")

    return {
      transform: [{ translateX: translY }],
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
        <LinearGradient
          colors={["rgba(255,255,255, 0.1)", "rgba(191,191,191, 0.6)"]}
          style={styles.artistImageContainer}
        >
          <AnimatedImage
            source={{ uri: artist[0]?.data?.images[1]?.url }}
            style={[styles.authorImageStyle, animatedImageHeight]}
            contentFit="cover"
          />
        </LinearGradient>
        <Animated.View>
          {artist[0]?.data?.images[1]?.url ? (
            <Animated.View style={{ marginTop: 20 }}>
              <AnimatedText
                numberOfLines={3}
                text={artist[0]?.data?.name}
                style={[styles.textStyle, animatedArtistName]}
                preset="semiBold"
                size="lg"
              />
            </Animated.View>
          ) : null}

          <Animated.View style={[styles.popularityContainer, animatedTextContainer]}>
            <View style={styles.popularityContainer}>
              <LottieView
                source={require("../../../assets/lottie/active.json")}
                style={styles.activeIndicator}
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

  return (
    <>
      <Animated.View
        style={[
          styles.onBackNavigationContainer,
          { top: inset.top + 5, width: DEVICE_WIDTH },
          animatedHeader,
        ]}
      >
        <LinearGradient
          colors={["#FF375F", "rgba(0, 0, 0, 0.9)"]}
          style={
            (StyleSheet.absoluteFill,
            { position: "absolute", width: DEVICE_WIDTH, paddingVertical: 34 })
          }
        >
          <View style={styles.headerContainer}>
            <AnimatedPressable onPress={navigateBack}>
              <AntDesign
                name="arrowleft"
                size={24}
                color={color.white}
                style={styles.leftArrowStyle}
              />
            </AnimatedPressable>

            <View>
              <AnimatedText
                numberOfLines={3}
                text={artist[0]?.data?.name}
                style={[styles.textStyle, animatedPressableContainer]}
                preset="semiBold"
                size="lg"
              />
            </View>

            <AnimatedImage
              source={{ uri: artist[0]?.data?.images[1]?.url }}
              style={[styles.sideArtistStyle, animatedPressableContainer]}
              contentFit="cover"
            />
          </View>
        </LinearGradient>
      </Animated.View>

      <Animated.ScrollView
        stickyHeaderHiddenOnScroll
        showsVerticalScrollIndicator={false}
        onScrollBeginDrag={onScroll}
        scrollEventThrottle={16}
      >
        <Animated.View>
          <AnimatedLinearGradient
            colors={["#FF375F", "rgba(0, 0, 0, 0.9)"]}
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
        </Animated.View>
      </Animated.ScrollView>
    </>
  )
}

export default Artist

const styles = StyleSheet.create({
  activeIndicator: {
    height: 50,
    width: 50,
  },
  artistImageContainer: {
    borderRadius: 102,
    height: 204,
    justifyContent: "center",
    width: 204,
  },
  authorImageContainer: {
    alignItems: "center",
    aspectRatio: 1,
    justifyContent: "center",
  },
  authorImageStyle: {
    alignSelf: "center",
    borderRadius: 120,
    height: 200,
    width: 200,
  },
  headerContainer: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  leftArrowStyle: {
    alignContent: "center",
    alignItems: "center",
  },
  onBackNavigationContainer: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    position: "absolute",
    width: DEVICE_WIDTH,
    zIndex: 10,
  },
  popularityContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  sideArtistStyle: { borderRadius: 15, height: 30, width: 30 },
  textStyle: {
    textAlign: "center",
  },
})
