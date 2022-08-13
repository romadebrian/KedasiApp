import {
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid,
  BackHandler,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";

import { useSelector } from "react-redux";

import Logo from "../../assets/img/kedasi_logo.png";
import NamaLogo from "../../assets/img/kedasi_nama.png";

const Login = ({ navigation }) => {
  const globalState = useSelector((state) => state);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [countBack, setCountBack] = useState(1);

  useEffect(() => {
    // console.log(globalState);
    // const backHandler = BackHandler.addEventListener(
    //   "hardwareBackPress",
    //   () => true
    // );
    // return () => backHandler.remove();
    //
    // if (globalState.userData !== null || globalState.userData !== "Loading") {
    //   // navigation.navigate("Login");
    //   navigation.navigate("Dashboard");
    //   console.log(globalState.userData);
    // } else {
    //   console.log(globalState.userData);
    // }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // console.log(globalState);

      if (globalState.userData === null || globalState.userData === "Loading") {
        // navigation.navigate("Login");
        console.log(globalState);
      } else {
        console.log(globalState.userData);
        navigation.navigate("Dashboard");
      }

      const onBackPress = () => {
        if (countBack > 0) {
          setCountBack(countBack - 1);
          ToastAndroid.show("Press again to exit", ToastAndroid.SHORT);
          // return true;
        } else {
          // return false;
          BackHandler.exitApp();
        }
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [countBack])
  );

  const HandleButtonLogin = () => {
    // console.log(navigation);
    // navigation.navigate("Dashboard", { name: "Jane" });
    if (email === "" || password === "") {
      alert("some value is empty");
    } else {
      // const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;

          ToastAndroid.showWithGravityAndOffset(
            "Login Successful",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
          );
          console.log("Login Successful", user);
          navigation.navigate("Dashboard");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("Gagal", errorCode, errorMessage);
          // alert("Login Fail");
          ToastAndroid.showWithGravityAndOffset(
            "Login Fail",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
          );
        });
    }
  };

  const handleBackButton = () => {
    // const backHandler = BackHandler.addEventListener(
    //   "hardwareBackPress",
    //   () => true
    // );
    // ToastAndroid.show("Back button is pressed", ToastAndroid.SHORT);
    // backHandler.remove();

    BackHandler.removeEventListener(
      "hardwareBackPress"
      // setCountBack(countBack - 1)
    );
  };

  return (
    <View style={{ backgroundColor: "#FEF7EF", height: "100%" }}>
      <View style={{ alignItems: "center" }}>
        <Image source={Logo} style={styles.logo} />
        <Image
          source={NamaLogo}
          style={{ width: 180, height: 60, marginTop: 15 }}
        />
        <TextInput
          placeholder="Email"
          style={[styles.input, { marginTop: 27 }]}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          style={[styles.input, { marginTop: 7 }]}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={{ width: "100%" }}
          onPress={() => {
            navigation.navigate("ForgotPassword");
            handleBackButton();
          }}
        >
          <Text
            style={[
              {
                marginTop: 15,
                marginBottom: 15,
                marginLeft: "10%",
                color: "rgba(68, 158, 240, 0.71)",
                fontFamily: "Poppins",
              },
            ]}
          >
            Forgot Password
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.BTNLogin}
          onPress={() => {
            HandleButtonLogin();
            handleBackButton();
          }}
        >
          <Text style={styles.BTNText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: "100%" }}
          onPress={() => navigation.navigate("Register")}
        >
          <Text
            style={[
              {
                fontWeight: "bold",
                marginTop: 15,
                marginStart: "10%",
                color: "#4592fa",
                fontFamily: "Poppins-SemiBold",
              },
            ]}
          >
            Create an Account
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  logo: { width: 75, height: 75, marginTop: 80 },
  input: {
    width: 300,
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 18,
    borderColor: "rgba(0, 0, 0, 0.3)",
    fontFamily: "Poppins",
  },
  BTNLogin: {
    width: 300,
    height: 50,
    borderRadius: 5,
    backgroundColor: "#4592fa",
    alignItems: "center",
    justifyContent: "center",
  },
  BTNText: {
    color: "white",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 25,
    lineHeight: 24,
  },
});
