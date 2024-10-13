import { StatusBar } from 'expo-status-bar';
import {StyleSheet} from 'react-native';

import * as Splash from 'expo-splash-screen';
import { Provider } from 'react-redux';
import * as WebBrowser from 'expo-web-browser';
import { NavigationContainer } from '@react-navigation/native';
import { store } from '@music/store/store';
import SplashScreen from '@music/screen/SplashScreen';
import FloatingScreen from '@music/screen/FloatingScreen/FloatingScreen';
import { navigationRef } from '@music/navigation/Rootnavigation';
import { BOTTOM_BAR_HEIGHT } from '@music/constant/constant';
import RootNavigator from '@music/navigation/RootNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


Splash.preventAutoHideAsync();
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

WebBrowser.maybeCompleteAuthSession();

// Endpoint


export default function App() {
  // const progress = useProgress();
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <Provider store={store}>
      <NavigationContainer  ref={navigationRef}>
      <SplashScreen />
      <RootNavigator />
      <StatusBar style="auto" />
      <FloatingScreen style={styles.floatingScreen}/>
    </NavigationContainer>
    </Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#131212',
  },
  floatingScreen : {
    position: 'absolute',
    left: 6,
    right: 6,
    bottom: BOTTOM_BAR_HEIGHT + 2,
  }
});
