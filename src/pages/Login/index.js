import {
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";

import Logo from "../../assets/img/kedasi_logo.png";
import NamaLogo from "../../assets/img/kedasi_nama.png";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const HandleButtonLogin = () => {
    // console.log(navigation);
    // navigation.navigate("Dashboard", { name: "Jane" });
    //
    // const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("Login Berhasil", user);
        navigation.navigate("Dashboard");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Gagal", errorCode, errorMessage);
      });
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
          onPress={() => navigation.navigate("ForgotPassword")}
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
          onPress={() => HandleButtonLogin()}
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
  logo: { width: 75, height: 75, marginTop: 50 },
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
