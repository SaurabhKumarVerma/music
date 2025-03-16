import { SectionList, StyleSheet, Text, View } from "react-native"
import { useEffect } from "react"
import { useRoute } from "@react-navigation/native"
import { useAppDispatch, useAppSelector } from "@music/hook/hook"
import MusicImage from "@music/base/MusicImage/MusicImage"
import Loading from "@music/base/Loading/Loading"
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "@music/constant/constant"
import { artistData } from "@music/store/slice/artistSlice"
import { ETITLE_NAME } from "@music/types/type"

const Artist = () => {
  const route = useRoute()
  const dispatched = useAppDispatch()
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

  console.log("this is artist", artist[0]?.data?.images[1]?.url)

  const header = () => {
    return (
      <MusicImage
        source={artist !== undefined ? artist[0]?.data?.images[1]?.url : ""}
        style={{
          width: DEVICE_WIDTH,
          height: DEVICE_HEIGHT * 0.4,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
        contentFit="fill"
      />
    )
  }

  return (
    <View>
      {/* <MusicImage
        source={artistData?.images !== undefined ? (artistData?.images[1]?.url as string) : ""}
        style={{
          width: DEVICE_WIDTH,
          height: DEVICE_HEIGHT * 0.4,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
        contentFit="fill"
      /> */}

      {/* <View style={{ marginTop: 12 }}>
        <MusicText text={artistData?.name} style={styles.textStyle} preset="bold" size="rg" />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <SimpleLineIcons name="user-following" size={16} color={color.white} />
            <MusicText text="Followers" size="xs" preset="light" style={{ marginLeft: 10 }} />
          </View>

          <MusicText
            text={` ${artistData?.followers?.total}`}
            style={[styles.textStyle, {}]}
            preset="semiBold"
            size="xs"
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <AntDesign name="linechart" size={16} color={color.white} />
            <MusicText text="Popularity" size="xs" preset="light" style={{ marginLeft: 10 }} />
          </View>

          <MusicText
            text={` ${artistData?.popularity}`}
            style={[styles.textStyle, {}]}
            preset="semiBold"
            size="xs"
          />
        </View>
      </View> */}
    </View>
  )
}

export default Artist

const styles = StyleSheet.create({
  textStyle: {
    textAlign: "center",
  },
  sectionHeader: {
    padding: 10,
    backgroundColor: '#333',
  },
  sectionTitle: {
    color: '#fff',
    fontWeight: 'bold',
  }
})
