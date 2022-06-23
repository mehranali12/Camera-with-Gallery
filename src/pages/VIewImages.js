import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';

import CameraRollPicker from 'react-native-camera-roll-picker';

export default class ViewImage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            num: 0,
            selected: [],
        };

        this.getSelectedImages = this.getSelectedImages.bind(this);
    }

    getSelectedImages(images, current) {
        var num = images.length;

        this.setState({
            num: num,
            selected: images,
        });

        console.log(current);
        console.log(this.state.selected);
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <TouchableOpacity
                    onPress={()=> this.props.navigation.goBack()}
                        style={{
                            top: 30,
                            left: 30,
                           
                        }}>
                        <Image
                            source={require('../../assets/icons/blackclose.png')}
                            style={{}}
                        />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ fontSize: 25, top: 50, left: 30,marginBottom: 20, paddingBottom: 50, }}>Gallery</Text>
                    </View>
                </View>

                <CameraRollPicker
                    groupTypes='SavedPhotos'
                    maximum={3}
                    selected={this.state.selected}
                    //selectSingleItem={true}
                    assetType='Photos'
                    imagesPerRow={3}
                    imageMargin={8}
                    callback={this.getSelectedImages} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#F6AE2D',
        backgroundColor: 'white',
    },
    content: {
        marginTop: 15,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    text: {
        fontSize: 16,
        alignItems: 'center',
        color: '#000',
    },
    bold: {
        fontWeight: 'bold',
    },
    info: {
        fontSize: 12,
    },
});