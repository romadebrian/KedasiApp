import {
  Text,
  StyleSheet,
  View,
  Image,
  BackHandler,
  Alert,
} from "react-native";
import React, { Component, useEffect } from "react";

import Logo from "../../assets/img/Logo&Name.png";
import { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

const SplashScreen = ({ navigation }) => {
  const [isLoad, setIsLoad] = useState(false);
  const [status, setStatus] = useState(0);
  const [widthLoading, setWidthLoading] = useState(0);

  const [text, setText] = React.useState("");

  const hasUnsavedChanges = Boolean(text);

  console.log(status);

  useEffect(() => {
    if (isLoad === false) {
      setIsLoad(true);
      statusLoading();
    }
  }, [isLoad, status]);

  const statusLoading = () => {
    var i = 1; //  set your counter to 1

    function myLoop() {
      setStatus(status + 1);
      setWidthLoading(widthLoading + 2);
      setTimeout(function () {
        console.log("hello", status);
        i++;
        if (i < 101) {
          myLoop();
        } else {
          navigation.navigate("Login");
        }
      }, 0);
    }

    myLoop();
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Image source={Logo} style={styles.logoKedasi} />
        <Text style={{ marginTop: 50 }}>Loading {status}%</Text>
        <View style={{ width: 200 }}>
          <View style={[styles.loading, { width: widthLoading }]} />
        </View>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FEF7EF",
    height: "100%",
    // marginTop: -50,
    justifyContent: "center",
  },
  logoKedasi: {
    width: 330,
    height: 90,
    // marginTop: 228,
  },
  loading: {
    paddingTop: 13,
    borderBottomColor: "#F5D942",
    borderBottomWidth: 2,
  },
});
