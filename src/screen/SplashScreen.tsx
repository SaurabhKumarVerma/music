import { Modal, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import LottieView from "lottie-react-native";
import { ESCREEN } from "@music/types/screen";
import { navigationRef } from "@music/navigation/Rootnavigation";

const SplashScreen = () => {
    const [isVisible, setIsVisible] = useState<boolean>(true)
    // const navigation = useNavigation<NativeStackNavigationProp<BottomTabParamList>>()

  const startSplash = () => {
    return setTimeout(() => {
      setIsVisible(false)
      navigationRef.navigate(ESCREEN.HOME_SCREEN as never)
      // navigationRef.navigate(ESCREEN.LOGIN_SCREEN as never)
    }, 2000);
  };

  useEffect(() => {
    startSplash();
  }, []);

  return (
    <Modal
      animationType="fade"
      visible={isVisible}
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
