import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';

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
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo'
import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';


Splash.preventAutoHideAsync();
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY
export const Icon = createIconSetFromIcoMoon(
  require("./assets/icons/selection.json"),
  "IcoMoon",
  "icomoon.ttf"
);

WebBrowser.maybeCompleteAuthSession();

// Endpoint


export default function App() {
  // const progress = useProgress();
  const [loaded, error] = useFonts({
    IcoMoon: require("./assets/icons/icomoon.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      Splash.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
      <SplashScreen />
      <ClerkProvider publishableKey={publishableKey}>
        <ClerkLoaded>
          
            <NavigationContainer ref={navigationRef}>
              
              <RootNavigator />
              <StatusBar style="auto" />
              <FloatingScreen style={styles.floatingScreen} />
            </NavigationContainer>
         
        </ClerkLoaded>
      </ClerkProvider>
      {/* jhfjgfj */}
      </Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#131212',
  },
  floatingScreen: {
    position: 'absolute',
    left: 6,
    right: 6,
    bottom: BOTTOM_BAR_HEIGHT + 2,
  }
});
