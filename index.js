/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings(['FaceDetector not integrated', 'Module MLKitModule', 'Warning: isMounted(...) is deprecated', 'Module RCTImageLoader', 'Setting a timer', 'Remote debugger is in a background']);
AppRegistry.registerComponent(appName, () => App);
