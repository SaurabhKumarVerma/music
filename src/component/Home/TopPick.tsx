import { FlatList, Pressable, StyleSheet, View } from "react-native"
import Card from "@music/base/Card/TopPicksCard"
import { ITrack } from "@music/models/toptrack.interface"
import { useAppSelector } from "@music/hook/hook"
import { MusicText } from "@music/base/MusicText/MusicText"
import { color } from "@music/theme/color"
import { useNavigation } from "@react-navigation/native"
import { PlaceSongListProps } from "@music/navigation/NavigationTypes/types"
import { ESCREEN } from "@music/types/screen"

const TopPick = () => {
  const topTrackItems = useAppSelector((state) => state.topPicks.topTracks)
  const { navigate } = useNavigation<PlaceSongListProps>()

  const renderItem = (item: ITrack) => {
    console.log(" this is", item.artists[0].id)

    return (
      <Pressable
        onPress={() => navigate(ESCREEN.SONG_LIST_DETAIL, { artistId: item.artists[0].id })}
        style={styles.cardContainer}
      >
        <MusicText
          text={`More from ${item.album.artists[0].name}`}
          preset="light"
          size="sm"
          style={styles.textStyles}
        />
        <Card track={item} />
      </Pressable>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={topTrackItems}
        renderItem={({ item }) => renderItem(item)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    marginRight: 20,
  },
  container: {
    paddingTop: 20,
  },
  textStyles: {
    color: color.grey4,
    marginBottom: 10,
    marginLeft: 8,
  },
})
export default TopPick
