import TrackPlayer from 'react-native-track-player';


import {name as appName} from './app.json';
import { PlaybackService } from './src/service/audio';
import App from './App';
import { registerRootComponent } from 'expo';
import { AppRegistry } from 'react-native';

// registerRootComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => PlaybackService);
AppRegistry.registerComponent('main',() => App);
