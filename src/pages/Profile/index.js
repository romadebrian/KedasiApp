import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  BackHandler,
  Alert,
} from "react-native";
import React, { Component, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { app, auth, CheckCurrentUser } from "../../config/firebase";
import { getDatabase, ref, onValue, child, set, get } from "firebase/database";
import { updateProfile, sendPasswordResetEmail } from "firebase/auth";
import {
  getStorage,
  // ref,
  ref as sRef,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
  uploadString,
} from "firebase/storage";

import { launchImageLibrary } from "react-native-image-picker";

import BackGround from "../../assets/img/bg.jpeg";
import ExamplePhotoProfile from "../../assets/img/romadebrian.png";
import { useFocusEffect } from "@react-navigation/native";
import { async } from "@firebase/util";

const Profile = ({ navigation }) => {
  const globalState = useSelector((state) => state.dataPengguna);

  const [isLoad, setIsLoad] = useState(false);

  const [userID, setUserID] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    // handleCollectDataUser();

    const unsubscribe = navigation.addListener("focus", () => {
      setIsLoad(false);
      // setPhoto("");
    });
    return unsubscribe;
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      // console.log(globalState);

      if (isLoad === false) {
        handleCollectDataUser();
        setIsLoad(true);
      }

      BackHandler.addEventListener("hardwareBackPress", () =>
        navigation.navigate("Dashboard")
      );

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", () =>
          navigation.navigate("Dashboard")
        );
      };
    })
  );

  // componentDidUpdate() {
  //   // console.log("Data Redux: ", this.props.dataPengguna);
  //   var dataPengguna = this.props.dataPengguna;

  //   if (this.state.editStatus === false) {
  //     if (
  //       this.state.userID === dataPengguna.uid &&
  //       this.state.FullName === dataPengguna.displayName &&
  //       this.state.Email === dataPengguna.email &&
  //       this.state.Photo === dataPengguna.photoURL
  //     ) {
  //       null;
  //     } else {
  //       this.setState({
  //         userID: dataPengguna.uid,
  //         FullName: dataPengguna.displayName,
  //         Email: dataPengguna.email,
  //         // PhoneNumber: dataPengguna.phoneNumber,
  //         Photo: dataPengguna.photoURL,
  //       });
  //     }
  //   }
  // }

  const handleCollectDataUser = async () => {
    // const starCountRef = ref(db, "users/" + userID + "/Nama");
    // Pakai onValue/Onchanged karena didComponentMount gak terbaca ke 2 kalinya jadi harus terus update

    console.log("Data Redux: ", globalState);

    setUserID(globalState.uid);
    setFullName(globalState.displayName);
    setEmail(globalState.email);
    setPhoto(globalState.photoURL);

    var user = await globalState.uid;
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${user}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log("Data Database", data);
          setAddress(data?.Alamat);
          setPhoneNumber(data?.Telepon);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });

    //
  };

  const HandleSave = () => {
    // console.log(this.props);

    const db = getDatabase();
    set(ref(db, "users/" + userID), {
      Nama: fullName,
      Email: email,
      Telepon: phoneNumber,
      Alamat: address,
      Profile_Picture: photo,
    })
      .then(() => {
        // Profile updated!
        console.log("Berhasil Simpan");
        ToastAndroid.show("Profile Updated", ToastAndroid.SHORT);
      })
      .catch((error) => {
        // An error occurred
        console.log("Gagal Simpan", error);
        alert("Gagal Simpan");
      });

    updateProfile(auth.currentUser, {
      displayName: fullName,
      photoURL: photo,
    }).then(() => {
      CheckCurrentUser();
    });

    // this.props.navigation.navigate("Dashboard");
  };

  const handleChangePassword = () => {
    Alert.alert("Change Password", "Do you want to change the password?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          sendPasswordResetEmail(auth, email)
            .then(() => {
              Alert.alert(
                "Successfully Sent",
                "Password Reset Link Has Been Sent to Email",
                [{ text: "OK" }]
              );
            })
            .catch((err) => {
              console.log(err.code);
              Alert.alert("Error", "Email not found", [
                { text: "OK", onPress: () => console.log("OK Pressed") },
              ]);
            });
        },
      },
    ]);
  };

  const handleChangePhoto = async () => {
    const options = {
      includeBase64: true,
      mediaType: "photo",
    };

    const metadata = {
      contentType: "image/jpeg",
    };

    // launchImageLibrary({ noData: true }, (response) => {
    await launchImageLibrary(options, async (response) => {
      console.log(response);
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        // var fileName = response.assets[0].fileName;
        var filenya = response.assets[0];

        // Get Extension from source file
        // var arrA = Array.from(filenya.type);
        // arrA.splice(0, 6);
        // var Extension = arrA.join("");
        // console.log(Extension);

        const storage = getStorage(app);
        const storageRef = sRef(storage, `profile/${userID}.jpg`); // i use JPG for replace file in firebase

        const img = await fetch(response.assets[0].uri);
        const bytes = await img.blob();

        // uploadBytesResumable(storageRef, response);
        // const uploadTask = uploadBytesResumable(storageRef, response);
        //
        getDownloadURL((await uploadBytes(storageRef, bytes)).ref).then(
          (downloadURL) => {
            console.log("File available at", downloadURL);
            ToastAndroid.show("Foto Uploaded", ToastAndroid.SHORT);

            setPhoto(downloadURL);
            HandleSave();
          }
        );
        //
        // uploadString(storageRef, filenya, "base64", metadata).then(
        //   (snapshot) => {
        //     console.log("Uploaded a base64 string!", filenya.toString());
        //   }
        // );

        // storage.ref(`images/test.jpeg`).put(response);

        // uploadBytes(sRef(getStorage(), "images/test.jepg"), response).then(
        //   (res) => console.log(res)
        // );

        // sRef.put(response).then((snapshot) => {
        //   console.log("Uploaded a blob or file!");
        // });

        // Base64url formatted string
        // const message3 = "5b6p5Y-344GX44G-44GX44Gf77yB44GK44KB44Gn44Go44GG77yB";
        // uploadString(storageRef, message3, "base64url").then((snapshot) => {
        //   console.log("Uploaded a base64url string!", snapshot);
        // });

        // Data URL string
        // const message4 =
        //   "data:text/plain;base64,5b6p5Y+344GX44G+44GX44Gf77yB44GK44KB44Gn44Go44GG77yB";

        // const message4 = `data:image/jpeg;base64,${filenya}`;
        // uploadString(storageRef, message4, "data_url").then((snapshot) => {
        //   console.log("Uploaded a data_url string!", filenya);
        // });

        // const base64str = "data:image/png;base64," + filenya;
        // uploadString(storageRef, base64str.split(",")[1], "base64", {
        //   contentType: "image/png",
        // }).then((snapshot) => {
        //   console.log(base64str);
        // });
      }
    });
  };

  return (
    <ScrollView>
      <View style={styles.containerProfile}>
        <Image source={BackGround} style={{ width: "100%", height: 150 }} />
        <TouchableOpacity
          style={{ position: "absolute", top: 65 }}
          onPress={handleChangePhoto}
        >
          {photo === null || photo === "" ? (
            <Image
              source={require("../../assets/img/no-image.png")}
              style={styles.photoProfile}
            />
          ) : (
            <Image
              source={{ uri: photo + "?" + new Date() }}
              style={styles.photoProfile}
            />
          )}
          <View style={styles.IconPhoto}>
            <Image
              source={require("../../assets/icon/camera-solid-white.png")}
              style={{ width: 20, height: 15, resizeMode: "stretch" }}
            />
          </View>
        </TouchableOpacity>
        <Text style={{ marginTop: 65, marginBottom: 20 }}>{fullName}</Text>
        <TextInput
          placeholder="Name"
          style={[styles.input]}
          value={fullName}
          onChangeText={(value) => setFullName(value)}
          // onFocus={() => this.setState({ editStatus: true })}
          // onBlur={() => console.log("Not Fokus")}
        />
        <TextInput
          placeholder="Email"
          style={[styles.input]}
          value={email}
          onChangeText={(value) => setEmail(value)}
          editable={false}
        />
        <TextInput
          placeholder="Phone Number"
          keyboardType="number-pad"
          style={[styles.input]}
          value={phoneNumber}
          onChangeText={(value) => setPhoneNumber(value)}
        />
        <TextInput
          placeholder="Address"
          style={[styles.inputAddress]}
          value={address}
          onChangeText={(value) => setAddress(value)}
        />

        <View style={styles.containerFooter}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={[
                styles.containerButton,
                { marginRight: 5, backgroundColor: "#007BFF" },
              ]}
              onPress={HandleSave}
            >
              <Text style={[styles.TxtButton, { color: "white" }]}>SAVE</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.containerButton, { backgroundColor: "#FFC107" }]}
              onPress={() => navigation.navigate("Dashboard")}
            >
              <Text style={styles.TxtButton}>CANCEL</Text>
            </TouchableOpacity>
          </View>

          <View style={{ width: "45%", flexDirection: "row-reverse" }}>
            <TouchableOpacity
              style={[styles.containerButton, { backgroundColor: "#28A745" }]}
              onPress={handleChangePassword}
            >
              <Text style={styles.TxtBtnChangePassword}>Change Password</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = ({ dataPengguna }) => ({
  // globalState: dataPengguna,
  dataPengguna,
});

export default Profile;

const styles = StyleSheet.create({
  containerProfile: {
    backgroundColor: "#FEF7EF",
    alignItems: "center",
    height: "100%",
  },
  photoProfile: {
    width: 145,
    height: 145,
    borderRadius: 145 / 2,
    // position: "absolute",
    // top: 65,
  },
  input: {
    marginBottom: 13,
    width: 300,
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 18,
    borderColor: "rgba(0, 0, 0, 0.3)",
    fontFamily: "Poppins",
    fontSize: 16,
    // textAlignVertical: 'center',
  },
  inputAddress: {
    marginBottom: 13,
    width: 300,
    height: 100,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 18,
    borderColor: "rgba(0, 0, 0, 0.3)",
    fontFamily: "Poppins",
    fontSize: 16,
    textAlignVertical: "top",
  },
  containerFooter: {
    width: 300,
    marginBottom: 10,
    flexDirection: "row",
  },
  containerButton: {
    width: 80,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  TxtButton: {
    fontFamily: "Poppins",
    fontWeight: "bold",
    fontSize: 16,
  },
  TxtBtnChangePassword: {
    textAlign: "center",
    color: "white",
    fontFamily: "Poppins",
    fontWeight: "bold",
    fontSize: 13,
  },
  IconPhoto: {
    width: 35,
    height: 35,
    backgroundColor: "#3cb57a",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    position: "absolute",
    top: 100,
    left: 110,
  },
});
