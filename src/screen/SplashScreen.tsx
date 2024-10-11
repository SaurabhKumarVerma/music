import { Modal, StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import LottieView from "lottie-react-native";
import { useAppDispatch, useAppSelector } from "../hook/hook";
import { onStopSplash } from "../store/slice/globalSlice";
import { useNavigation } from "@react-navigation/native";
import { ESCREEN } from "@music/types/screen";
import { BottomTabParamList } from "@music/navigation/NavigationTypes/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const SplashScreen = () => {
    const isVisible = useAppSelector((state) => state.globalStore)
    const dispatch = useAppDispatch()
    const navigation = useNavigation<NativeStackNavigationProp<BottomTabParamList>>()

  const startSplash = () => {
    return setTimeout(() => {
      dispatch(onStopSplash())
      navigation.navigate(ESCREEN.HOME_SCREEN)
    }, 2000);
  };

  useEffect(() => {
    startSplash();
  }, []);

  return (
    <Modal
      animationType="fade"
      visible={isVisible.showSplash}
      presentationStyle="fullScreen"
      style={{}}
    >
      <View style={styles.container}>
        <LottieView
          source={require("../../assets/lottie/splash.json")}
          autoPlay
          style={{ height: 100, width: 100 }}
        />
      </View>
    </Modal>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#131212",
  },
});
