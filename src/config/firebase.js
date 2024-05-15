// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, initializeAuth } from "firebase/auth";

import { getReactNativePersistence } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-community/async-storage";

import { onAuthStateChanged } from "firebase/auth";

import store from "./redux";
import {
  setUID,
  setEmail,
  setName,
  setPhoneNumber,
  setPhotoUrl,
} from "./dataUser";

const firebaseConfig = {
  apiKey: "AIzaSyCc5ek9ssBoMX3Qq3lbZmPzPO3-DbabQYU",
  authDomain: "kedasi.firebaseapp.com",
  databaseURL: "https://kedasi-default-rtdb.firebaseio.com",
  projectId: "kedasi",
  storageBucket: "kedasi.appspot.com",
  messagingSenderId: "1005977900028",
  appId: "1:1005977900028:web:5ca8737e2de38ab5085879",
  measurementId: "G-D3857WHYJZ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// export const auth = getAuth(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const CheckCurrentUser = () => {
  onAuthStateChanged(auth, (currentUser) => {
    // console.log("log config firebase", currentUser);

    // store.dispatch({ type: "SET_DATA", input: currentUser });
    //   const dispatch = useDispatch();

    if (currentUser !== null) {
      store.dispatch(setUID(currentUser.uid));
      store.dispatch(setEmail(currentUser.email));
      store.dispatch(setName(currentUser.displayName));
      store.dispatch(setPhoneNumber(currentUser.phoneNumber));
      store.dispatch(setPhotoUrl(currentUser.photoURL));
    } else {
      store.dispatch(setUID(null));
      store.dispatch(setEmail(null));
      store.dispatch(setName(null));
      store.dispatch(setPhoneNumber(null));
      store.dispatch(setPhotoUrl(null));
    }
  });
};
