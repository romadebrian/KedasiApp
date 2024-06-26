import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  BackHandler,
  Alert,
  ToastAndroid,
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
  const [selectedDate, setselectedDate] = useState(new Date());
  const [duration, setDuration] = useState("1");
  // const [endDate, setEndDate] = useState();
  // const [avaliableRoom, setAvaliableRoom] = useState();

  useEffect(() => {
    // console.log(route);
    // console.log(selectedDate);
    // console.log("avaliableRoom", avaliableRoom);

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
    // else if (selectedDate < new Date()) {
    //   Alert.alert("Faill", "the date has passed", [{ text: "OK" }]);
    // }
    else {
      ToastAndroid.show("Searching...", ToastAndroid.SHORT);
      //////////////////// Formating Finish Date ////////////////////
      // var EndOfDate = new Date(
      //   "Fri Jul 1 2023 00:00:00 GMT+0700 (Western Indonesia Time)"
      // );

      var PickerDate = new Date(selectedDate);

      let totDuration = Number(duration); //convert string to number
      var EndOfDate = null;

      if (
        route.params.type === "Casual 1" ||
        route.params.type === "Casual 2" ||
        route.params.type === "Casual 3"
      ) {
        EndOfDate = PickerDate;
        console.log("Perjam/Perhari");
      } else {
        EndOfDate = new Date(
          new Date(PickerDate).setMonth(PickerDate.getMonth() + totDuration)
        );
      }

      let ResultDateAfterIncresed = EndOfDate;
      // setEndDate(EndOfDate);

      console.log("Result Date After Incresed", ResultDateAfterIncresed);

      //////////////////// Check one by one with looping////////////////////
      var i = 0;
      var r = 6; // total room 005
      const avalRoom = [];

      do {
        console.log("============== Ruangan", i);

        //////////////////// Colect data from firebase ////////////////////
        var Room = `ROOM 00${i}`;

        const db = getDatabase();
        const DetailOrder = query(
          ref(db, "order"),
          orderByChild("Ruangan"),
          equalTo(Room)
        );

        var ListOrder = [];
        await get(DetailOrder).then((snapshot) => {
          console.log("snapshot.exists", snapshot.val());
          if (snapshot.exists()) {
            snapshot.forEach((childsnapshot) => {
              if (
                childsnapshot.val().Status !== "Batal" &&
                childsnapshot.val().Status !== "Selesai"
              ) {
                // console.log("snapshot.forEach", childsnapshot.val().Status);
                ListOrder.push(childsnapshot.val());
              }

              // console.log("snapshot.forEach", ListOrder);
              // console.log("snapshot.forEach", childsnapshot.val().Status);
            });

            console.log("ListOrder", ListOrder);

            if (ListOrder.length > 0) {
              ///// Check Status Avaliable /////
              var i2 = 0;
              var statusAvaliable = true;
              // console.log(ListOrder.length);
              do {
                console.log("Order", i2);
                console.log("OrderID", ListOrder[i2]?.OrderId);
                console.log("TanggalSewa", ListOrder[i2].TanggalSewa);
                console.log("TanggalSelesai", ListOrder[i2].TanggalSelesai);

                var ConvertBookingDate = new Date(ListOrder[i2].TanggalSewa);
                var ConvertDueDate = new Date(ListOrder[i2].TanggalSelesai);

                // if Pick Date in inside booking start to booking end from Database order
                var result1 =
                  selectedDate >= ConvertBookingDate &&
                  selectedDate <= ConvertDueDate;

                // If Database Booking Date inside of pinck date start and end
                var result2 =
                  ConvertBookingDate >= selectedDate &&
                  ConvertBookingDate <= ResultDateAfterIncresed;

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
              statusAvaliable ? avalRoom.push(Room) : null; // if status avaliable true, add this room for send to list room avaliable
            }
          } else {
            // if no transaction found, room code will push in avaliable room immediately
            console.log("No transactions");
            avalRoom.push(Room);
          }

          // console.log(ListOrder);
        });

        console.log("result", ListOrder);

        i++;
      } while (i < r);

      console.log(avalRoom);
      console.log("selectedDate", selectedDate);

      // console.log(avalRoom.length);
      if (avalRoom.length > 0) {
        navigation.navigate("Room", {
          DataAvalRoom: avalRoom,
          type: route.params.type,
          duration: duration,
          selectedDate: selectedDate,
          endDate: EndOfDate,
        });
      } else {
        console.log("tidak ada ruangan yang tersedia");
        ToastAndroid.show(`No Room Available`, ToastAndroid.LONG);
      }
    }
  };

  return (
    <View
      style={{
        alignItems: "center",
        // justifyContent: "center",
        backgroundColor: "#FEF7EF",
        height: "100%",
      }}
    >
      <DatePicker
        date={selectedDate}
        onDateChange={setselectedDate}
        mode="date"
        style={{ backgroundColor: "white", height: 300, marginTop: 20 }}
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
