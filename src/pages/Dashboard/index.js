import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  ToastAndroid,
} from "react-native";
import React, { Component, useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { useSelector, connect } from "react-redux";

import { auth } from "../../config/firebase";

import Header from "../../components/Header";
import SideNav from "../../components/SideNav";

const Dashboard = ({ navigation }) => {
  // globalState = useSelector((state) => state);
  // navigation = this.props.navigation;
  const [isLoad, setIsLoad] = useState(false);
  const [countBack, setCountBack] = useState(1);

  useEffect(() => {
    if (isLoad === false) {
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
      // console.log(globalState);
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

  return (
    <View style={{ backgroundColor: "#FEF7EF", height: "100%", width: "100%" }}>
      {/* List Order */}
      <ScrollView style={{ position: "relative" }}>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("CheckOut", { orderID: "ORD0035" })
            }
          >
            <View
              style={[
                styles.ContainerItem,
                styles.shadow,
                { backgroundColor: "#28A745" },
              ]}
            >
              <Text style={[styles.TitleItem, { color: "white" }]}>
                Active Orders
              </Text>
              <Text style={[styles.DetailItem, { color: "white" }]}>
                ROOM 001 MONTHLY 50 HOURS
              </Text>
              <Text style={[styles.DetailTimeItem, { color: "white" }]}>
                1/01/2022 - 30/12/2022
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={[
                styles.ContainerItem,
                styles.shadow,
                { backgroundColor: "#FFC107" },
              ]}
            >
              <Text style={[styles.TitleItem, { color: "black" }]}>
                Unpaid Orders
              </Text>
              <Text style={[styles.DetailItem, { color: "black" }]}>
                ROOM 001 MONTHLY 50 HOURS
              </Text>
              <Text style={[styles.DetailTimeItem, { color: "black" }]}>
                Payment Due : 30/12/2022
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
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
  ////////////////////
  //   Item Order
  ////////////////////
  ContainerItem: {
    width: 300,
    height: 150,
    borderRadius: 10,
    marginTop: 10,
  },
  ContainerItemUnorder: {
    width: 300,
    height: 100,
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
