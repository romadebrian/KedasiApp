import { StyleSheet, BackHandler, ScrollView, View, Text } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import {
  getDatabase,
  ref,
  onValue,
  orderByChild,
  equalTo,
  get,
  query,
  child,
} from "firebase/database";

import CardItemTransaction from "./component/CardItemTransaction";
import { async } from "@firebase/util";

const TransactionList = ({ navigation }) => {
  const globalState = useSelector((state) => state.dataPengguna);

  const [isLoad, setIsLoad] = useState(false);
  const [listTransaction, setListTransaction] = useState([]);

  useFocusEffect(
    useCallback(() => {
      console.log(listTransaction);
      if (!isLoad) {
        console.log("Is Load");
        handleGetListTransaction();

        setIsLoad(true);
      }

      const backAction = () => {
        navigation.navigate("Dashboard");
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", backAction);

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", backAction);
      };
    })
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setIsLoad(false);
    });
    return unsubscribe;
  }, [navigation]);

  const handleGetListTransaction = () => {
    const userID = globalState.uid;
    var ListO = "";

    const db = getDatabase();

    const starCountRef = ref(db, `users/${userID}/order`);
    onValue(starCountRef, async (snapshot) => {
      const ListT = [];
      if (snapshot.exists()) {
        Object.keys(snapshot.val()).map((key) => {
          ListT.push(snapshot.val()[key].OrderId);

          // console.log(ListT);
          console.log(snapshot.val()[key]);
        });

        setListTransaction(ListT);
        ListO = ListT;
      } else {
        console.log("No data available");
      }

      console.log(ListT);
      return ListT;
    });

    return ListO;
  };

  return (
    <ScrollView>
      {/* {console.log(listTransaction)} */}
      {listTransaction.length > 0
        ? listTransaction.map((roomData) => {
            console.log(roomData);
            return (
              <View key={roomData}>
                <CardItemTransaction IDorder={roomData} />
                {/* <Text>{roomData}</Text> */}
              </View>
            );
          })
        : null}

      {/* {listTransaction.map((orderId) => {
        console.log(orderId);

        // const resultDatabase = [];
        var dataRoom = null;

        console.log(orderId);
        const db = getDatabase();
        const DetailOrder = query(
          ref(db, "order"),
          orderByChild("OrderId"),
          equalTo(orderId)
        );

        onValue(DetailOrder, (snapshot2) => {
          Object.keys(snapshot2.val()).map((key) => {
            // resultDatabase.push(snapshot2.val()[key]);

            dataRoom = snapshot2.val()[key];
            console.log(snapshot2.val()[key]);

            // return resultDatabase;
          });
          console.log("dataRoom", dataRoom?.OrderId);
        });

        // console.log("dataRoom", dataRoom?.OrderId);
        // setListTransaction(resultDatabase);

        return (
          <View key={orderId}>
            <CardItemTransaction />
            <Text>{dataRoom?.Ruangan}</Text>
          </View>
        );
      })} */}

      {/* <CardItemTransaction /> */}
    </ScrollView>
  );
};

export default TransactionList;

const styles = StyleSheet.create({});
