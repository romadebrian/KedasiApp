import { StyleSheet, BackHandler, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import CardItemTransaction from "./component/CardItemTransaction";

const TransactionList = ({ navigation }) => {
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    if (!isLoad) {
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

  return (
    <ScrollView>
      <CardItemTransaction />
    </ScrollView>
  );
};

export default TransactionList;

const styles = StyleSheet.create({});
