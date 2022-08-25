import { StyleSheet, BackHandler, ScrollView, View, Text } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { getDatabase, ref, onValue } from "firebase/database";

import CardItemTransaction from "./component/CardItemTransaction";

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
                <CardItemTransaction
                  IDorder={roomData}
                  navigation={navigation}
                />
                {/* <Text>{roomData}</Text> */}
              </View>
            );
          })
        : null}
    </ScrollView>
  );
};

export default TransactionList;

const styles = StyleSheet.create({});
