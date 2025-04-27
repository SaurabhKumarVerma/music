import MusicImage from "@music/base/MusicImage/MusicImage"
import { MusicText } from "@music/base/MusicText/MusicText"
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "@music/constant/constant"
import { RecentlyPlayedItem } from "@music/models/recentlyPlayed.interface"
import { BLUR_HASH } from "@music/types/type"
import { FlatList, StyleSheet, View } from "react-native"

interface IRecentlyPlayed {
  data: RecentlyPlayedItem[]
}

const RecentlyPlayed = (props: IRecentlyPlayed) => {
  const renderItem = ({ item }: { item: RecentlyPlayedItem }) => {
    return (
      <View style={styles.container}>
        <MusicImage
          cachePolicy="memory"
          contentFit="fill"
          placeholder={BLUR_HASH}
          source={item.track.album.images[1].url}
          style={[styles.imageStyle, { width: DEVICE_WIDTH * 0.5, height: DEVICE_HEIGHT * 0.2 }]}
        />
        <MusicText preset="semiBold" size="rg" text={item.track.name} style={styles.textStyle} numberOfLines={1} />
      </View>
    )
  }

  return (
    <View>
      <FlatList
        pagingEnabled
        keyExtractor={(item) => item.played_at}
        data={props?.data}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.listStyle}
      />
    </View>
  )
}

export default RecentlyPlayed

const styles = StyleSheet.create({
  container: {
    paddingRight: 20,
  },
  imageStyle: {
    borderRadius: 20,
  },
  listStyle: {
    marginTop: 20,
  },
  textStyle: {
    marginLeft: 10,
    marginTop: 10,
    width: 80,
  },
})
