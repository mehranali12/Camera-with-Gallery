import React, { useState } from "react";
import { View, Image, Text, FlatList, TouchableOpacity } from 'react-native';

import CountdownCircle from 'react-native-countdown-circle';

const timeStart = () => {
    console.log('i am pressed.....');
    setonTimeElapsed={}
}

export default MyCameraRoll = ({ onLongPress }) => {
    const [onTimeElapsed, setonTimeElapsed] = useState(null);

    return (
        <TouchableOpacity>
            <View style={{ justifyContent: 'center', alignItems: "center", marginTop: 50, }}>
                <CountdownCircle
                    seconds={4}
                    radius={35}
                    borderWidth={5}
                    //color="#ff003f"
                    color="red"
                    bgColor="#fff"
                    containerStyle={{}}
                    textStyle={{ fontSize: 0 }}
                    onTimeElapsed={() => console.log('how time is it....')}
                />
                <View style={{ height: 45, width: 45, borderRadius: 50, position: 'absolute', backgroundColor: '#E64C4C', }}></View>

            </View>
        </TouchableOpacity>
    )
}