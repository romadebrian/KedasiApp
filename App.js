/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  BackHandler,
  Alert,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { auth, CheckCurrentUser } from "./src/config/firebase";

import { Provider } from "react-redux";
import store from "./src/config/redux";

import Header from "./src/components/Header";
import SideNav from "./src/components/SideNav";

import SplashScreen from "./src/pages/SplashScreen";
import Login from "./src/pages/Login";
import Register from "./src/pages/Register";
import ForgotPassword from "./src/pages/ForgotPassword";
import Dashboard from "./src/pages/Dashboard";
import Profile from "./src/pages/Profile";

import RoomReservation from "./src/pages/RoomReservation";
import PickDate from "./src/pages/RoomReservation/component/PickDate";
import Room from "./src/pages/RoomReservation/component/Room";
import DetaillRoom from "./src/pages/RoomReservation/DetaillRoom";
import CheckOut from "./src/components/CheckOut";
import TransactionList from "./src/pages/TransactionList";
import Notification from "./src/pages/Notification";
import Message from "./src/pages/Message";

// import NotifService from "./src/config/Notification/NotifService";

var FullWidth = Dimensions.get("window").width; //full width
var FullHeight = Dimensions.get("window").height; //full height

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const App = (props) => {
  const [registerToken, setRegisterToken] = useState("");
  const [fcmRegistered, setFcmRegistered] = useState(false);

  // console.log("Props Apps", props);
  // const dispatch = useDispatch();

  useEffect(() => {
    // console.log(globalState);
    // store.dispatch(setDataPengguna("Roma Debrians123")); //  Bisa
    const backAction = () => {
      // Alert.alert("Hold on!", "Are you sure you want to go back?", [
      //   {
      //     text: "Cancel",
      //     onPress: () => null,
      //     style: "cancel",
      //   },
      //   { text: "YES", onPress: () => BackHandler.exitApp() },
      // ]);
      // alert("Roma Back");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  CheckCurrentUser();

  // Notification System
  // const onRegister = (token) => {
  //   setRegisterToken(token.token);
  //   setFcmRegistered(true);
  // };

  // const onNotif = (notif) => {
  //   // Alert.alert(notif.title, notif.message);
  //   handleCreateNotification(notif.title, notif.message);
  // };

  // const notif = new NotifService(onRegister, onNotif);

  // const handleCreateNotification = (ValTitle, ValMessage) => {
  //   notif.localNotif(ValTitle, ValMessage, Nav);
  //   // notif.localNotif([
  //   //   {
  //   //     id: "userAction",
  //   //     actions: [
  //   //       { id: "open", title: "Open", options: { foreground: true } },
  //   //       {
  //   //         id: "ignore",
  //   //         title: "Desruptive",
  //   //         options: { foreground: true, destructive: true },
  //   //       },
  //   //       {
  //   //         id: "text",
  //   //         title: "Text Input",
  //   //         options: { foreground: true },
  //   //         textInput: { buttonTitle: "Send" },
  //   //       },
  //   //     ],
  //   //   },
  //   // ]);
  // };

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
          // screenOptions={{
          //   drawerStyle: {
          //     backgroundColor: '#c6cbef',
          //     width: 240,
          //   },
          // }}
        >
          <Stack.Screen name="Dashboard" component={Dashboard} />

          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            // options={{ title: "Welcome" }}
            options={{ headerShown: false, swipeEnabled: false }}
          />

          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false, swipeEnabled: false }}
          />

          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{ headerShown: false, swipeEnabled: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false, swipeEnabled: false }}
          />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="RoomReservation" component={RoomReservation} />
          <Stack.Screen name="PickDate" component={PickDate} />
          <Stack.Screen name="Room" component={Room} />
          <Stack.Screen name="DetaillRoom" component={DetaillRoom} />
          <Stack.Screen name="CheckOut" component={CheckOut} />
          <Stack.Screen name="TransactionList" component={TransactionList} />
          <Stack.Screen name="Notification" component={Notification} />
          <Stack.Screen name="Message" component={Message} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
