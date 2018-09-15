import React from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation';
import CameraScreen from './screens/CameraScreen';
import SearchScreen from './screens/SearchScreen';

export default createMaterialTopTabNavigator(
    {
        'Camera': {
            screen: CameraScreen,
        },
        'Search': SearchScreen,
    },
    {
        initialRouteName: 'Camera',
        tabBarOptions: {
            indicatorStyle: { backgroundColor: '#087f23' },
            style: { backgroundColor: '#4caf50' },
            activeTintColor: 'black',
            inactiveTintColor: 'black',
        },
    }
);
