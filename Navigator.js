import React from 'react';
import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';
import CameraScreen from './screens/CameraScreen';
import SearchScreen from './screens/SearchScreen';
import ResultsView from './screens/ResultsView';

export default createMaterialTopTabNavigator(
    {
        'Not Soy Sure?': {
            screen: createStackNavigator({
                'Camera': {
                    screen: CameraScreen,
                    navigationOptions: () => ({ header: null }),
                },
                'ResultsView': {
                    screen: ResultsView,
                    navigationOptions: () => ({ header: null }),
                },
            },
            {
                initialRouteName: 'Camera',
            }),
        },
    },
    {
        initialRouteName: 'Not Soy Sure?',
        tabBarOptions: {
            indicatorStyle: { backgroundColor: '#087f23' },
            style: { backgroundColor: '#4caf50' },
            activeTintColor: 'black',
            inactiveTintColor: 'black',
        },
    }
);
