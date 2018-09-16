import React from 'react';
import Navigator from './Navigator';
import { Platform, View } from 'react-native';

export default App = () => {
    return (
        <View style={{flex: 1}}>
            {Platform.OS === 'ios' && <View style={{height: 20, backgroundColor: '#087f23'}} />}
            <Navigator />
        </View>
    );
}
