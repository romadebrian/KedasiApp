import { StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Text, Card } from "@rneui/themed";
import { getDatabase, ref, push, set, update, child } from "firebase/database";
import { useSelector } from "react-redux";

const CardItemNotification = (props) => {
  const globalState = useSelector((state) => state);

  useEffect(() => {
    console.log(globalState);
  });

  const handlePress = () => {
    var IDorder = props.Meta_Data;

    if (props.Action === "Detail_Transaksi") {
      handleSetWasRead();
      props.navigation.navigate("CheckOut", { orderID: IDorder });
    } else {
      console.log("Pemberitahuan");
      handleSetWasRead();
    }
  };

  const setDummyData = () => {
    var idUser = globalState.dataPengguna.uid;
    var DateTimeNow = new Date().toUTCString();

    const db = getDatabase();
    const addOrder = ref(db, `users/${idUser}/notifikasi`);
    const newOrderRef = push(addOrder);

    set(newOrderRef, {
      Aksi: "Detail_Transaksi",
      Isi: "Pembayaran telah di konfirmasi",
      Judul: "Konfirmasi Pembayaran",
      Status: "Unread",
      Target: idUser,
      Meta_Data: "ORD0046",
      Date: DateTimeNow,
    });

    // const db = getDatabase();
    // set(ref(db, `users/${idUser}/profile`), { nextOrderId });
  };

  const handleSetWasRead = () => {
    var idUser = globalState.dataPengguna.uid;

    const db = getDatabase();

    // A post entry.
    const postData = {
      Aksi: props.Action,
      Isi: props.NotificationValue,
      Judul: props.Title,
      Status: "Read",
      Target: props.Target,
      Meta_Data: props.Meta_Data,
      Date: props.DateValue,
    };

    // Get a key for a new Post.
    const newPostKey = push(child(ref(db), `users/${idUser}/notifikasi`)).key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates = {};
    updates["/users/" + idUser + "/notifikasi/" + props.IdNotifikasi] =
      postData;

    return update(ref(db), updates);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handlePress()}>
        <Card>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <View
              style={{
                width: "90%",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#b8b8b8", fontSize: 12 }} maxLength={5}>
                {props.DateValue}
              </Text>
              <Text style={{ marginTop: 10 }}>{props.NotificationValue}</Text>
            </View>

            <View
              style={{
                width: "10%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {props.Status === "Unread" ? (
                <View
                  style={{
                    backgroundColor: "#28a745",
                    width: 20,
                    height: 20,
                    borderWidth: 0,
                    borderRadius: 10,
                  }}
                />
              ) : null}
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    </View>
  );
};

export default CardItemNotification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: -8,
    marginVertical: -5,
  },
});
