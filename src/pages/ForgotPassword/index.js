import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";

import Logo from "../../assets/img/kedasi_logo.png";
import NamaKedasi from "../../assets/img/kedasi_nama.png";
import ArrowBack from "../../assets/img/arrow-left-solid-HD.png";

const ForgotPassword = ({ navigation }) => {
  const HandleButtonSubmit = () => {
    navigation.navigate("Login");
  };
  return (
    <View style={{ backgroundColor: "#FEF7EF", height: "100%" }}>
      <View style={{ alignItems: "center" }}>
        <Image source={Logo} style={styles.Logo} />
        <Image source={NamaKedasi} style={styles.KedasiNama} />
        <Text style={styles.TxtForgotYPS}>Forgot your Password?</Text>
        <Text style={styles.TxtEnterYEmail}>
          Enter your email below to reset your password
        </Text>

        <TextInput
          placeholder="Email"
          style={[styles.input]}
          //   value={email}
          //   onChangeText={}
        />

        <TouchableOpacity
          style={styles.BtnForgotPassword}
          onPress={HandleButtonSubmit}
        >
          <Text style={styles.BTNText}>SUBMIT</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ width: "100%", flexDirection: "row" }}
          onPress={() => navigation.navigate("Login")}
        >
          <Image source={ArrowBack} style={styles.StyArrowBack} />
          <Text style={styles.TextBack}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  Logo: {
    width: 75,
    height: 75,
    marginTop: 123,
  },
  KedasiNama: {
    width: 180,
    height: 60,
    marginTop: 23,
  },
  TxtForgotYPS: {
    marginTop: 45,
    fontFamily: "PTSerifCaption-Regular",
    fontSize: 24,
    color: "#3A281E",
  },
  TxtEnterYEmail: {
    marginTop: 10,
    fontFamily: "PTSerifCaption-Regular",
    fontSize: 12,
  },
  input: {
    width: 300,
    height: 50,
    marginTop: 15,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 18,
    borderColor: "rgba(0, 0, 0, 0.3)",
    fontFamily: "Poppins",
  },
  BtnForgotPassword: {
    marginTop: 21,
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
  TextBack: {
    fontWeight: "bold",
    marginTop: 15,
    marginLeft: 5,
    color: "#0047FF",
    fontFamily: "Poppins-SemiBold",
    fontSize: 13,
  },
  StyArrowBack: {
    width: 15,
    height: 15,
    marginTop: 15,
    marginLeft: "10%",
  },
});
