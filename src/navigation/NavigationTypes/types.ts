import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { ESCREEN } from "../../types/screen";

export type BottomTabParamList = {
    [ESCREEN.HOME_SCREEN]: undefined;
    [ESCREEN.SEARCH_SCREEN]: undefined;
    [ESCREEN.SETTING_SCREEN]: undefined;
};

export type PlaceHomeTabProps = BottomTabScreenProps<
    BottomTabParamList,
    ESCREEN.HOME_SCREEN
>;

export type PlaceSearchTabProps = BottomTabScreenProps<
    BottomTabParamList,
    ESCREEN.SEARCH_SCREEN
>;

export type PlaceSettingTabProps = BottomTabScreenProps<
    BottomTabParamList,
    ESCREEN.SETTING_SCREEN
>;
