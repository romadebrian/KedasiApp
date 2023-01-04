import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  BackHandler,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { auth, CheckCurrentUser } from "../../config/firebase";
import { getDatabase, ref, update, set } from "firebase/database";
import { updateProfile, createUserWithEmailAndPassword } from "firebase/auth";
// import { createUserWithEmailAndPassword } from "firebase/auth";

import { useSelector } from "react-redux";

const Register = ({ navigation }) => {
  const globalState = useSelector((state) => state);

  const [fullName, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate("Login");
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  const HandleRegister = () => {
    if (
      fullName === "" ||
      email === "" ||
      password === "" ||
      repassword === ""
    ) {
      // alert("The form cannot be empty");
      Alert.alert("Faill", "The form cannot be empty", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    } else if (password !== repassword) {
      // alert("retype the password is not correct");
      Alert.alert("Input wrong", "Retype the password is not correct", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
    // const auth = getAuth();
    else
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("Berhasil");

          // handleSetTokenNotification(user.uid);
          handleSaveToDatabase(user.uid);

          ToastAndroid.showWithGravityAndOffset(
            "Registration Successful",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
          );

          // ToastAndroid.show("Login Successfully", ToastAndroid.LONG);

          updateProfile(auth.currentUser, {
            displayName: fullName,
            // photoURL: "https://example.com/jane-q-user/profile.jpg",
            // phoneNumber: '083877434091'
          })
            .then(() => {
              // Profile updated!
              CheckCurrentUser();
            })
            .catch((error) => {
              // An error occurred
              console.log(error);
            });

          navigation.navigate("Login");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("Gagal", errorCode, errorMessage);
        });
  };

  // const handleSetTokenNotification = async (userID) => {
  //   const db = getDatabase();

  //   const postData = globalState.someGlobalData.tokenNotif;

  //   const updates = {};
  //   // updates['/posts/' + newPostKey] = postData;
  //   updates["users/" + userID + "/" + "TokenNotif"] = postData;

  //   return update(ref(db), updates)
  //     .then(() => {
  //       console.log("Data saved successfully!");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const handleSaveToDatabase = (userID) => {
    const token = globalState.someGlobalData.tokenNotif;

    const db = getDatabase();
    set(ref(db, "users/" + userID), {
      Nama: fullName,
      Email: email,
      Telepon: "",
      Alamat: "",
      Profile_Picture: "",
      TokenNotif: token,
      notifikasi: [],
      order: [],
    })
      .then(() => {
        // Profile updated!
        console.log("Save Sucess");
        // ToastAndroid.show("Profile Updated Successfully", ToastAndroid.LONG);
      })
      .catch((error) => {
        // An error occurred
        console.log("Profile Updated Failled", error);
        alert("Profile Updated Failled");
      });
  };

  return (
    <View style={{ backgroundColor: "#FEF7EF", height: "100%" }}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.textRegis}>REGISTRATION</Text>
        <TextInput
          placeholder="Full Name"
          style={[styles.input]}
          value={fullName}
          onChangeText={setFullname}
        />
        <TextInput
          placeholder="Email"
          style={[styles.input]}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          style={[styles.input]}
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          placeholder="Confirm Password"
          secureTextEntry={true}
          style={[styles.input]}
          value={repassword}
          onChangeText={setRePassword}
        />
        <TouchableOpacity style={styles.BTNRegis} onPress={HandleRegister}>
          <Text style={styles.BTNText}>REGISTER</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: "100%" }}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.TextToLogin}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  textRegis: {
    marginTop: 80,
    marginBottom: 40,
    // fontWeight: 'bold',
    fontFamily: "PTSerifCaption-Regular",
    fontSize: 36,
  },
  input: {
    width: 300,
    height: 50,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 18,
    borderColor: "rgba(0, 0, 0, 0.3)",
    fontFamily: "Poppins",
  },
  BTNRegis: {
    marginTop: 13,
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
  TextToLogin: {
    fontWeight: "bold",
    marginTop: 15,
    marginStart: "10%",
    color: "#4592fa",
    fontFamily: "Poppins-SemiBold",
    fontSize: 13,
  },
});
