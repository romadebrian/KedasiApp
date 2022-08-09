import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { Component } from "react";

import Casual from "./component/Casual";
import Monthly from "./component/Monthly";

export default class RoomReservation extends Component {
  state = {
    typeMenu: "Casual",
    txtCasual: "#007BFF",
    txtMonthly: "black",
    locLineMenu: 35,
  };

  componentDidMount() {
    // console.log(this.props);

    if (this.state.typeMenu === "Casual") {
      this.setState({
        typeMenu: "Casual",
        locLineMenu: 35,
        txtCasual: "#007BFF",
        txtMonthly: "black",
      });
    } else {
      this.setState({
        typeMenu: "Monthly",
        locLineMenu: 105,
        txtCasual: "black",
        txtMonthly: "#007BFF",
      });
    }
  }

  handleMenuCasual = () => {
    this.setState({
      typeMenu: "Casual",
      locLineMenu: 35,
      txtCasual: "#007BFF",
      txtMonthly: "black",
    });
  };

  handleMenuMonthly = () => {
    this.setState({
      typeMenu: "Monthly",
      locLineMenu: 105,
      txtCasual: "black",
      txtMonthly: "#007BFF",
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerTypeMenu}>
          <View style={styles.rowMenu}>
            <TouchableOpacity onPress={this.handleMenuCasual}>
              <Text
                style={{
                  color: this.state.txtCasual,
                  fontSize: 14,
                  fontWeight: "600",
                }}
              >
                Casual
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.handleMenuMonthly}>
              <Text
                style={{
                  marginLeft: 25,
                  color: this.state.txtMonthly,
                  fontSize: 14,
                  fontWeight: "600",
                }}
              >
                Monthly
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: 70,
              height: 1,
              backgroundColor: "#007BFF",
              marginLeft: this.state.locLineMenu,
              marginTop: 10,
            }}
          />
        </View>

        {this.state.typeMenu === "Casual" ? (
          <Casual nav={this.props.navigation} />
        ) : this.state.typeMenu === "Monthly" ? (
          <Monthly nav={this.props.navigation} />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FEF7EF",
    alignItems: "center",
    // height: '100%',
    flex: 1,
  },
  containerTypeMenu: {
    width: "100%",
    height: 50,
    backgroundColor: "white",
    justifyContent: "center",
  },
  rowMenu: {
    marginLeft: 50,
    alignItems: "center",
    flexDirection: "row",
  },
});
