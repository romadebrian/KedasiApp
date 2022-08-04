/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import SplashScreen from './src/pages/SplashScreen';
import Login from './src/pages/Login';
import Register from './src/pages/Register';
import ForgotPassword from './src/pages/ForgotPassword';

const App = () => {
  return (
    <View>
      {/* <SplashScreen /> */}
      {/* <Login /> */}
      {/* <Register /> */}
      <ForgotPassword />
    </View>
  );
};

const styles = StyleSheet.create({});

export default App;
