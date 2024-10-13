import { StyleSheet, View, Pressable, useWindowDimensions } from "react-native";
import React from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import BottomIcon from "./BottomIcon";
import { color } from "@music/theme/color";
import * as Haptics from 'expo-haptics';
import { BOTTOM_BAR_HEIGHT } from "@music/constant/constant";
import { BlurView } from 'expo-blur';

const CustomBottomTabBar = ({
    state,
    descriptors,
    navigation,
}: BottomTabBarProps) => {
    const MARGIN = 0;
    return (
        <BlurView intensity={10} style={[styles.container, { width: '100%', bottom: MARGIN }]}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];

                const isFocused = state.index === index;

                const onPress = () => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: "tabLongPress",
                        target: route.key,
                    });
                };
                return (
                    <Pressable
                        key={index}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{
                            flex: 1,
                        }}
                    >
                        <View style={[styles.content, { borderRadius: 24 }]}>
                            <BottomIcon
                                isFocused={isFocused}
                                routeName={route.name}
                                index={state.index}
                            />
                        </View>
                    </Pressable>
                );
            })}
        </BlurView>
        // </Shadow>
    );
};

export default CustomBottomTabBar;
// "#E5E5E5"
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flex: 1,
        backgroundColor: color.appBackground,
        position: "absolute",
        height: BOTTOM_BAR_HEIGHT,
        alignSelf: "center",
        justifyContent: "space-around",
        alignItems: "center",
        alignContent: "center",
        overflow: "hidden",
        borderTopWidth: 0.2, 
        borderTopColor: color.mediumGray
    },
    content: {
        flex: 1,
        flexDirection: "row",
        alignContent: "center",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
    },
});