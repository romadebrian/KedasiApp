/**
 * @format
 */
import "react-native-gesture-handler"; //Add

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";

import { auth } from "./src/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import store from "./src/config/redux";

import React, { Component } from "react";
import { async } from "@firebase/util";

// const initial = () => {
//   return onAuthStateChanged(auth, (currentUser) => {
//     console.log(currentUser);
//     store.dispatch({ type: "SET_DATA", input: currentUser });

//     // return <App />;
//   });

//   return <App />;
// };

AppRegistry.registerComponent(appName, () => App);
