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

const App = () => {
  return (
    <View>
      {/* <SplashScreen /> */}
      <Login />
    </View>
  );
};

const styles = StyleSheet.create({});

export default App;
