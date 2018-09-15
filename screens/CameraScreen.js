import React from 'react';
import { StyleSheet, StatusBar, View, Text } from 'react-native';
import { RNCamera } from 'react-native-camera';

export default CameraScreen = () => {
    return (
        <View>
            <StatusBar
                backgroundColor="#087f23"
                barStyle="light-content"
            />
            {/* camera screen */}
            <View>
                {/* camera part */}
                <RNCamera
                    ref={ref => this.camera = ref}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.off}
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={'We need your permission to use your camera phone'}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
});
