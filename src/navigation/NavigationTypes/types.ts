import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { ESCREEN } from "../../types/screen"
import { NativeStackScreenProps } from "@react-navigation/native-stack"

export type BottomTabParamList = {
  [ESCREEN.BOTTOM_MAIN]: undefined
  [ESCREEN.BOTTOM_SEARCH]: undefined
  [ESCREEN.BOTTOM_SETTING]: undefined
  [ESCREEN.HOME_SCREEN]: undefined
  [ESCREEN.SEARCH_SCREEN]: undefined
  [ESCREEN.SETTING_SCREEN]: undefined
  [ESCREEN.AUDIO_BOOKS_SCREEN]: undefined
}

export type PlaceHomeTabProps = BottomTabScreenProps<BottomTabParamList, ESCREEN.BOTTOM_MAIN>

export type PlaceSearchTabProps = BottomTabScreenProps<BottomTabParamList, ESCREEN.BOTTOM_SEARCH>

export type PlaceSettingTabProps = BottomTabScreenProps<BottomTabParamList, ESCREEN.BOTTOM_SETTING>

export type RootStackParamList = {
  [ESCREEN.MAIN_SCREEN]: undefined
  [ESCREEN.SONG_LIST_DETAIL]: { artistId: string; artistName: string }
  [ESCREEN.PLAYTRACK_SCREEN]: { songId: string }
  [ESCREEN.PLAYING_TRACK]: undefined
  [ESCREEN.ARTIST_SCREEN]: undefined
}

export type SongParamList = {
  [ESCREEN.SONG_LIST_DETAIL]: { artistId: string; artistName: string }
}

export type PlaceSongListProps = NativeStackScreenProps<SongParamList, ESCREEN.SONG_LIST_DETAIL>

export type PlayTrack = NativeStackScreenProps<RootStackParamList, ESCREEN.PLAYTRACK_SCREEN>
