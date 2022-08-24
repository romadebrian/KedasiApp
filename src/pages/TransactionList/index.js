import { StyleSheet, BackHandler, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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

const TransactionList = ({ navigation }) => {
  const globalState = useSelector((state) => state.dataPengguna);

  const [isLoad, setIsLoad] = useState(false);
  const [listTransaction, setListTransaction] = useState("");

  useEffect(() => {
    console.log(listTransaction);
    if (!isLoad) {
      handleGetListTransaction();
      setIsLoad(true);
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
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setIsLoad(false);
    });
    return unsubscribe;
  }, [navigation]);

  const handleGetListTransaction = async () => {
    const userID = globalState.uid;
    // const resultDatabase = []; // Must place in here for get real time data
    const ListT = ["122", "123"];

    const db = getDatabase();
    const orderRef = ref(db, "users/" + userID + "/order");

    // try {
    //   const ListT = [];
    //   const dbRef = ref(getDatabase());
    //   get(child(dbRef, `users/${userID}/order`))
    //     .then((snapshot) => {
    //       if (snapshot.exists()) {
    //         Object.keys(snapshot.val()).map((key) => {
    //           ListT.push(snapshot.val()[key].OrderId);

    //           console.log(ListT);
    //           console.log(snapshot.val()[key]);

    //           console.log(ListT);
    //           ListT.map((OrdId) => {
    //             console.log("Mapping", OrdId);

    //             const DetailOrder = query(
    //               ref(db, "order"),
    //               orderByChild("OrderId"),
    //               equalTo(OrdId)
    //             );

    //             get(child(DetailOrder)).then((result) => {
    //               console.log("result", result);
    //             });
    //           });
    //         });
    //       } else {
    //         console.log("No data available");
    //       }
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <ScrollView>
      <CardItemTransaction />
    </ScrollView>
  );
};

export default TransactionList;

const styles = StyleSheet.create({});
