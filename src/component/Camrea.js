import React, { useRef, useState, useEffect } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    Modal,
    StyleSheet,
    StatusBar,
    PermissionsAndroid,
    Platform,
    FlatList,
    Button
} from 'react-native';


import { RNCamera } from 'react-native-camera';
import { BlurView } from "@react-native-community/blur";
import Torch from 'react-native-torch';
import CameraRoll from "@react-native-community/cameraroll";
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';


// import {Timer, Countdown} from 'react-native-element-timer';


import MyCameraRoll from '../pages/CameraRoll';


export default function MyCamera(props, { navigation, onLongPress }) {

    const [toroch, settorch] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [isRecording, setisRecording] = useState([]);
    const [CameraType, setCameraType] = useState("back");
    const timerRef = useRef(null);
    var CameraRef = useRef(null);
    const [takingPic, settakingPic] = useState([]);
    const [data, setData] = useState('[]');
    const [num, setnum] = useState(null);
    const [toggle, settoggle] = useState(true);
    const [open, setopen] = useState(false);
    const countdownRef = useRef(null);



    const ToggleView = () => {
        console.log('i am your toggle.........');
        settoggle(true);
    }

    const tourch = async () => {
        if (Platform.OS === 'ios') {
            Torch.switchState(true);
        } else {
            const cameraAllowed = await Torch.requestCameraPermission(
                'Camera Permissions',
                'We require camera permissions to use the torch on the back of your phone.'
            );
            if (cameraAllowed) {
                Torch.switchState(true);
            }
        }
    };


    let count = num;
    let msTosec;
    let i;
    let check=i;
    const timerpic = async (val) => {
        count = val;

        console.log('count was updated to = ', count + ' ' + "ms");
        msTosec = ((count / 1000) % 60);
        console.log('count of ' + count + ' milisecond converted to second = ', msTosec);
        // for (i = msTosec; i >= 0; i--) {
        //     console.log('loopppp ..........', i)
        //     console.log('tessssssssssssst: ', (msTosec))
        //     setnum(i => i - 1);
        // }

        let temp = CameraRef;
        setTimeout(() => { console.log('initally takeplicture is = ', CameraRef); takePicture2(temp) }, val);
        console.log('final num is = ', num + ' ' + "ms");
        setnum(val);
    };



    const takePicture = async () => {
        if (CameraRef) {
            const data = await CameraRef.takePictureAsync();
            let take = [...takingPic]
            CameraRoll.save(data.uri)
            take.push(data)
            settakingPic(take)
            console.log("Image was taked : ############### ", data);
        }

    };

    const takePicture2 = async (val) => {
        if (val) {
            const data = await val.takePictureAsync();
            let take = [...takingPic]
            CameraRoll.save(data.uri)
            take.push(data)
            settakingPic(take)

            console.log("Image was taked : ############### ", data);
        }

    };

    const takeVideo = async () => {
        if (CameraRef) {
            const data = await CameraRef.recordAsync()
            setisRecording(data.uri);
            let save = [...isRecording]
            CameraRoll.save(data.uri)
            save.push(data)
            setisRecording(save)
            console.log(data.uri);
        }
    };

    const stopVideo = async () => {
        CameraRef.stopRecording();
    };


    const cameraType = () => {

        console.log('rotating the camera....Great');

        let rotateCamera;

        if (CameraType === "front") {
            rotateCamera = "back";
        }
        if (CameraType === "back") {
            rotateCamera = "front";
        }
        setCameraType(rotateCamera)
    };



    const getPhotos = () => {

        CameraRoll.getPhotos({
            first: 100,
            assetType: 'Photos',
        })
            .then((res) => {
                setData(res.edges);
            })
            .catch((error) => {
                console.log(error);
            });
    };


    const askPermission = async () => {
        if (Platform.OS === 'android') {
            const result = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    title: 'Permission Explanation',
                    message: 'ReactNativeForYou would like to access your photos!',
                },
            );
            if (result !== 'granted') {
                console.log('Access to pictures was denied');
                return;
            } else {
                getPhotos();
            }
        } else {
            getPhotos();
        }
    };

    useEffect(() => {
        askPermission();
    }, []);


    return (
        <View style={{ flex: 1 }}>


                {/* <Countdown
                    ref={countdownRef}
                    style={styles.timer}
                    textStyle={styles.timerText}
                    // autoStart={true}
                    initialSeconds={7}
                    // onTimes={e => {}}
                    // onPause={e => {}}
                    // onEnd={(e) => {}}
                />
                <Button
                    style={styles.button}
                    title={'Start'}
                    onPress={() => {
                        countdownRef.current.start();
                    }}
                />
                <Button
                    style={styles.button}
                    title={'Pause'}
                    onPress={() => {
                        countdownRef.current.pause();
                    }}
                />
                <Button
                    style={styles.button}
                    title={'Resume'}
                    onPress={() => {
                        countdownRef.current.resume();
                    }}
                />
                <Button
                    style={styles.button}
                    title={'Stop'}
                    onPress={() => {
                        countdownRef.current.stop();
                    }}
                /> */}




            <StatusBar hidden />
            <RNCamera
                ref={ref => CameraRef = ref}
                captureAudio={false}
                style={{ flex: 1 }}
                type={CameraType}
                flashMode={toroch ? RNCamera.Constants.FlashMode.on : RNCamera.Constants.FlashMode.off}
                androidCameraPermissionOptions={{
                    title: 'camera',
                    message: 'We need your permission to use your camera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }} >
            </RNCamera>


            <View style={{ borderWidth: 3, borderColor: 'white', position: 'absolute', height: 100, width: 100, borderRadius: 50, alignSelf: 'center', top: '50%', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'white', fontSize: 40, }}>
                  {num}
                </Text>
            </View>


            <TouchableOpacity
                style={{
                    position: "absolute",
                    top: 40,
                    left: 25,
                }}>
                <Image
                    source={require('../../assets/icons/close.png')}
                    style={{}}
                />
            </TouchableOpacity>

            {toggle && <TouchableOpacity
                onPress={() => settorch(!toroch)}
                style={{
                    position: "absolute",
                    top: 40,
                    right: 25,
                }}>
                {toroch ? <FontAwesome name='flash' size={30} color='white' /> :
                    <Image source={require('../../assets/icons/flish.png')} />}
            </TouchableOpacity>}

            {toggle && <TouchableOpacity
                onPress={() => {
                    settoggle(!toggle)
                    setopen(!open);
                }}

                style={{
                    position: "absolute",
                    top: 100,
                    right: 25,
                }}>
                <Image source={require('../../assets/icons/list.png')} />
            </TouchableOpacity>}

            {toggle && <TouchableOpacity
                onPress={() => {
                    setModalVisible(true);
                }}

                style={{
                    position: "absolute",
                    top: 160,
                    //top: toggle === true ? 160 : 220,
                    right: 25,
                }}>
                <Image
                    source={require('../../assets/icons/timer.png')}
                    style={{}}
                />
            </TouchableOpacity>}

            {open && <View style={{
                position: "absolute",
                left: '83%',
                height: 'auto',
                // borderWidth: 2,
                borderRadius: 28,
                borderColor: 'whte',
                top: toggle === true ? 0 : 35,
                alignItems: 'center',
                paddingTop: 30,
                paddingHorizontal: 5,
                paddingBottom: 15,
                backgroundColor: 'rgba(128,128,128,0.3)',
                // opacity: 0.4,
                //background: rgba(183, 181, 181, 0.57),
            }}>
                <Image source={require('../../assets/icons/list.png')}
                    style={{ height: 30, width: 30 }}
                />

                <Image source={require('../../assets/icons/list.png')}
                    style={{ marginTop: 20, height: 30, width: 30, }} />

                <Image source={require('../../assets/icons/list.png')}
                    style={{ marginTop: 20, height: 30, width: 30, }} />

                <TouchableOpacity
                    onPress={() => {
                        setopen(false)
                        settoggle(true)
                    }}
                >
                    <Image source={require('../../assets/icons/downerrow.png')}
                        style={{ marginTop: 25, marginBottom: 5 }} />
                </TouchableOpacity>
            </View>

            }




            <View style={{}}>
                <TouchableOpacity
                    onPress={() => cameraType()}
                    style={{
                        position: "absolute",
                        bottom: 20,
                        left: 50,

                    }}>
                    <Image
                        source={require('../../assets/icons/flip-camera.png')}
                        style={{ width: 40, height: 40 }}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => takePicture()}
                    onLongPress={() => takeVideo()}
                    onPressOut={() => stopVideo()}
                    delayLongPress={1000}
                    style={{
                        position: "absolute",
                        bottom: 0,
                        top: -125,
                        alignSelf: 'center'
                    }}>
                    {takePicture ? <Image
                        source={require('../../assets/icons/button.png')}
                        style={{ width: 100, height: 100, top: 40, }}
                    /> :
                        <View style={{ height: 45, width: 45, borderRadius: 50, position: 'absolute', backgroundColor: '#E64C4C', }}>
                            {/* <MyCameraRoll /> */}
                        </View>
                    }
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => props.navigation.navigate('ViewImage', {
                        //images: takingPic
                        images: data
                    }, { uri: data.uri })}

                    style={{
                        position: "absolute",
                        bottom: 20,
                        right: 50,
                    }}>
                    <Image
                        //source={require('../../assets/icons/lib.png')}
                        source={require('../../assets/icons/lib.png')}
                        style={{ width: 40, height: 40 }}
                    />
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                // transparent={true}
                visible={modalVisible}
                style={{ margin: 0, flex: 1 }}

                statusBarTranslucent
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <>
                    <BlurView
                        style={{
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                        }}
                        blurType="light"
                        blurAmount={1}
                    // reducedTransparencyFallbackColor="white"
                    />
                    <View style={{
                        flex: 1,
                        width: "100%",
                        height: '100%',
                        bottom: 0,
                        top: 0,
                    }}>
                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                            style={{
                                position: "absolute",
                                top: 20,
                                left: 20,
                            }}>
                            <Image
                                source={require('../../assets/icons/close.png')}
                                style={{}}
                            />
                        </TouchableOpacity>

                        <Text style={{ borderBottomWidth: 1, borderBottomColor: 'white', marginHorizontal: 60, fontSize: 20, color: 'white', textAlign: 'center', paddingBottom: 10, marginTop: '10%', }}>Timer</Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20, flexWrap: "wrap", }}>


                            <TouchableOpacity onPress={() => {
                                setModalVisible(false)
                                timerpic(1000)
                            }}>
                                <Image
                                    source={require('../../assets/icons/timer1.png')}
                                    style={{ width: 60, height: 60 }}
                                />
                            </TouchableOpacity>


                            <TouchableOpacity onPress={() => {
                                setModalVisible(false)
                                timerpic(2000)
                            }}>
                                <Image
                                    source={require('../../assets/icons/timer2.png')}
                                    style={{ width: 60, height: 60 }}
                                />
                            </TouchableOpacity>


                            <TouchableOpacity onPress={() => {
                                setModalVisible(false)
                                timerpic(3000)
                            }}>
                                <Image
                                    source={require('../../assets/icons/timer2.png')}
                                    style={{ width: 60, height: 60 }}
                                />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={() => {
                            setModalVisible(false)
                            timerpic(10000)
                        }}>
                            <Image
                                source={require('../../assets/icons/timer10.png')}
                                style={{ width: 60, height: 60, left: 40, top: 25 }}
                            />
                        </TouchableOpacity>
                    </View>
                </>
            </Modal>

        </View>

    );
}


const styles = StyleSheet.create({
    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    timer: {
        marginVertical: 10,
    },
    timerText: {
        fontSize: 20,
    },
    button: {
        marginVertical: 5,
        backgroundColor: 'white',
        borderRadius: 24,
        width: 100,
    },
});