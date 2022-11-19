import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  getDatabase,
  ref,
  onValue,
  orderByChild,
  equalTo,
  get,
  query,
} from "firebase/database";

const CardItem = ({ IDRoom, navigation }) => {
  const [dataOrder, setDataOrder] = useState("");
  const [detailCard, setDetailCard] = useState({
    bgCard: "",
    txtColor: "",
  });

  // Startup or IsLoad
  useEffect(() => {
    // handleGetDetailOrder().then((result) => {
    //   console.log(result);
    // });
    handleGetDetailOrder();
  }, []);

  useEffect(() => {
    if (dataOrder.Status === "Active") {
      setDetailCard({
        bgCard: "#28A745",
        txtColor: "white",
      });
    } else {
      setDetailCard({
        bgCard: "#FFC107",
        txtColor: "black",
      });
    }
  }, [dataOrder]);

  const handleGetDetailOrder = async () => {
    const orderID = IDRoom;

    const db = getDatabase();
    const DetailOrder = query(
      ref(db, "order"),
      orderByChild("OrderId"),
      equalTo(orderID)
    );

    var result = "";

    try {
      onValue(DetailOrder, async (snapshot) => {
        Object.keys(snapshot.val()).map((key) => {
          const resultDatabase = []; // Must place in here for get real time data
          resultDatabase.push({
            data: snapshot.val()[key],
          });

          setDataOrder(resultDatabase[0].data);
          result = resultDatabase[0].data;
          console.log(resultDatabase[0].data);
          // console.log(snapshot.val()[key]);

          return resultDatabase;
        });
      });
    } catch (error) {
      console.log(error);
    }

    return result;
  };

  const changeFormatDate = (date) => {
    var D = new Date(date).toLocaleDateString();
    // console.log(D);
    return D;
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("CheckOut", { orderID: "ORD0038" })}
    >
      <View
        style={[
          styles.ContainerItem,
          styles.shadow,
          { backgroundColor: detailCard.bgCard },
        ]}
      >
        <Text style={[styles.TitleItem, { color: detailCard.txtColor }]}>
          {dataOrder.Status === "Active" ? "Active Orders" : "Unpaid Orders"}
        </Text>
        <Text style={[styles.DetailItem, { color: detailCard.txtColor }]}>
          {dataOrder.Ruangan} {dataOrder.Paket}
        </Text>
        <Text style={[styles.DetailTimeItem, { color: detailCard.txtColor }]}>
          {dataOrder.Status === "Active"
            ? `${changeFormatDate(dataOrder.TanggalSewa)} - ${changeFormatDate(
                dataOrder.TanggalSelesai
              )}`
            : `Payment Due : ${changeFormatDate(dataOrder.JatuhTempo)}`}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CardItem;

const styles = StyleSheet.create({
  ContainerItem: {
    width: 300,
    // height: 150,
    borderRadius: 10,
    marginTop: 10,
  },
  TitleItem: {
    marginTop: 11,
    marginLeft: 13,
    fontFamily: "Poppins",
    fontSize: 13,
    fontWeight: "bold",
    // color: 'white',
  },
  DetailItem: {
    marginTop: 23,
    marginLeft: 13,
    fontFamily: "Poppins",
    fontSize: 16,
    fontWeight: "400",
    // color: 'white',
  },
  DetailTimeItem: {
    marginTop: 13,
    marginLeft: 13,
    marginBottom: 20,
    fontFamily: "Poppins",
    fontSize: 12,
    fontWeight: "400",
    // color: 'white',
  },
  shadow: {
    borderColor: "#b8b8b8",
    borderWidth: 3,
    overflow: "hidden",
    shadowColor: "#b8b8b8",
    shadowRadius: 10,
    shadowOpacity: 1,
  },
});
