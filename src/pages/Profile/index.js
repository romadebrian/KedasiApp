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
} from "react-native";
import React, { Component } from "react";
import { connect } from "react-redux";

import { auth, CheckCurrentUser } from "../../config/firebase";
import { getDatabase, ref, onValue, child, set, get } from "firebase/database";
import { updateProfile } from "firebase/auth";

import BackGound from "../../assets/img/bg.jpeg";
import ExamplePhotoProfile from "../../assets/img/romadebrian.png";

class Profile extends Component {
  state = {
    userID: "",
    FullName: "",
    Email: "",
    PhoneNumber: "",
    Address: "",
    Photo: "",
  };

  componentDidMount() {
    // console.log(this.props);
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);

    this.handleCollectDataUser();
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleCollectDataUser = () => {
    // const starCountRef = ref(db, "users/" + userID + "/Nama");
    // Pakai onValue/Onchanged karena didComponentMount gak terbaca ke 2 kalinya jadi harus terus update

    console.log("Data Redux: ", this.props.dataPengguna);
    var dataPengguna = this.props.dataPengguna;
    this.setState(
      {
        userID: dataPengguna.uid,
        FullName: dataPengguna.displayName,
        Email: dataPengguna.email,
        // PhoneNumber: dataPengguna.phoneNumber,
        Photo: dataPengguna.photoURL,
      },
      () => {
        const db = getDatabase();
        const starCountRef = ref(db, "users/" + this.state.userID);
        onValue(starCountRef, (snapshot) => {
          const data = snapshot.val();
          console.log("Data Database", data);
          this.setState({ Address: data?.Alamat, PhoneNumber: data?.Telepon });
        });
      }
    );

    //
  };

  HandleSave = () => {
    // console.log(this.props);

    const db = getDatabase();
    set(ref(db, "users/" + this.state.userID), {
      Nama: this.state.FullName,
      Email: this.state.Email,
      Telepon: this.state.PhoneNumber,
      Alamat: this.state.Address,
      Profile_Picture: this.state.Photo,
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

    //

    updateProfile(auth.currentUser, {
      displayName: this.state.FullName,
      photoURL: this.state.Photo,
    }).then(() => {
      CheckCurrentUser();
    });

    // this.props.navigation.navigate("Dashboard");
  };

  handleBackButton = () => {
    console.log(this.props);
    // this.props.navigation.goBack();
    this.props.navigation.navigate("Dashboard");
    //
    // this.props.navigation.popToTop();
    // this.props.navigation.canGoBack();
    // const navi = (routeBack) => {

    // this.props.navigation.navigate(routeBack);
    // };
    // return true;
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.containerProfile}>
          <Image source={BackGound} style={{ width: "100%", height: 150 }} />
          <Image
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/kedasi.appspot.com/o/profile%2Fdawdawdawd.jpg?alt=media&token=722cff58-6df1-48dc-b6dd-ff006bedb213",
            }}
            style={styles.photoProfile}
          />
          <Text style={{ marginTop: 65, marginBottom: 20 }}>
            {this.state.FullName}
          </Text>
          <TextInput
            placeholder="Name"
            style={[styles.input]}
            value={this.state.FullName}
            onChangeText={(value) => this.setState({ FullName: value })}
          />
          <TextInput
            placeholder="Email"
            style={[styles.input]}
            value={this.state.Email}
            onChangeText={(value) => this.setState({ Email: value })}
            editable={false}
          />
          <TextInput
            placeholder="Phone Number"
            keyboardType="number-pad"
            style={[styles.input]}
            value={this.state.PhoneNumber}
            onChangeText={(value) => this.setState({ PhoneNumber: value })}
          />
          <TextInput
            placeholder="Address"
            style={[styles.inputAddress]}
            value={this.state.Address}
            onChangeText={(value) => this.setState({ Address: value })}
          />

          <View style={styles.containerFooter}>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={[
                  styles.containerButton,
                  { marginRight: 5, backgroundColor: "#007BFF" },
                ]}
                onPress={this.HandleSave}
              >
                <Text style={[styles.TxtButton, { color: "white" }]}>SAVE</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.containerButton, { backgroundColor: "#FFC107" }]}
                onPress={() => this.props.navigation.navigate("Dashboard")}
              >
                <Text style={styles.TxtButton}>CANCEL</Text>
              </TouchableOpacity>
            </View>

            <View style={{ width: "45%", flexDirection: "row-reverse" }}>
              <TouchableOpacity
                style={[styles.containerButton, { backgroundColor: "#28A745" }]}
                onPress={() => this.props.navigation.navigate("ForgotPassword")}
              >
                <Text style={styles.TxtBtnChangePassword}>Change Password</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ dataPengguna }) => ({
  // globalState: dataPengguna,
  dataPengguna,
});

export default connect(mapStateToProps)(Profile);

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
    position: "absolute",
    top: 65,
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
});
