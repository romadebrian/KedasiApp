import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Text, Card, Button, Icon } from "@rneui/themed";
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

const CardItemTransaction = (props) => {
  const navigation = props.navigation;
  const [dataTansaction, setdataTansaction] = useState("");
  const [dates, setDates] = useState("");

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
      var unconvert = handleUnFormat(date);
      // var day = unconvert.getDate();
      console.log(unconvert);
      setDates(new Date(unconvert));
    } else if (Status === "Menunggu Pembayaran" || Status === "Batal") {
      var date = dataDetail.JatuhTempo;
      var unconvert = handleUnFormat(date);
      // var day = unconvert.getDate();
      console.log(unconvert);
      setDates(new Date(unconvert));
    }
  };

  const handleUnFormat = (date) => {
    // console.log(dataOrder.JatuhTempo);
    if (date != null) {
      // var bookingDate = dataOrder.JatuhTempo;
      var d1 = date.split("-");
      var unconverConvertDate = new Date(d1[2], parseInt(d1[1]) - 1, d1[0]); // -1 because months are from 0 to 11

      // console.log("UnformatLog", ConvertBookingDate);
      return unconverConvertDate;
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("CheckOut", { orderID: dataTansaction.OrderId })
        }
      >
        <Card>
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
              }}
            >
              <Text style={{ color: "#b8b8b8" }}>
                {new Date(dates).getFullYear()}
              </Text>

              {dataTansaction.Status === "Active" ? (
                <Text
                  style={{ color: "#28a745", fontSize: 20, fontWeight: "bold" }}
                >
                  {new Date(dates).getDate()}
                </Text>
              ) : dataTansaction.Status === "Selesai" ? (
                <Text
                  style={{ color: "#6c757d", fontSize: 20, fontWeight: "bold" }}
                >
                  {new Date(dates).getDate()}
                </Text>
              ) : dataTansaction.Status === "Menunggu Pembayaran" ? (
                <Text
                  style={{ color: "#ffc107", fontSize: 20, fontWeight: "bold" }}
                >
                  {new Date(dates).getDate()}
                </Text>
              ) : (
                <Text
                  style={{ color: "#dc3545", fontSize: 20, fontWeight: "bold" }}
                >
                  {new Date(dates).getDate()}
                </Text>
              )}

              <Text style={{ color: "#b8b8b8" }}>
                {new Date(dates).getMonth()}
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
              <Text>{dataTansaction?.Paket}</Text>
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
              <Text style={{ textAlign: "center" }}>
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
    flex: 1,
    marginHorizontal: -8,
    marginVertical: -5,
  },
});
