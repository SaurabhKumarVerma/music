import { FlatList, Pressable, StyleSheet, View } from "react-native"
import Card from "@music/base/Card/TopPicksCard"
import { ITrack } from "@music/models/toptrack.interface"
import { MusicText } from "@music/base/MusicText/MusicText"
import { color } from "@music/theme/color"
import { useNavigation } from "@react-navigation/native"
import { PlaceSongListProps } from "@music/navigation/NavigationTypes/types"
import { ESCREEN } from "@music/types/screen"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

interface ITopPick {
  data: any
}

const TopPick = (props: ITopPick) => {
  const { navigate } = useNavigation<NativeStackNavigationProp<PlaceSongListProps>>()

  const renderItem = (item: ITrack) => {
    return (
      <Pressable
        onPress={() =>
          navigate(ESCREEN.SONG_LIST_DETAIL, {
            artist: item.artists[0],
            artistName: item?.album?.artists[0].name,
          })
        }
        style={styles.cardContainer}
      >
        <MusicText
          text={`${item?.album?.artists[0]?.name}` || ""}
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
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        disableIntervalMomentum={true}
        data={props.data ?? []}
        renderItem={({ item }) => renderItem(item)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    marginRight: 20,
    zIndex: -10,
  },
  container: {
    marginLeft: 16,
    paddingTop: 20,
  },
  textStyles: {
    color: color.gainsboro,
    marginBottom: 10,
    marginLeft: 8,
  },
})
export default TopPick
