import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  useWindowDimensions,
  StyleSheet,
  BackHandler,
} from "react-native";

import store from "../../config/redux";
import { setCurentPage } from "../../config/someGlobalData";

import { TabView, SceneMap, TabBar } from "react-native-tab-view";

import ItemCasual from "./component/Casual";
import ItemMonthly from "./component/Monthly";

const RoomReservation = ({ navigation }) => {
  const layout = useWindowDimensions();

  const RouteCasual = () => <ItemCasual nav={navigation} />;
  const RouteMonthly = () => <ItemMonthly nav={navigation} />;

  const renderScene = SceneMap({
    casual: RouteCasual,
    monthly: RouteMonthly,
  });

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "casual", title: "Casual" },
    { key: "monthly", title: "Monthly" },
  ]);

  useEffect(() => {
    const backAction = () => {
      navigation.navigate("Dashboard");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  useFocusEffect(
    useCallback(() => {
      // console.log(navigation);
      store.dispatch(setCurentPage("Room Reservation"));
    })
  );

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "white" }}
      style={styles.tabBar}
      activeColor="#007BFF"
      inactiveColor="#b8ecf5"
      labelStyle={{ fontSize: 14, fontWeight: "bold" }}
    />
  );

  // console.log("Log Roomreservation", navigation);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
    />
  );
};

export default RoomReservation;

const styles = StyleSheet.create({
  tabBar: { backgroundColor: "white" },
});
