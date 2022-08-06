/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {ScrollView, StyleSheet, Text, View, Dimensions} from 'react-native';

import SplashScreen from './src/pages/SplashScreen';
import Login from './src/pages/Login';
import Register from './src/pages/Register';
import ForgotPassword from './src/pages/ForgotPassword';
import Dashboard from './src/pages/Dashboard';
import Profile from './src/pages/Profile';
import Header from './src/components/Header';
import SideNav from './src/components/SideNav';
import RoomReservation from './src/pages/RoomReservation';
import PickDate from './src/pages/RoomReservation/component/PickDate';

var FullWidth = Dimensions.get('window').width; //full width
var FullHeight = Dimensions.get('window').height; //full height
const App = () => {
  return (
    <View style={{width: '100%', height: '100%'}}>
      <Header />
      {/* <SplashScreen /> */}
      {/* <Login /> */}
      {/* <Register /> */}
      {/* <ForgotPassword /> */}
      {/* <Dashboard /> */}
      {/* <Profile /> */}
      {/* <RoomReservation /> */}
      <PickDate />
    </View>
  );
};

const styles = StyleSheet.create({});

export default App;
