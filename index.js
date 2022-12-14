/**
 * @format
 */
import "react-native-gesture-handler"; //Add react-native-gesture-handler

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";

import { auth, CheckCurrentUser } from "./src/config/firebase";
import { onAuthStateChanged } from "firebase/auth";

import store from "./src/config/redux";
// import { useDispatch } from "react-redux";
import {
  setUID,
  setEmail,
  setName,
  setPhoneNumber,
  setPhotoUrl,
} from "./src/config/dataUser";

import React, { Component } from "react";

// const initial = () => {
//   return onAuthStateChanged(auth, (currentUser) => {
//     console.log(currentUser);
//     store.dispatch({ type: "SET_DATA", input: currentUser });

//     // return <App />;
//   });

//   return <App />;
// };

// const CheckCurrentUser = () => {
//   onAuthStateChanged(auth, (currentUser) => {
//     console.log(currentUser);

//     // store.dispatch({ type: "SET_DATA", input: currentUser });
//     //   const dispatch = useDispatch();

//     if (currentUser !== null) {
//       store.dispatch(setUID(currentUser.uid));
//       store.dispatch(setEmail(currentUser.email));
//       store.dispatch(setName(currentUser.displayName));
//       store.dispatch(setPhoneNumber(currentUser.phoneNumber));
//       store.dispatch(setPhotoUrl(currentUser.photoURL));
//     } else {
//       store.dispatch(setUID(null));
//       store.dispatch(setEmail(null));
//       store.dispatch(setName(null));
//       store.dispatch(setPhoneNumber(null));
//       store.dispatch(setPhotoUrl(null));
//     }
//   });
// };

CheckCurrentUser();

AppRegistry.registerComponent(appName, () => App);
