import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
// import { useSelector } from "react-redux/es/exports";
import { useSelector } from "react-redux";

import LogoNama from "../../assets/img/logo-header-putih.png";
import ExampleProfilePicture from "../../assets/img/romadebrian.png";
import IconBook from "../../assets/icon/book.png";
import IconList from "../../assets/icon/list-solid.png";
import IconBel from "../../assets/icon/bell-solid-full.png";
import IconChat from "../../assets/icon/chatting.png";
import IconLogout from "../../assets/icon/SignOut.png";

const SideNav = (props) => {
  var Nav = props.navigation;

  const globalState = useSelector((state) => state);

  useEffect(() => {
    // console.log(props);
  });

  return (
    <View style={styles.ContainerSideNav}>
      <TouchableOpacity onPress={() => Nav.navigate("Dashboard")}>
        <Image
          source={LogoNama}
          style={{ width: 250, height: 55, marginVertical: 20 }}
        />
      </TouchableOpacity>

      <View style={{ backgroundColor: "white", width: "100%", height: 1 }} />

      <TouchableOpacity
        style={styles.ContainerProfile}
        onPress={() => Nav.navigate("Profile")}
      >
        <Image
          source={ExampleProfilePicture}
          style={{ width: 50, height: 50, borderRadius: 25 }}
        />
        <Text style={styles.TxtProfile}>{globalState.name}</Text>
      </TouchableOpacity>

      <View
        style={{
          backgroundColor: "white",
          width: "100%",
          height: 1,
          marginBottom: 10,
        }}
      />

      <TouchableOpacity
        style={[styles.ContainerItemMenu, { backgroundColor: "#007BFF" }]}
        onPress={() => Nav.navigate("RoomReservation")}
      >
        <Image
          source={IconBook}
          style={{
            width: 25,
            height: 25,
            marginLeft: 15,
            resizeMode: "stretch",
          }}
        />
        <Text style={styles.TxtItemMenu}>Room Reservation</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.ContainerItemMenu}
        onPress={() => alert("Transaction List Page Not Found")}
      >
        <Image
          source={IconList}
          style={{ width: 25, height: 20, marginLeft: 15 }}
        />
        <Text style={styles.TxtItemMenu}>Transaction List</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.ContainerItemMenu}
        onPress={() => alert("Notification List Page Not Found")}
      >
        <Image
          source={IconBel}
          style={{ width: 25, height: 25, marginLeft: 15 }}
        />
        <Text style={styles.TxtItemMenu}>Notification</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.ContainerItemMenu}
        onPress={() => alert("Message List Page Not Found")}
      >
        <Image
          source={IconChat}
          style={{ width: 30, height: 30, marginLeft: 15 }}
        />
        <Text style={styles.TxtItemMenu}>Message</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.ContainerItemMenu}
        onPress={() => Nav.navigate("Login")}
      >
        <Image
          source={IconLogout}
          style={{
            width: 30,
            height: 30,
            marginLeft: 15,
            resizeMode: "stretch",
          }}
        />
        <Text style={styles.TxtItemMenu}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SideNav;

const styles = StyleSheet.create({
  ContainerSideNav: {
    backgroundColor: "#664130",
    width: "100%",
    height: "100%",
    // left: 0,
    // top: 0,
    position: "absolute",
    alignItems: "center",
  },
  ContainerProfile: {
    flexDirection: "row",
    marginVertical: 13,
    width: "100%",
    marginLeft: 60,
    alignItems: "center",
  },
  TxtProfile: {
    marginLeft: 12,
    color: "white",
    fontFamily: "Poppins",
    fontSize: 20,
    fontWeight: "700",
  },
  ContainerItemMenu: {
    marginTop: 10,
    width: 250,
    height: 45,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  TxtItemMenu: {
    color: "white",
    marginLeft: 10,
    fontFamily: "Poppins",
    fontSize: 16,
    fontWeight: "bold",
  },
});
