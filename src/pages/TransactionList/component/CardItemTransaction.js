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
  useEffect(() => {
    console.log(props);
    getDetailRoom();
  }, [props]);

  const getDetailRoom = async () => {
    var orderId = props.IDorder;
    console.log(orderId);

    const resultDatabase = [];

    const db = getDatabase();
    const DetailOrder = query(
      ref(db, "order"),
      orderByChild("OrderId"),
      equalTo(orderId)
    );

    onValue(DetailOrder, (snapshot) => {
      Object.keys(snapshot.val()).map((key) => {
        setdataTansaction(snapshot.val()[key]);
        console.log(snapshot.val()[key]);

        // return
      });
    });

    // console.log(dataTansaction);
    // setListTransaction(resultDatabase);
    // ListO = resultDatabase;
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
              <Text style={{ color: "#b8b8b8" }}>2022</Text>
              <Text
                style={{ color: "green", fontSize: 20, fontWeight: "bold" }}
              >
                30
              </Text>
              <Text style={{ color: "#b8b8b8" }}>12</Text>
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
