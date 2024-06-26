import { StyleSheet, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Text, Card, Button, Icon } from "@rneui/themed";
import {
  getDatabase,
  ref,
  onValue,
  orderByChild,
  equalTo,
  query,
} from "firebase/database";

const CardItemTransaction = (props) => {
  const navigation = props.navigation;
  const [dataTansaction, setdataTansaction] = useState("");
  const [dates, setDates] = useState("");
  const [colors, setColors] = useState("");

  useEffect(() => {
    console.log(props);

    const fetchData = async () => {
      await getDetailRoom();
    };

    try {
      fetchData();
    } catch (err) {
      console.log(err);
    }
  }, [props]);

  const getDetailRoom = async () => {
    var orderId = props.IDorder;
    console.log(orderId);

    var resultDatabase = "";

    const db = getDatabase();
    const DetailOrder = query(
      ref(db, "order"),
      orderByChild("OrderId"),
      equalTo(orderId)
    );

    onValue(DetailOrder, (snapshot) => {
      Object.keys(snapshot.val()).map((key) => {
        console.log(snapshot.val()[key]);
        setdataTansaction(snapshot.val()[key]);
        resultDatabase = snapshot.val()[key];

        handleDateType(snapshot.val()[key]);
        handleColor(snapshot.val()[key].Status);
      });

      return resultDatabase;
    });

    // console.log(dataTansaction);
    // setListTransaction(resultDatabase);
    // ListO = resultDatabase;
    return resultDatabase;
  };

  const handleDateType = (detailT) => {
    const dataDetail = detailT;
    var Status = dataDetail.Status;

    console.log("status", Status);

    if (Status === "Active" || Status === "Selesai") {
      var date = dataDetail.TanggalSelesai;
      setDates(new Date(date));
    } else if (Status === "Menunggu Pembayaran" || Status === "Batal") {
      var date = dataDetail.JatuhTempo;
      setDates(new Date(date));
    }
  };

  const handleColor = (stat) => {
    var Status = stat;

    Status === "Active"
      ? setColors("#28a745")
      : Status === "Selesai"
      ? setColors("#6c757d")
      : Status === "Menunggu Pembayaran"
      ? setColors("#ffc107")
      : setColors("#dc3545");
  };

  useEffect(() => {
    console.log(dates);
    if (dates != null) {
      console.log(new Date(dates).getMonth() + 1);
    }
  }, [dates]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("CheckOut", {
            previous: "TransactionList",
            orderID: dataTansaction.OrderId,
          })
        }
      >
        <Card
          containerStyle={{
            margin: 0,
            paddingHorizontal: 2,
            paddingVertical: 5,
          }}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <View
              style={{
                flex: 0.5,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 5,
              }}
            >
              <Text style={{ color: "#b8b8b8" }}>
                {new Date(dates).getFullYear()}
              </Text>

              <Text style={{ color: colors, fontSize: 20, fontWeight: "bold" }}>
                {new Date(dates).getDate()}
              </Text>

              <Text style={{ color: "#b8b8b8" }}>
                {new Date(dates).getMonth() + 1}
              </Text>
            </View>
            <View
              style={{
                flex: 1.4,
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#b8b8b8", fontSize: 12 }}>
                Order: #{dataTansaction?.OrderId}
              </Text>
              <Text style={{ fontSize: 12 }}>{dataTansaction?.Paket}</Text>
              <Text style={{ color: "#b8b8b8", fontSize: 12 }}>
                {dataTansaction?.Ruangan}
              </Text>
            </View>
            <View
              style={{
                flex: 1.1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text>Total</Text>
              <Text>Rp {dataTansaction?.TotalPembayaran}</Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ textAlign: "center", color: colors, width: 100 }}>
                {dataTansaction?.Status}
              </Text>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    </View>
  );
};

export default CardItemTransaction;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: "100%",
    // marginHorizontal: -8,
    // marginVertical: -5,
    // backgroundColor: "red",
  },
});
