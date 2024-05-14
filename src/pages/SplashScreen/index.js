import { Text, StyleSheet, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import Logo from "../../assets/img/Logo&Name.png";

const SplashScreen = ({ navigation }) => {
  const globalState = useSelector((state) => state);

  const [isLoad, setIsLoad] = useState(false);
  const [status, setStatus] = useState(0);
  const [widthLoading, setWidthLoading] = useState(0);

  useEffect(() => {
    if (isLoad === false) {
      setIsLoad(true);
      statusLoading();
    }
  });

  useFocusEffect(
    React.useCallback(() => {
      // console.log("Splashscreen log", globalState.dataPengguna.email);
      if (status === 100) {
        if (globalState.dataPengguna.email !== null) {
          // console.log(globalState);
          navigation.navigate("Dashboard");
        } else {
          // console.log(globalState);
          navigation.navigate("Login");
        }
      }
    }, [globalState, status])
  );

  const statusLoading = () => {
    var i = 0; //  set your counter to 1
    var wid = 0;

    function myLoop() {
      setStatus(i);
      setWidthLoading(wid);
      setTimeout(function () {
        // console.log("hello", wid);
        wid = wid + 2;
        i++;
        if (i < 101) {
          myLoop();
        } else {
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
