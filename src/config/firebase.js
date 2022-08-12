// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, initializeAuth } from "firebase/auth";

import { getReactNativePersistence } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-community/async-storage";

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
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// export const auth = getAuth(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
