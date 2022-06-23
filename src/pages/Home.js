import React from "react";
import { View, Text , StatusBar } from 'react-native'
import Mycamera from '../component/Camrea'

export default function Home(props) {
    return (
        <View style={{flex:1}}>
            <StatusBar hidden />
            <Mycamera navigation={props?.navigation} />
        </View>
    )
}