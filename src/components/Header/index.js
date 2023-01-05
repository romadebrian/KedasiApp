import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDatabase, ref, onValue } from "firebase/database";

import NotifService from "../../config/Notification/NotifService";

import Bars from "../../assets/img/bars-solid.png";
import Bel from "../../assets/img/bell-regular.png";

const Header = (props) => {
  var Navigation = props.navigation;
  const dataPengguna = useSelector((state) => state.dataPengguna);
  const globalState = useSelector((state) => state.someGlobalData);
  // const dispatch = useDispatch();

  const [registerToken, setRegisterToken] = useState("");
  const [fcmRegistered, setFcmRegistered] = useState(false);
  const [notificationCount, setNotificationCount] = useState("");

  useEffect(() => {
    // console.log(props);
    // console.log(Navigation);
    handleGetListNotification();
  }, []);

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

  const handleGetListNotification = () => {
    const userID = dataPengguna.uid;

    const db = getDatabase();

    const starCountRef = ref(db, `users/${userID}/notifikasi`);
    onValue(starCountRef, async (snapshot) => {
      // const ListT = [];
      let i = 0;
      if (snapshot.exists()) {
        Object.keys(snapshot.val()).map((key) => {
          if (snapshot.val()[key].Status === "Unread") {
            i++;
            setNotificationCount(i);
            // console.log(i);
          } else {
            setNotificationCount(0);
          }
        });
      } else {
        console.log("No Notification");
      }
    });
  };

  return (
    <>
      <View style={[styles.header, styles.shadow]}>
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
          <Text style={{ fontSize: 14, fontWeight: "500" }}>
            {globalState.curentPage}
          </Text>
        </View>
        <View style={styles.containerBel}>
          <TouchableOpacity
            style={{ flexDirection: "row-reverse" }}
            onPress={() => Navigation.navigate("Notification")}
          >
            <Image source={Bel} style={styles.iconLonceng} />
            {notificationCount <= 0 ? null : (
              <Text style={styles.TextLonceng}>{notificationCount}</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </>
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
  shadow: {
    borderBottomColor: "#b8b8b8",
    borderBottomWidth: 1,
    // overflow: "hidden",
    shadowColor: "#b8b8b8",
    shadowRadius: 10,
    shadowOpacity: 1,
  },
});
