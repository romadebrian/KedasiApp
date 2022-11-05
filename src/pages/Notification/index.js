import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import CardItemTransaction from "./component/CardItemNotification.js";

const Notification = ({ navigation }) => {
  return (
    <ScrollView>
      <View key={1}>
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
      </View>
    </ScrollView>
  );
};

export default Notification;

const styles = StyleSheet.create({});
