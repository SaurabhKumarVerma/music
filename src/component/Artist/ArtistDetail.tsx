import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native"
import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@music/hook/hook"
import { artistAlbum } from "@music/store/slice/artistAlbumSlice"
import MusicCard from "@music/base/MusicCard/MusicCard"
import { ISpotifyArtistAlbums } from "@music/models/artistAlbum.interface"

interface IArtistDetail {
  id: string
}

const ArtistDetail = (props: IArtistDetail) => {
  const dispatch = useAppDispatch()
  const { artistAlbumList, isLoading } = useAppSelector((state) => state.artistAlbumSlice)

  useEffect(() => {
    dispatch(artistAlbum(props.id))
  }, [])

  const renderItem = ({ item }: { item: ISpotifyArtistAlbums }) => {
    return (
      <View style={{ marginRight: 14 }}>
        <MusicCard
          imagePath={item?.images[0]?.url}
          titleText={item?.name}
          titleTextPreset="medium"
          subTitleText={item?.release_date}
          subTextStyle={{marginTop: 4}}
        />
      </View>
    )
  }

  if (isLoading) {
    return <ActivityIndicator />
  }

  return (
    <View style={{flex: 1}}>
      <FlatList
        horizontal
        data={artistAlbumList?.items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

export default React.memo(ArtistDetail)

const styles = StyleSheet.create({})
