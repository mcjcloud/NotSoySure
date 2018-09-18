import React, { Component } from 'react';
import {
    NativeModules,
    StatusBar,
    Dimensions,
    Alert,
    StyleSheet,
    Animated,
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import { RNCamera } from 'react-native-camera';

import logo from '../res/notsoysurelogo.png';

const MLKitModule = NativeModules.MLKitModule;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class CameraScreen extends Component {
    constructor(props) {
        super(props);
        this.offsetAnimation = new Animated.Value(0);
        this.state = {
            image: undefined,
        }
    }

    takePicture = async function() {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options);
            this.setState({ image: data.base64 });
            console.log('set state');
            if (data.base64) {
                MLKitModule.processImage(data.base64, (err, res) => {
                    if (err) {
                        Alert.alert('Error', err);
                    }
                    else {
                        let sanitized = this.sanitizeImageWords(res);
                        this.checkIngredients(sanitized);
                    }
                });
            }
        }
    }

    sanitizeImageWords(blocks) {
        let sanitized = [];
        for (let block of blocks) {
            let components = block.toLowerCase().replace(/([,.:]| and | or )/g, ',');
            components = components.split(',');
            for (let component of components) {
                let match = component.match(/[\d?%]/g);
                if ((!match || match.length <= 0) && component.length > 1) {
                    sanitized.push(component.trim());
                }
            }
        }
        return sanitized;
    }

    checkIngredients(list) {
        fetch('http://10.214.179.63:3000/checkIngredients', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ingredients: list }),
        })
        .then(data => data.json())
        .then(json => {
            this.setState({ image: undefined });
            this.props.navigation.navigate('ResultsView', {
                results: json,
            });
        })
        .catch(err => Alert.alert(`Request Error: ${err}`));
    }

    render() {
        return (
            <Animated.View style={styles.container}>
                <StatusBar
                    backgroundColor="#087f23"
                    barStyle="light-content"
                />
                {/* camera screen */}
                <Animated.View style={{flex: 1, transform: [{ translateY: this.offsetAnimation }] }}>
                    {/* camera part */}
                    {this.state.image && <Image style={styles.camera} source={{ uri: `data:image/png;base64,${this.state.image}`}} />}
                    {!this.state.image && <RNCamera
                        ref={ref => this.camera = ref}
                        style={styles.camera}
                        type={RNCamera.Constants.Type.back}
                        flashMode={RNCamera.Constants.FlashMode.off}
                        permissionDialogTitle={'Permission to use camera'}
                        permissionDialogMessage={'We need your permission to use your camera phone'}
                    />}
                    {/* camera button */}
                    <View style={styles.cameraButtonContainer}>
                        <TouchableOpacity style={styles.cameraButton} onPress={() => this.takePicture()}>
                            <Image style={styles.cameraImage} source={logo} resizeMode={'contain'} />
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    camera: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    cameraButtonContainer: {
        height: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cameraButton: {
        display: 'flex',
        alignItems: 'center',
        height: 80,
        width: 80,
    },
    cameraImage: {
        flex: 1,
        justifyContent: 'center',
    },
});
