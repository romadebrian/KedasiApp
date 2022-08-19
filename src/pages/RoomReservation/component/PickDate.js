import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  BackHandler,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import DatePicker from "react-native-date-picker";

import {
  getDatabase,
  ref,
  query,
  orderByChild,
  equalTo,
  get,
  child,
} from "firebase/database";

import IconSearch from "../../../assets/icon/iconsearch.png";
import { async } from "@firebase/util";

const PickDate = ({ route, navigation }) => {
  const [pickDate, setPickDate] = useState(new Date());
  const [duration, setDuration] = useState("1");

  useEffect(() => {
    console.log(route.params);
    console.log(pickDate);

    const backAction = () => {
      navigation.navigate("RoomReservation");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  });

  const HandleSearchDate = async () => {
    if (duration === "") {
      Alert.alert("Faill", "Duration can not be empty", [
        {
          text: "OK",
          onPress: () => {},
        },
      ]);
    } else if (pickDate < new Date()) {
      Alert.alert("Faill", "the date has passed", [{ text: "OK" }]);
    } else {
      //////////////////// Colect data from firebase ////////////////////
      var i = 0;
      var t = 6;

      const db = getDatabase();
      const DetailOrder = query(
        ref(db, "order"),
        orderByChild("Ruangan"),
        equalTo("ROOM 001")
      );

      var Detail = [];
      get(DetailOrder).then((snapshot) => {
        console.log(snapshot);

        snapshot.forEach((childsnapshot) => {
          Detail.push(childsnapshot.val());
        });

        console.log(Detail);
      });

      console.log("result", DetailOrder);

      // Check one by one with looping

      do {
        console.log("Bagian", i);
        i++;
      } while (i < t);

      //////////////////// Formating Finish Date ////////////////////
      // var IncreseDate = new Date(
      //   "Fri Jul 1 2023 00:00:00 GMT+0700 (Western Indonesia Time)"
      // );

      var PickerDate = new Date(pickDate);

      let totDuration = Number(duration); //convert string to number
      var IncreseDate = null;

      if (
        route.params.type === "Casual 1" ||
        route.params.type === "Casual 2" ||
        route.params.type === "Casual 3"
      ) {
        IncreseDate = PickerDate;
        console.log("Perjam/Perhari");
      } else {
        IncreseDate = new Date(
          new Date(PickerDate).setMonth(PickerDate.getMonth() + totDuration)
        );
      }

      let DateAfterIncresed = IncreseDate;

      console.log("DateAfterIncresed", DateAfterIncresed);

      var dateFrom = "01-12-2022";
      var d1 = dateFrom.split("-");
      var from = new Date(d1[2], parseInt(d1[1]) - 1, d1[0]);

      console.log(from);

      var resultStart = pickDate <= from;
      console.log(resultStart);
    }

    // navigation.navigate("Room");
  };

  return (
    <View
      style={{
        alignItems: "center",
        backgroundColor: "#FEF7EF",
        height: "100%",
      }}
    >
      <DatePicker date={pickDate} onDateChange={setPickDate} mode="date" />
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
      >
        <Text style={styles.txtDuration}>Duration</Text>
        <TextInput
          // placeholder="Date"
          defaultValue={duration}
          keyboardType="number-pad"
          maxLength={2}
          style={styles.inputDuration}
          onChangeText={setDuration}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "500",
            color: "rgba(0, 0, 0, 0.5)",
          }}
        >
          /month
        </Text>
      </View>
      <TouchableOpacity
        style={styles.containerBtnSearch}
        onPress={HandleSearchDate}
      >
        <Image source={IconSearch} style={{ width: 20, height: 20 }} />
        <Text style={styles.txtSearch}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PickDate;

const styles = StyleSheet.create({
  txtDuration: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 20,
    color: "rgba(0, 0, 0, 0.8)",
  },
  inputDuration: {
    width: 106,
    height: 42,
    marginLeft: 15,
    marginRight: 10,
    backgroundColor: "white",
    borderColor: "rgba(0, 0, 0, 0.5)",
    borderWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
    borderRightColor: "rgba(0, 0, 0, 0.10)",
    borderBottomWidth: 3,
    borderRightWidth: 2,
    textAlign: "center",
  },
  containerBtnSearch: {
    backgroundColor: "#4099f7",
    width: 200,
    height: 40,
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 42,
  },
  txtSearch: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});
