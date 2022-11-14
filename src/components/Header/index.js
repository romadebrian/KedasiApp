import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import NotifService from "../../config/Notification/NotifService";

import Bars from "../../assets/img/bars-solid.png";
import Bel from "../../assets/img/bell-regular.png";

const Header = (props) => {
  var Navigation = props.navigation;
  const dispatch = useDispatch();

  const [registerToken, setRegisterToken] = useState("");
  const [fcmRegistered, setFcmRegistered] = useState(false);

  useEffect(() => {
    // console.log(props);
    // console.log(Navigation);
  });

  const handleClickBell = () => {
    // dispatch({ type: "SET_NAME" });
  };

  // Notification System
  const onRegister = (token) => {
    setRegisterToken(token.token);
    setFcmRegistered(true);
  };

  const onNotif = (notif) => {
    console.log("Notif Value", notif);
    // Alert.alert(notif.title, notif.message);
    handleCreateNotification(notif.title, notif.message, notif.data);
  };

  const notif = new NotifService(onRegister, onNotif);

  const handleCreateNotification = (ValTitle, ValMessage, Data) => {
    // console.log(Data);
    notif.localNotif(ValTitle, ValMessage, Navigation, Data);
    // notif.handleNav(Navigation);
  };

  return (
    <View style={styles.header}>
      <View style={styles.containerBtnMenu}>
        <TouchableOpacity
          onPress={props.showMenu}
          onPressIn={() => Navigation.openDrawer()}
        >
          <Image
            source={Bars}
            style={{ width: 20, height: 20, marginLeft: 12, marginRight: 10 }}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 14, fontWeight: "500" }}>Message</Text>
      </View>
      <View style={styles.containerBel}>
        <TouchableOpacity
          style={{ flexDirection: "row-reverse" }}
          onPress={handleClickBell}
        >
          <Image source={Bel} style={styles.iconLonceng} />
          <Text style={styles.TextLonceng}>99</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    // width: '100%',
    // height: 50,
    backgroundColor: "#FEF7EF",
    flexDirection: "row",
    // justifyContent: 'center',
  },
  containerBel: {
    //   backgroundColor: 'blue',
    flex: 1,
    height: 50,
    justifyContent: "center",
  },
  containerBtnMenu: {
    //   backgroundColor: 'green',
    flex: 1,
    height: 50,
    alignItems: "center",
    flexDirection: "row",
  },
  iconLonceng: {
    width: 20,
    height: 20,
    marginEnd: 20,
    resizeMode: "stretch",
  },
  TextLonceng: {
    width: 16,
    height: 13,
    fontSize: 10,
    backgroundColor: "rgba(255, 193, 7, 0.7)",
    //   padding: 4,
    textAlign: "center",
    borderRadius: 5,
    position: "absolute",
    bottom: 15,
    left: 12,
    fontFamily: "Poppins",
    fontWeight: "bold",
  },
});
