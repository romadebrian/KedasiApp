/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react";
import { ScrollView, StyleSheet, Text, View, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "./src/pages/SplashScreen";
import Login from "./src/pages/Login";
import Register from "./src/pages/Register";
import ForgotPassword from "./src/pages/ForgotPassword";
import Dashboard from "./src/pages/Dashboard";
import Profile from "./src/pages/Profile";
import Header from "./src/components/Header";
import SideNav from "./src/components/SideNav";
import RoomReservation from "./src/pages/RoomReservation";
import PickDate from "./src/pages/RoomReservation/component/PickDate";
import Room from "./src/pages/RoomReservation/component/Room";
import RoomDetail from "./src/pages/RoomReservation/component/RoomDetail";
import CheckOut from "./src/pages/RoomReservation/component/CheckOut";

var FullWidth = Dimensions.get("window").width; //full width
var FullHeight = Dimensions.get("window").height; //full height

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      {/* <Header /> */}
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          // options={{ title: "Welcome" }}
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
