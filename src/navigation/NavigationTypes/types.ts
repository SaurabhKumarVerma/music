import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { ESCREEN } from "../../types/screen"

export type BottomTabParamList = {
  [ESCREEN.BOTTOM_MAIN]: undefined
  [ESCREEN.BOTTOM_SEARCH]: undefined
  [ESCREEN.BOTTOM_SETTING]: undefined
  [ESCREEN.HOME_SCREEN]: undefined
  [ESCREEN.SEARCH_SCREEN]: undefined
  [ESCREEN.SETTING_SCREEN]: undefined
}

export type PlaceHomeTabProps = BottomTabScreenProps<BottomTabParamList, ESCREEN.BOTTOM_MAIN>

export type PlaceSearchTabProps = BottomTabScreenProps<BottomTabParamList, ESCREEN.BOTTOM_SEARCH>

export type PlaceSettingTabProps = BottomTabScreenProps<BottomTabParamList, ESCREEN.BOTTOM_SETTING>
