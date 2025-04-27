/* eslint-disable react-hooks/rules-of-hooks */
import { FlatList, Platform, Pressable, StyleSheet, View } from "react-native"
import { useEffect } from "react"
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
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { LinearGradient } from "expo-linear-gradient"
import { artistProfileData } from "@music/store/slice/artistDetailsSlice"
import Entypo from "@expo/vector-icons/Entypo"
import { images } from "assets"
import { usePlayerBackground } from "@music/hook/usePlayerBackground"
import ArtistPopular from "./ArtistPopular"
import MusicCard from "@music/base/MusicCard/MusicCard"
import ArtistDetail from "./ArtistDetail"
import AboutArtist from "./AboutArtist"
import MusicFloatingAction from "@music/base/FloatingAction/MusicFloatingAction"

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
  const { imageColors } = usePlayerBackground(artist[0]?.data?.images[1]?.url || "")

  useEffect(() => {
    dispatched(artistData((route.params as { artistId: string }).artistId))
    dispatched(artistProfileData((route.params as { artistId: string }).artistId))
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

  const opacityStyleArrow = useAnimatedStyle(() => {
    const opacity = interpolate(translateY.value, [0, 20], [1, 0], "clamp")

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
    const opacity = interpolate(translateY.value, [0, 100, 150, 200], [1, 0.2, 0.1, 0], "clamp")

    return {
      opacity,
    }
  })

  const animatedArtistName = useAnimatedStyle(() => {
    const opacity = interpolate(translateY.value, [0, 100, 150, 200], [1, 0, 0, 0], "clamp")

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

  const genres = ({ item }) => {
    return (
      <Animated.View>
        <AnimatedText style={[{ paddingHorizontal: 6 }, animatedTextContainer]}>
          {item}
        </AnimatedText>
      </Animated.View>
    )
  }

  const header = () => {
    return (
      <Animated.View style={{ flex: 1, paddingTop: inset.top }}>
        <AnimatedLinearGradient
          colors={["rgba(255,255,255, 0.1)", "rgba(191,191,191, 0.6)"]}
          style={[styles.artistImageContainer, animatedImageHeight]}
        >
          <AnimatedImage
            source={{ uri: artist[0]?.data?.images[1]?.url }}
            style={[styles.authorImageStyle, animatedImageHeight]}
            contentFit="cover"
          />
        </AnimatedLinearGradient>
        <Animated.View>
          {artist[0]?.data?.images[1]?.url ? (
            <Animated.View style={{ marginTop: 20 }}>
              <AnimatedText
                numberOfLines={1}
                text={artist[0]?.data?.name}
                style={[styles.textStyle, animatedArtistName]}
                preset="heading"
                size={"xxl"}
                // size="lg"
              />
            </Animated.View>
          ) : null}

          <Animated.View style={[styles.popularityContainer, animatedTextContainer]}>
            <View style={styles.popularityContainer}>
              <Entypo name="users" size={10} color={color.white} />
            </View>
            {artist[0]?.data?.followers?.total ? (
              <AnimatedText
                text={artist[0]?.data?.followers?.total}
                style={[styles.textStyle, { color: color.gainsboro }, animatedTextContainer]}
                preset="semiBold"
                size="rg"
              />
            ) : null}
          </Animated.View>
        </Animated.View>
        {artist[0]?.data?.genres?.length >= 1 ? (
          <>
            <FlatList
              scrollEnabled={false}
              data={artist[0]?.data?.genres}
              renderItem={genres}
              contentContainerStyle={{ flexDirection: "row", alignSelf: "center" }}
            />
          </>
        ) : null}
      </Animated.View>
    )
  }

  const navigateBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack()
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        style={[styles.onBackNavigationContainer, { width: DEVICE_WIDTH }, animatedHeader]}
      >
        <LinearGradient
          colors={[
            Platform.OS === "android"
              ? (imageColors?.average as string)
              : (imageColors?.background as string),
            "rgba(0, 0, 0, 0.9)",
          ]}
          style={
            (StyleSheet.absoluteFill,
            { position: "absolute", width: DEVICE_WIDTH, paddingTop: inset.top })
          }
        >
          <View style={[styles.headerContainer, { paddingTop: inset.top + 30, paddingBottom: 20 }]}>
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
        showsVerticalScrollIndicator={false}
        onScrollBeginDrag={onScroll}
        scrollEventThrottle={16}
        style={{ flex: 1 }}
      >
        <Animated.View>
          <AnimatedLinearGradient
            colors={[
              Platform.OS === "android"
                ? (imageColors?.average as string)
                : (imageColors?.background as string),
              "rgba(0, 0, 0, 0.9)",
            ]}
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
            style={[styles.onBackArrow, { marginTop: inset.top }, opacityStyleArrow]}
          >
            <AntDesign
              name="arrowleft"
              size={24}
              color={color.white}
              style={styles.leftArrowStyle}
            />
          </AnimatedPressable>
        </Animated.View>

        <ArtistPopular
          share={artist[0]?.data?.external_urls?.spotify}
          artistImage={artist[0]?.data?.images[1]?.url}
          artistName={artist[0]?.data?.name}
          id={route.params?.artistId}
        />
        <MusicText
          text="Albums"
          size="bold"
          preset="subHeading"
          style={{ marginVertical: 12, marginLeft: 16, marginBottom: 20 }}
        />
        {route.params?.artistId && (
          <View style={{ marginLeft: 16 }}>
            <ArtistDetail id={route.params?.artistId} />
          </View>
        )}

        {/* <MusicText
          text="About"
          size="bold"
          preset="subHeading"
          style={{ marginTop: 18, marginLeft: 16, marginBottom: 20 }}
        /> */}

        {/* {route.params?.artistId && (
          <View style={{ marginLeft: 16 }}>
            <AboutArtist id={route.params?.artistId} />
          </View>
        )} */}
      </Animated.ScrollView>
      <View style={{ position: "absolute", bottom: 30, right: 50 }}>
        <MusicFloatingAction />
      </View>
    </View>
  )
}

export default Artist

const styles = StyleSheet.create({
  artistImageContainer: {
    alignSelf: "center",
    borderRadius: 102,
    height: 204,
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
    height: 180,
    width: 180,
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
  onBackArrow: {
    bottom: 0,
    marginLeft: 20,
    position: "absolute",
    top: 0,
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
    marginRight: 8,
    marginVertical: 4,
  },
  sideArtistStyle: { borderRadius: 15, height: 30, width: 30 },
  textStyle: {
    textAlign: "center",
  },
})
