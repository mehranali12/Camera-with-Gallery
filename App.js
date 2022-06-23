import React from 'react';
import {
  StyleSheet,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import ViewImage from './src/pages/VIewImages';
import Homee from './src/pages/Home';
import MyCameraRoll from './src/pages/CameraRoll';

const Stack = createStackNavigator();


export default App = () => {
  return (
   <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerShown:false
      }}
      >
        <Stack.Screen name="Home" component={Homee} />
        <Stack.Screen name="ViewImage" component={ViewImage} />

        {/* <Stack.Screen name="CameraRoll" component={MyCameraRoll} /> */}

      </Stack.Navigator>
    </NavigationContainer>
   
  );
};

const styles = StyleSheet.create({

});

