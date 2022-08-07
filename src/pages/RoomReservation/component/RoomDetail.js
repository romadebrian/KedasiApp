import { Text, StyleSheet, View, ScrollView } from "react-native";
import React, { Component } from "react";
import DetaillRoom from "../../../components/DetailRoom";

export default class RoomDetail extends Component {
  render() {
    return (
      <ScrollView style={{ backgroundColor: "#FEF7EF" }}>
        <Text>RoomDetail</Text>
        <DetaillRoom />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({});
