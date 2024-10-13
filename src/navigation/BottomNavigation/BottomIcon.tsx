import { StyleSheet } from "react-native";
import React from "react";

import Animated from "react-native-reanimated";
import { color } from "@music/theme/color";
import { capitalizeFirstLetter } from "@music/utils/toCapital";
import { ESCREENICON } from "@music/types/type";
import { AntDesign } from "@expo/vector-icons";

interface IBottomIcon {
    isFocused: boolean;
    routeName: string;
    index: number;
}

type RouteNames = 'Home' | 'Setting' | 'Search';



const BottomIcon = (props: IBottomIcon) => {

    const routeMap: Record<RouteNames, ESCREENICON> = {
        Home: ESCREENICON.PLAY,
        Setting: 'setting',
        Search: 'search1',
    };

    const routeName = (name: RouteNames) => {
        let capName =  capitalizeFirstLetter(name)
        const defaultIconName = ESCREENICON.PLAY;
        const iconName = routeMap[capName];
        return iconName || defaultIconName;
    };

    return (
        <Animated.View style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
            <Animated.View
                style={{
                    paddingBottom: 10
                }}
            >
                <Animated.View
                    style={[
                        styles.container,
                    ]}
                >
                    <AntDesign
            name={routeName(props.routeName as any)}
            size={22}
            color={props.isFocused ? color.torchRed : color.mediumGray}
            style={{ paddingBottom: 6 }}
          />

                    {/* <MusicIcon name={'play'} size={18} color={props.isFocused ? color.torchRed : color.mediumGray} /> */}
                    <Animated.Text
                        style={{
                            color: props.isFocused ? color.torchRed : color.mediumGray,
                            fontSize: 12,
                            fontWeight: "700",
                            overflow: "hidden",
                            textAlign: 'center'
                        }}
                        numberOfLines={1}
                    >
                        {capitalizeFirstLetter(props.routeName)}
                    </Animated.Text>

                </Animated.View>

            </Animated.View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 24,
        // flexDirection: "row",
        zIndex: 1,
        alignSelf: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
});

export default BottomIcon;