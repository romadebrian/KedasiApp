import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";

const DetaillRoom = (props) => {
  useEffect(() => {
    console.log(props);
  });
  var img =
    props.img === "room1"
      ? require("../../assets/img/room1.jpg")
      : props.img === "room2"
      ? require("../../assets/img/room2.jpg")
      : props.img === "room3"
      ? require(`../../assets/img/room3.jpg`)
      : null;
  return (
    <View>
      <Image
        source={img}
        style={{ width: "100%", height: 200, resizeMode: "stretch" }}
      />
      <View style={styles.containerHead}>
        <Text style={styles.TxtHeadTitle}>{props.title}</Text>
        <Text style={styles.TxtSubHeadTitle}>Kedasi coworking space</Text>
      </View>

      <View style={styles.containerDetailRoom}>
        <Text style={[styles.TxtTitle, { marginTop: 10 }]}>Detail</Text>
        <Text style={{ marginBottom: 10 }}>{props.desc}</Text>

        <View style={{ marginBottom: 15 }}>
          <Text style={styles.TxtTitle}>Capacity</Text>
          <View style={{ flexDirection: "row", marginTop: 5 }}>
            <Image
              source={require("../../assets/icon/user-group-solid.png")}
              style={{ width: 25, height: 25 }}
            />
            <Text style={{ marginLeft: 10, fontFamily: "Poppins" }}>
              Maximum for {props.people} people
            </Text>
          </View>
        </View>
        <View style={{ marginBottom: 15 }}>
          <Text style={styles.TxtTitle}>Additional Benefits</Text>
          <View style={{ flexDirection: "row", marginTop: 5 }}>
            <Image
              source={require("../../assets/icon/id-card-clip-solid.png")}
              style={{ width: 25, height: 25 }}
            />
            <Text style={{ marginLeft: 10, fontFamily: "Poppins" }}>
              Access Card
            </Text>
          </View>
        </View>
        <View style={{ marginBottom: 15 }}>
          <Text style={styles.TxtTitle}>General Regulation</Text>
          <View style={{ flexDirection: "row", marginTop: 5 }}>
            <Image
              source={require("../../assets/icon/ban-smoking-solid.png")}
              style={{ width: 25, height: 25 }}
            />
            <Text style={{ marginLeft: 10, fontFamily: "Poppins" }}>
              No smoking
            </Text>
          </View>
        </View>
        <View style={{ marginBottom: 15 }}>
          <Text style={styles.TxtTitle}>Operational Schedule</Text>
          <View style={{ flexDirection: "row", marginTop: 5 }}>
            <Image
              source={require("../../assets/icon/clock-solid.png")}
              style={{ width: 25, height: 25 }}
            />
            <Text style={{ marginLeft: 10, fontFamily: "Poppins" }}>
              Weekdays 08:00 - 20:00
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.containerButton}
          onPress={() => props.nav.navigate("CheckOut")}
        >
          <Text style={styles.TxtButton}>Book now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetaillRoom;

const styles = StyleSheet.create({
  containerHead: {
    width: "100%",
    height: 60,
    backgroundColor: "white",
  },
  TxtHeadTitle: {
    marginTop: 10,
    marginLeft: 25,
    fontSize: 15,
    fontWeight: "bold",
  },
  TxtSubHeadTitle: {
    marginTop: 5,
    marginLeft: 25,
    fontSize: 10,
    fontWeight: "bold",
  },

  containerDetailRoom: {
    marginTop: 10,
    paddingHorizontal: 25,
    backgroundColor: "white",
  },
  TxtTitle: {
    fontSize: 15,
    fontWeight: "bold",
    fontFamily: "Poppins",
  },
  containerButton: {
    width: 300,
    height: 50,
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: "#4099f7",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  TxtButton: {
    fontFamily: "Poppins",
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
});
