/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import SplashScreen from './src/pages/SplashScreen';
import Login from './src/pages/Login';
import Register from './src/pages/Register';
import ForgotPassword from './src/pages/ForgotPassword';
import Dashboard from './src/pages/Dashboard';
import Profile from './src/pages/Profile';
import Header from './src/components/Header';
import SideNav from './src/components/SideNav';

const App = () => {
  return (
    <ScrollView>
      <View>
        <Header />
        {/* <SplashScreen /> */}
        {/* <Login /> */}
        {/* <Register /> */}
        {/* <ForgotPassword /> */}
        {/* <Dashboard /> */}
        <Profile />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default App;
