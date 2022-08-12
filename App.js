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
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Provider } from "react-redux";

import { auth } from "./src/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";

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
import store from "./src/config/redux";

var FullWidth = Dimensions.get("window").width; //full width
var FullHeight = Dimensions.get("window").height; //full height

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const App = (props) => {
  // console.log(props);
  // const dispatch = useDispatch();

  onAuthStateChanged(auth, (currentUser) => {
    console.log(currentUser);
    store.dispatch({ type: "SET_DATA", input: currentUser });
  });

  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* <Header /> */}
        <Drawer.Navigator
          // screenOptions={{
          //   headerShown: false,
          // }}
          initialRouteName="SplashScreen"
          screenOptions={{ header: (props) => <Header {...props} /> }}
          drawerContent={(props) => <SideNav {...props} />}
        >
          <Stack.Screen name="Dashboard" component={Dashboard} />

          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            // options={{ title: "Welcome" }}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="RoomReservation" component={RoomReservation} />
          <Stack.Screen name="PickDate" component={PickDate} />
          <Stack.Screen name="Room" component={Room} />
          <Stack.Screen name="RoomDetail" component={RoomDetail} />
          <Stack.Screen name="CheckOut" component={CheckOut} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
