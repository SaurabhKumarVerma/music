import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  NativeUIEvent,
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
import { DEVICE_WIDTH } from "@music/constant/constant"
import { artistData } from "@music/store/slice/artistSlice"
import { MusicText } from "@music/base/MusicText/MusicText"
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons"
import { color } from "@music/theme/color"
import Animated, { FadeInLeft, useAnimatedStyle, useSharedValue } from "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const Artist = () => {
  const route = useRoute()
  const dispatched = useAppDispatch()
  const translateY = useSharedValue(0)
  const ref = useRef<ScrollView>(null)
  const inset = useSafeAreaInsets()
  const navigation = useNavigation()
  const { artist, isArtistError, isArtistLoading } = useAppSelector((state) => state.artist)
  useEffect(() => {
    dispatched(artistData((route.params as { artistId: string }).artistId))
  }, [])

  if (isArtistLoading && artist !== undefined) {
    return (
      <View style={{}}>
        <Loading isVisible={isArtistLoading} />
      </View>
    )
  }

  const header = () => {
    return (
      <MusicImage
        source={{ uri: artist[0]?.data?.images[1]?.url }}
        style={styles.authorImageStyle}
        contentFit="cover"
      />
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

  

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    console.log(event.nativeEvent.contentOffset.y)
  }

  // const animatedStyles =
  
  return (
    <Animated.ScrollView
      stickyHeaderHiddenOnScroll
      showsVerticalScrollIndicator={false}
      onScrollBeginDrag={onScroll}
    >
      <View>
        <Animated.View>{header()}</Animated.View>

        {artist[0]?.data?.images[1]?.url ? (
          <Animated.View
            entering={FadeInLeft.delay(2000)}
            style={{ position: "absolute", bottom: 0 }}
          >
            <MusicText
              numberOfLines={3}
              text={artist[0]?.data?.name}
              style={[styles.textStyle, { flexShrink: 1, justifyContent: "flex-start" }]}
              preset="heading"
            />
          </Animated.View>
        ) : null}

        <Pressable
          onPress={navigateBack}
          style={[styles.onBackNavigationContainer, { top: inset.top + 5 }]}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>
      </View>

      <View style={{ marginTop: 12 }}>
        <View style={styles.followerContainer}>
          <View style={styles.followingContainer}>
            <SimpleLineIcons name="user-following" size={20} color={color.white} />
          </View>

          <MusicText
            text={` ${artist[0]?.data?.followers?.total}`}
            style={[styles.textStyle, {}]}
            preset="semiBold"
            size="xs"
          />
        </View>
        <View style={styles.popularityContainer}>
          <View style={styles.popularityContainer}>
            <AntDesign name="linechart" size={20} color={color.white} />
          </View>

          <MusicText
            text={` ${artist[0]?.data?.popularity}`}
            style={[styles.textStyle, {}]}
            preset="semiBold"
            size="xs"
          />
        </View>
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
  )
}

export default Artist

const styles = StyleSheet.create({
  authorImageStyle: {
    aspectRatio: 1,
    width: DEVICE_WIDTH,
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
