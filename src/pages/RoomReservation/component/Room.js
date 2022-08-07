import { Text, StyleSheet, View, ScrollView } from "react-native";
import React, { Component } from "react";
import CardRoom from "../../../components/CardRoom";

export default class Room extends Component {
  render() {
    return (
      <ScrollView style={{ backgroundColor: "#FEF7EF" }}>
        <CardRoom
          img="room1"
          title="Shared Office Desk"
          desc="Shared office room with sitting position facing each other"
          people="6"
        />
        <CardRoom
          img="room2"
          title="Shared Office Desk"
          desc="Office by sitting facing the wall"
          people="4"
        />
        <CardRoom
          img="room3"
          title="Shared Office Desk"
          desc="Aesthetic office space"
          people="5"
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({});
