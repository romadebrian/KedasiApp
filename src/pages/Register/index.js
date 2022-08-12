import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { updateProfile } from "firebase/auth";

const Register = ({ navigation }) => {
  const [fullName, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");

  const HandleRegister = () => {
    if (
      fullName === "" ||
      email === "" ||
      password === "" ||
      repassword === ""
    ) {
      alert("The form cannot be empty");
    } else if (password !== repassword) {
      alert("retype the password is not correct");
    } else
      // const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("Berhasil");

          updateProfile(auth.currentUser, {
            displayName: fullName,
            // photoURL: "https://example.com/jane-q-user/profile.jpg",
            // phoneNumber: '083877434091'
          })
            .then(() => {
              // Profile updated!
              // ...
            })
            .catch((error) => {
              // An error occurred
              // ...
            });

          navigation.navigate("Login");
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
    marginTop: 125,
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
