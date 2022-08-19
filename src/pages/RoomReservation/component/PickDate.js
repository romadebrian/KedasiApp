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
  const [avaliableRoom, setAvaliableRoom] = useState([]);

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
    }
    // else if (pickDate < new Date()) {
    //   Alert.alert("Faill", "the date has passed", [{ text: "OK" }]);
    // }
    else {
      //////////////////// Check one by one with looping////////////////////
      var i = 0;
      var r = 6;

      do {
        console.log("Bagian", i);
        i++;
      } while (i < r);

      //////////////////// Colect data from firebase ////////////////////
      var Room = "ROOM 001";

      const db = getDatabase();
      const DetailOrder = query(
        ref(db, "order"),
        orderByChild("Ruangan"),
        equalTo(Room)
      );

      var ListOrder = [];
      await get(DetailOrder).then((snapshot) => {
        // console.log(snapshot);

        snapshot.forEach((childsnapshot) => {
          ListOrder.push(childsnapshot.val());

          // console.log(ListOrder[0]);
          // console.log(childsnapshot.val());
        });

        // console.log(ListOrder);
      });

      console.log("result", ListOrder);

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

      var i2 = 0;
      var statusAvaliable = true;
      // console.log(ListOrder.length);
      do {
        console.log("Bagian", i2);

        console.log("TanggalSewa", ListOrder[i2].TanggalSewa);
        console.log("TanggalSelesai", ListOrder[i2].TanggalSelesai);
        var bookingDate = ListOrder[i2].TanggalSewa;
        var dueDate = ListOrder[i2].TanggalSelesai;

        var d1 = bookingDate.split("-");
        var d2 = dueDate.split("-");

        var ConvertBookingDate = new Date(d1[2], parseInt(d1[1]) - 1, d1[0]); // -1 because months are from 0 to 11
        var ConvertDueDate = new Date(d2[2], parseInt(d2[1]) - 1, d2[0]);

        // console.log(from);

        // if Pick Date in inside booking start from Database order
        var result1 =
          pickDate >= ConvertBookingDate && pickDate <= ConvertDueDate;

        // If Database Booking Date inside of
        var result2 =
          ConvertBookingDate >= pickDate &&
          ConvertBookingDate <= DateAfterIncresed;

        // var resultStart = check1 >= from && check1 <= to;
        // var resultStart2 = from >= check1 && from <= check2;

        console.log(result1);
        console.log(result2);

        // use or (||) operator
        if (statusAvaliable === true) {
          if (result1 === true || result2 === true) {
            statusAvaliable = false;
          }
        }

        i2++;
      } while (i2 < ListOrder.length);

      console.log("statusAvaliable", statusAvaliable);
    }

    // navigation.navigate("Room");
  };

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FEF7EF",
        height: "100%",
      }}
    >
      <DatePicker
        date={pickDate}
        onDateChange={setPickDate}
        mode="date"
        style={{ backgroundColor: "white" }}
      />
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
