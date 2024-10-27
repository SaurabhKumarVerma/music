/* eslint-disable react-native/no-inline-styles */
import { FlatList, StyleSheet, View } from "react-native"
import { MusicText } from "@music/base/MusicText/MusicText"
import Card from "@music/base/Card/TopPicksCard"
import topPicksData from "@music/service/topPickdummydata"
import { ITrack } from "@music/models/toptrack.interface"
// import topPicksData from "../../service/api/topPicksData.ts"
const TopPick = () => {
  const renderItem = (item: ITrack) => {
    return (
      <View style={{ marginRight: 20 }}>
        <Card track={item} />
      </View>
    )
  }

  return (
    <View style={{ paddingTop: 20 }}>
      <FlatList
        horizontal
        contentContainerStyle={{  marginTop: 20, }}
        showsHorizontalScrollIndicator={false}
        data={topPicksData[0]?.items as any}
        renderItem={({ item }) => renderItem(item)}
      />
    </View>
  )
}

export default TopPick

const styles = StyleSheet.create({
  moreTextStyle: {
    marginTop: 4,
  },
})
