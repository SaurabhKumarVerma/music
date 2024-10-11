import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import {StyleSheet} from 'react-native';

import * as Splash from 'expo-splash-screen';
import { Provider } from 'react-redux';
import * as WebBrowser from 'expo-web-browser';
import { NavigationContainer } from '@react-navigation/native';
import { store } from '@music/store/store';
import HomeStack from '@music/navigation/StackNavigation/HomeStack';
import BottomNavigation from '@music/navigation/BottomNavigation/BottomNavigation';

Splash.preventAutoHideAsync();
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

WebBrowser.maybeCompleteAuthSession();

// Endpoint


export default function App() {
  // const progress = useProgress();
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      
      await Splash.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null
  }


  // const onPlay =  async () => {
  //   await TrackPlayer.setupPlayer();

  //   await TrackPlayer.add({
  //     id: 'trackId',
  //     url: 'https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3',
  //     title: 'Track Title',
  //     artist: 'Track Artist',
  //     // artwork
  //     // artwork: require('track.png')
  // });

  // await TrackPlayer.play();
  // }

  
  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* {!appIsReady ?  <SplashScreen /> : null} */}
    {/* <SafeAreaView style={styles.container} onLayout={onLayoutRootView}> */}
      {/* <LottieView source={require('./assets/lottie/splash.json')} autoPlay loop  style={{height: '100%', width: '100%'}}/> */}
      {/* <SplashScreen /> */}
     {/* <SplashScreen />
      <TouchableOpacity onPress={onPlay}>
      <Text>Play Music</Text>

      {/* <Text>{progress?.position}</Text> */}


      {/* </TouchableOpacity> */}
      <BottomNavigation/>
      <StatusBar style="auto" />
    {/* </SafeAreaView> */}
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#131212',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
