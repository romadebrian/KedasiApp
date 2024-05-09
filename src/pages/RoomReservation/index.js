import * as React from "react";
import { View, useWindowDimensions, StyleSheet } from "react-native";
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
