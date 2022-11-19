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
import React, { useEffect, useState } from "react";
import {
  getDatabase,
  ref,
  onValue,
  orderByChild,
  equalTo,
  get,
  query,
} from "firebase/database";

const CardItem = ({ IDRoom, navigation }) => {
  const [dataOrder, setDataOrder] = useState("");

  useEffect(() => {}, []);

  const handleGetDetailOrder = () => {
    const orderID = IDRoom;

    const db = getDatabase();
    const DetailOrder = query(
      ref(db, "order"),
      orderByChild("OrderId"),
      equalTo(orderID)
    );

    try {
      onValue(DetailOrder, async (snapshot) => {
        Object.keys(snapshot.val()).map((key) => {
          const resultDatabase = []; // Must place in here for get real time data
          resultDatabase.push({
            data: snapshot.val()[key],
          });

          setDataOrder(resultDatabase[0].data);
          console.log(resultDatabase[0].data);
          // console.log(snapshot.val()[key]);

          return resultDatabase;
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("CheckOut", { orderID: "ORD0038" })}
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
  );
};

export default CardItem;

const styles = StyleSheet.create({
  ContainerItem: {
    width: 300,
    // height: 150,
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
    marginBottom: 20,
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
