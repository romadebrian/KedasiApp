import React, { useCallback, useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  ToastAndroid,
  RefreshControl,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import { getDatabase, ref, onValue } from "firebase/database";

import { useSelector } from "react-redux";
import CardItem from "./CardItem";

import store from "../../config/redux";
import { setCurentPage } from "../../config/someGlobalData";

const Dashboard = ({ navigation }) => {
  const globalState = useSelector((state) => state.dataPengguna);
  const [isLoad, setIsLoad] = useState(false);
  const [countBack, setCountBack] = useState(1);
  const [listTransaction, setListTransaction] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    if (isLoad === false) {
      handleGetListOrder();
      setIsLoad(true);
    }

    const unsubscribe = navigation.addListener("focus", () => {
      setIsLoad(false);
      setCountBack(1);
      // console.log("Unsubscribe", countBack);
    });

    return unsubscribe;
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      store.dispatch(setCurentPage("Dashboard"));
      // console.log("log Dashboard globalState", globalState);

      if (currentUser !== globalState.uid) {
        handleGetListOrder();
        setCurrentUser(globalState.uid);
      }

      BackHandler.addEventListener("hardwareBackPress", () =>
        handleBackButton()
      );

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", () =>
          handleBackButton()
        );
      };
    })
  );

  const handleBackButton = () => {
    if (countBack > 0) {
      // console.log(this.state.countBack);
      setCountBack(countBack - 1);
      ToastAndroid.show("Press back again to exit", ToastAndroid.SHORT);
    } else {
      BackHandler.exitApp();
    }

    return true;
  };

  const handleGetListOrder = async () => {
    const userID = globalState.uid;

    var ListOrder = "";

    const db = getDatabase();

    const starCountRef = ref(db, `users/${userID}/order`);
    onValue(starCountRef, async (snapshot) => {
      const Data = [];
      if (snapshot.exists()) {
        Object.keys(snapshot.val()).map((key) => {
          Data.push(snapshot.val()[key].OrderId);

          // console.log(Data);
          // console.log(snapshot.val()[key]);
        });

        setListTransaction(Data);
        ListOrder = Data;
      } else {
        console.log("No order found");
        setListTransaction(Data);
      }

      // console.log(Data);
      return Data;
    });

    return ListOrder;
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await handleGetListOrder().then((res) => {
      if (res) {
        setRefreshing(false);
      }
    });
  }, []);

  return (
    <View style={{ backgroundColor: "#FEF7EF", height: "100%", width: "100%" }}>
      {/* List Order */}
      <ScrollView
        style={{ position: "relative" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          {listTransaction.length > 0 ? (
            listTransaction.map((IDOrder) => {
              // console.log(IDRoom);
              return (
                <CardItem
                  key={IDOrder}
                  IDOrder={IDOrder}
                  navigation={navigation}
                />
              );
            })
          ) : (
            <TouchableOpacity
              onPress={() => navigation.navigate("RoomReservation")}
              style={{ width: "85%" }}
            >
              <View
                style={[
                  styles.ContainerItemUnorder,
                  styles.shadow,
                  { backgroundColor: "#6C757D" },
                ]}
              >
                <Text style={[styles.TitleItem, { color: "white" }]}>
                  You don't have orders
                </Text>
                <Text style={[styles.DetailItem, { color: "white" }]}>
                  Order Now
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

mapStateToProps = (state) => {
  // console.log(state);
  return {
    GlobalUserData: state.userData,
  };
};

export default Dashboard;

const styles = StyleSheet.create({
  ContainerItem: {
    // width: 300,
    // height: 150,
    borderRadius: 10,
    marginTop: 10,
  },
  ContainerItemUnorder: {
    // width: "100%",
    // height: 100,
    paddingBottom: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  TitleItem: {
    marginTop: 11,
    marginLeft: 13,
    fontFamily: "Poppins",
    fontSize: 13,
    fontWeight: "bold",
    // color: 'white',
  },
  DetailItem: {
    marginTop: 23,
    marginLeft: 13,
    fontFamily: "Poppins",
    fontSize: 16,
    fontWeight: "400",
    // color: 'white',
  },
  DetailTimeItem: {
    marginTop: 13,
    marginLeft: 13,
    fontFamily: "Poppins",
    fontSize: 12,
    fontWeight: "400",
    // color: 'white',
  },
  shadow: {
    borderColor: "#b8b8b8",
    borderWidth: 3,
    overflow: "hidden",
    shadowColor: "#b8b8b8",
    shadowRadius: 10,
    shadowOpacity: 1,
  },
});
