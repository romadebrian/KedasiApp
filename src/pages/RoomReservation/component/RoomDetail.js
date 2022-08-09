import { Text, StyleSheet, View, ScrollView } from "react-native";
import React, { Component } from "react";
import DetaillRoom from "../../../components/DetailRoom";

export default class RoomDetail extends Component {
  render() {
    return (
      <ScrollView style={{ backgroundColor: "#FEF7EF" }}>
        <DetaillRoom
          img="room1"
          title="Shared Office Desk"
          desc="Shared office space with a sitting position facing each other,
          equipped with electrical terminals under each table and air
          conditioning making it suitable for working with laptops."
          people="6"
          nav={this.props.navigation}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({});
