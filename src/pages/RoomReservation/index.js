import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";

import Casual from "./component/Casual";
import Monthly from "./component/Monthly";
import { useFocusEffect } from "@react-navigation/native";

const RoomReservation = ({ navigation }) => {
  const [typeMenu, setTypeMenu] = useState("Casual");
  const [txtCasual, setTxtCasual] = useState("#007BFF");
  const [txtMonthly, setTxtMonthly] = useState("black");
  const [locLineMenu, setLocLineMenu] = useState(35);

  useEffect(() => {
    if (typeMenu === "Casual") {
      setLocLineMenu(35);
      setTxtCasual("#007BFF");
      setTxtMonthly("black");
    } else {
      setLocLineMenu(105);
      setTxtCasual("black");
      setTxtMonthly("#007BFF");
    }

    const backAction = () => {
      navigation.navigate("Dashboard");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [typeMenu]);

  useFocusEffect(
    useCallback(() => {
      // console.log(navigation);
    })
  );

  return (
    <View style={styles.container}>
      <View style={styles.containerTypeMenu}>
        <View style={styles.rowMenu}>
          <TouchableOpacity onPress={() => setTypeMenu("Casual")}>
            <Text
              style={{
                color: txtCasual,
                fontSize: 14,
                fontWeight: "600",
              }}
            >
              Casual
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setTypeMenu("Monthly")}>
            <Text
              style={{
                marginLeft: 25,
                color: txtMonthly,
                fontSize: 14,
                fontWeight: "600",
              }}
            >
              Monthly
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: 70,
            height: 1,
            backgroundColor: "#007BFF",
            marginLeft: locLineMenu,
            marginTop: 10,
          }}
        />
      </View>

      {typeMenu === "Casual" ? (
        <Casual nav={navigation} />
      ) : typeMenu === "Monthly" ? (
        <Monthly nav={navigation} />
      ) : null}
    </View>
  );
};

export default RoomReservation;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FEF7EF",
    alignItems: "center",
    // height: '100%',
    flex: 1,
  },
  containerTypeMenu: {
    width: "100%",
    height: 50,
    backgroundColor: "white",
    justifyContent: "center",
  },
  rowMenu: {
    marginLeft: 50,
    alignItems: "center",
    flexDirection: "row",
  },
});
