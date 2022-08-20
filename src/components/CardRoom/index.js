import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";

import IconPeople from "../../assets/icon/user-group-solid.png";
import IconArrow from "../../assets/icon/circle-arrow-right-solid.png";
import Room1 from "../../assets/img/room1.jpg";

const CardRoom = (props) => {
  // console.log(props.img);
  var nav = props.nav;

  useEffect(() => {
    // console.log(props);
  });

  var img =
    props.img === "room1"
      ? require("../../assets/img/room1.jpg")
      : props.img === "room2"
      ? require("../../assets/img/room2.jpg")
      : props.img === "room3"
      ? require(`../../assets/img/room3.jpg`)
      : null;

  // const handleImg = () => {
  //   return require("../../assets/img/room1.jpg");
  // };

  return (
    <View style={{ alignItems: "center", marginBottom: 15 }}>
      <TouchableOpacity
        style={styles.container}
        onPress={() => nav.navigate("RoomDetail")}
      >
        <Image
          source={img}
          style={{ width: "100%", height: 160, resizeMode: "stretch" }}
        />
        <Text style={styles.TxtTitle}>{props.title}</Text>
        <Text style={styles.TxtDesc}>{props.desc}</Text>
        <View style={styles.containerPeople}>
          <View style={{ flexDirection: "row" }}>
            <Image source={IconPeople} style={{ width: 20, height: 20 }} />
            <Text style={styles.TxtPeople}>{props.people}</Text>
          </View>
          <View style={styles.containerMoreInfo}>
            <Text style={styles.TxtMoreInfo}>More Info</Text>
            <Image source={IconArrow} style={{ width: 13, height: 13 }} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CardRoom;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: 250,
    backgroundColor: "white",
  },
  TxtTitle: {
    marginTop: 12,
    marginLeft: 15,
    fontFamily: "Poppins",
    fontSize: 14,
    fontWeight: "bold",
  },
  TxtDesc: {
    marginTop: 3,
    marginLeft: 15,
    fontFamily: "Poppins",
    fontSize: 10,
    fontWeight: "400",
  },
  containerPeople: {
    // width: '100%',
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginLeft: 15,
    // backgroundColor: 'red',
  },
  TxtPeople: {
    marginLeft: 7,
    fontFamily: "Poppins",
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  containerMoreInfo: {
    backgroundColor: "#4099f7",
    width: 88,
    height: 25,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
  },
  TxtMoreInfo: {
    color: "white",
    marginLeft: 8,
    marginRight: 4,
    fontFamily: "Poppins",
    fontSize: 12,
    fontWeight: "400",
  },
});
