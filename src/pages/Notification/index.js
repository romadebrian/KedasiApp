import { StyleSheet, View, ScrollView, BackHandler } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import CardItemTransaction from "./component/CardItemNotification";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { getDatabase, ref, onValue } from "firebase/database";

import store from "../../config/redux";
import { setCurentPage } from "../../config/someGlobalData";

const Notification = ({ navigation }) => {
  const globalState = useSelector((state) => state.dataPengguna);

  const [isLoad, setIsLoad] = useState(false);
  const [listNotification, setListNotification] = useState([]);

  useFocusEffect(
    useCallback(() => {
      console.log(listNotification);
      if (!isLoad) {
        console.log("Is Load");
        handleGetListNotification();
        store.dispatch(setCurentPage("Notification"));
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

  const handleGetListNotification = () => {
    const userID = globalState.uid;
    var ListO = "";

    const db = getDatabase();

    const starCountRef = ref(db, `users/${userID}/notifikasi`);
    onValue(starCountRef, async (snapshot) => {
      const ListT = [];
      if (snapshot.exists()) {
        Object.keys(snapshot.val()).map((key) => {
          ListT.push({
            id: key,
            data: snapshot.val()[key],
          });

          // console.log(ListT);
          console.log(ListT);
        });

        setListNotification(ListT);
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
      {listNotification.length > 0
        ? listNotification.map((NotifikasiData) => {
            console.log(NotifikasiData);
            return (
              <View key={NotifikasiData.id}>
                <CardItemTransaction
                  IdNotifikasi={NotifikasiData.id}
                  navigation={navigation}
                  Title={NotifikasiData.data.Judul}
                  NotificationValue={NotifikasiData.data.Isi}
                  DateValue={NotifikasiData.data.Date}
                  Status={NotifikasiData.data.Status}
                  Action={NotifikasiData.data.Aksi}
                  Meta_Data={NotifikasiData.data.Meta_Data}
                  Target={NotifikasiData.data.Target}
                />
              </View>
            );
          })
        : null}

      {/* <View key={1}>
        <CardItemTransaction
          navigation={navigation}
          NotificationValue="Pembayaran telah di konfirmasi"
          DateValue="Mon, 10 Jan 2022 17:36:43 GMT"
          Status="Unread"
          Action="Open Page"
        />
      </View>
      <View key={2}>
        <CardItemTransaction
          navigation={navigation}
          NotificationValue="Anda melewati batas waktu pembayaran, pesanan anda otomatis di batalkan"
          DateValue="Mon, 10 Jan 2022 17:36:43 GMT"
          Status="Read"
          Action="Open Page"
        />
      </View>
      <View key={3}>
        <CardItemTransaction
          navigation={navigation}
          NotificationValue="Pada hari kamis 21-02-2022 akan diadakan perbaikan pintu utama, mohon maaf jika proses perbaikan menggangu kenyamanan anda"
          DateValue="Mon, 10 Jan 2022 17:36:43 GMT"
          Status="Read"
          Action="Open Page"
        />
      </View> */}
    </ScrollView>
  );
};

export default Notification;

const styles = StyleSheet.create({});
