import { Text, StyleSheet, View, Image } from "react-native";
import React, { Component } from "react";

import Logo from "../../assets/img/Logo&Name.png";

export default class SplashScreen extends Component {
  state = {
    status: 0,
    widthLoading: 0,
  };
  componentDidMount() {
    // console.log(this.props);

    var i = 1;

    const goToLogin = () => {
      this.props.navigation.navigate("Login");
    };

    const myLoop = () => {
      this.setState({
        status: this.state.status + 1,
        widthLoading: this.state.widthLoading + 2,
      });
      // console.log("State Log", this.state.widthLoading);
      setTimeout(function () {
        // console.log("hello", i);
        i++;
        if (i < 101) {
          myLoop();
        } else {
          goToLogin();
          // console.log("Navigate");
        }
      }, 0);
    };

    myLoop();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <Image source={Logo} style={styles.logoKedasi} />
          <Text style={{ marginTop: 50 }}>Loading {this.state.status}%</Text>
          <View style={{ width: 200 }}>
            <View
              style={[styles.loading, { width: this.state.widthLoading }]}
            />
          </View>
        </View>
      </View>
    );
  }
}

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
