import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
} from "react-native";
import React, { useEffect, useState } from "react";

import {
  getDatabase,
  ref,
  onValue,
  orderByChild,
  equalTo,
  set,
  query,
  push,
} from "firebase/database";

import IconCheck from "../../assets/icon/check-white.png";
import { async } from "@firebase/util";

import store from "../../config/redux";
import { setCurentPage } from "../../config/someGlobalData";
import { useSelector } from "react-redux";

const CheckOut = ({ route, navigation }) => {
  const globalState = useSelector((state) => state.dataPengguna);

  const [isLoad, setIsLoad] = useState(false);
  const [dataOrder, setDataOrder] = useState("");
  const [subTotal, setSubTotal] = useState();
  const [typeDuration, setTypeDuration] = useState();
  const [dateOrder, setDateOrder] = useState();
  const [paymentStatus, setPaymentStatus] = useState(false);

  useEffect(() => {
    console.log("route", route);
    // console.log(dataOrder);

    if (!isLoad) {
      console.log("Didmount");
      handleGetOrderDetail();
      store.dispatch(setCurentPage("Order Detail"));
      setIsLoad(true);
    }

    handlePriceAndDuration();
    handleGetDateOrder();
    handlePaymentStatus();

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

  // Handle DidUnmount
  useEffect(() => {
    // handleCollectDataUser();

    const unsubscribe = navigation.addListener("focus", () => {
      setIsLoad(false);
      // setPhoto("");
    });
    return unsubscribe;
  }, [navigation]);

  const handleGetOrderDetail = async () => {
    const orderID = route.params.orderID;

    const db = getDatabase();
    const DetailOrder = query(
      ref(db, "order"),
      orderByChild("OrderId"),
      equalTo(orderID)
    );

    try {
      onValue(DetailOrder, async (snapshot) => {
        Object.keys(snapshot.val()).map((key) => {
          const resultDatabase = []; // Must place in here for get real time data
          resultDatabase.push({
            data: snapshot.val()[key],
          });

          setDataOrder(resultDatabase[0].data);
          console.log(resultDatabase[0].data);
          // console.log(snapshot.val()[key]);

          return resultDatabase;
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handlePriceAndDuration = () => {
    var paket = dataOrder?.Paket;
    if (paket === "PERJAM") {
      setSubTotal("30.000");
      setTypeDuration("Hour");
    } else if (paket === "HARIAN") {
      setSubTotal("100.000");
      setTypeDuration("Day");
    } else if (paket === "HARIAN(PELAJAR)") {
      setSubTotal("75.000");
      setTypeDuration("Day");
    } else if (paket === "BULANAN 25JAM") {
      setSubTotal("450.000");
      setTypeDuration("Month");
    } else if (paket === "BULANAN 50JAM") {
      setSubTotal("650.000");
      setTypeDuration("Month");
    } else if (paket === "BULANAN 100JAM") {
      setSubTotal("900.000");
      setTypeDuration("Month");
    } else if (paket === "BULANAN TANPA BATAS") {
      setSubTotal("1.200.000");
      setTypeDuration("Month");
    } else {
      setSubTotal("0");
      // setTypeDuration("Empty");
    }

    console.log(paket);
  };

  const handleGetDateOrder = () => {
    if (dataOrder.JatuhTempo != null) {
      var dueDate = handleUnFormat(dataOrder.JatuhTempo);
      dueDate.setDate(dueDate.getDate() - 2);
      // console.log("Order Date", dueDate);
      var result = handleFormatingDate(dueDate);
      setDateOrder(result);
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

  const handleFormatingDate = (date) => {
    let convertDate =
      date.getDate() +
      "-" +
      parseInt(date.getMonth() + 1) +
      "-" +
      date.getFullYear();

    return convertDate;
  };

  const handlePaymentStatus = () => {
    if (dataOrder.Status != null) {
      console.log(dataOrder.Status);
      if (dataOrder.Status === "Active" || dataOrder.Status === "Selesai") {
        setPaymentStatus(true);
      } else if (
        dataOrder.Status === "Menunggu Pembayaran" ||
        dataOrder.Status === "Batal"
      ) {
        setPaymentStatus(false);
      }
    }
  };

  const handleSendPayment = () => {
    handleCreateNotificationToAdmin();
  };

  const handleCreateNotificationToAdmin = () => {
    var idUser = globalState.uid;
    var DateTimeNow = FormattingDateTime(new Date());

    // console.log(DateTimeNow);

    const db = getDatabase();
    const addNotification = ref(db, `notifikasi`);
    const newNotificationRef = push(addNotification);

    set(newNotificationRef, {
      Aksi: "Chat",
      Isi: "Anda mendapat pesan baru",
      Judul: "Pesan Baru",
      Status: "Unread",
      Target: idUser,
      Meta_Data: idUser,
      Date: DateTimeNow,
    });
  };

  return (
    <ScrollView style={{ backgroundColor: "#FEF7EF" }}>
      <View style={styles.containerPaymentStatus}>
        <View
          style={[
            styles.lineStatusPayment,
            {
              backgroundColor: "#007BFF",
              left: "15%",
            },
          ]}
        />
        {paymentStatus ? (
          <View
            style={[
              styles.lineStatusPayment,
              {
                backgroundColor: "#007BFF",
                left: "50%",
              },
            ]}
          />
        ) : (
          <View
            style={[
              styles.lineStatusPayment,
              {
                backgroundColor: "rgba(217, 217, 217, 0.7)",
                left: "50%",
              },
            ]}
          />
        )}

        <View style={styles.containerCrycleStatusPayment}>
          <View style={[styles.crycle, { backgroundColor: "#007BFF" }]} />
          <View style={[styles.crycle, { backgroundColor: "#007BFF" }]} />
          {paymentStatus ? (
            <View style={[styles.crycle, { backgroundColor: "#007BFF" }]} />
          ) : (
            <View
              style={[
                styles.crycle,
                { backgroundColor: "rgba(217, 217, 217, 0.7)" },
              ]}
            />
          )}
        </View>

        <View style={styles.containerIconCheck}>
          <Image source={IconCheck} style={{ width: 10, height: 10 }} />
          {paymentStatus ? (
            <>
              <Image source={IconCheck} style={{ width: 10, height: 10 }} />
              <Image source={IconCheck} style={{ width: 10, height: 10 }} />
            </>
          ) : null}
        </View>

        <View style={styles.containerTextStatusPayment}>
          <Text>Check Out</Text>
          <Text>Payment</Text>
          <Text>Completed</Text>
        </View>

        <View style={[styles.containerDate, { marginTop: 25 }]}>
          <Text
            style={{ fontFamily: "Poppins", fontSize: 12, fontWeight: "400" }}
          >
            Transaction Date
          </Text>
          <Text
            style={{ fontFamily: "Poppins", fontSize: 12, fontWeight: "400" }}
          >
            {dateOrder}
            {/* - 23:59 WIB */}
          </Text>
        </View>
        <View style={styles.containerDate}>
          <Text
            style={{ fontFamily: "Poppins", fontSize: 12, fontWeight: "400" }}
          >
            Due Date
          </Text>
          <Text
            style={{ fontFamily: "Poppins", fontSize: 12, fontWeight: "400" }}
          >
            {dataOrder.JatuhTempo}
            {/* - 23:59 WIB */}
          </Text>
        </View>
      </View>

      <View style={styles.containerDetail}>
        <Text style={styles.txtTitle}>Transaction Details</Text>
        <View style={styles.containerItemDetail}>
          <View style={{ flex: 1 }}>
            <Text
              style={{ fontFamily: "Poppins", fontSize: 12, fontWeight: "400" }}
            >
              Package
            </Text>
            <Text
              style={{ fontFamily: "Poppins", fontSize: 12, fontWeight: "400" }}
            >
              Room
            </Text>
            <Text
              style={{ fontFamily: "Poppins", fontSize: 12, fontWeight: "400" }}
            >
              Price
            </Text>
            <Text
              style={{ fontFamily: "Poppins", fontSize: 12, fontWeight: "400" }}
            >
              Duration
            </Text>
            <Text
              style={{ fontFamily: "Poppins", fontSize: 12, fontWeight: "400" }}
            >
              Subtotal
            </Text>
            <Text
              style={{ fontFamily: "Poppins", fontSize: 12, fontWeight: "400" }}
            >
              Check In
            </Text>
            <Text
              style={{ fontFamily: "Poppins", fontSize: 12, fontWeight: "400" }}
            >
              Check Out
            </Text>
          </View>
          <View style={{ flex: 1, height: 100 }}>
            <Text
              style={{ fontFamily: "Poppins", fontSize: 12, fontWeight: "400" }}
            >
              {dataOrder?.Paket}
            </Text>
            <Text
              style={{ fontFamily: "Poppins", fontSize: 12, fontWeight: "400" }}
            >
              {/* Shared Office Desk  */}
              {dataOrder?.Ruangan}
            </Text>
            <Text
              style={{ fontFamily: "Poppins", fontSize: 12, fontWeight: "400" }}
            >
              Rp {subTotal}
            </Text>
            <Text
              style={{ fontFamily: "Poppins", fontSize: 12, fontWeight: "400" }}
            >
              {dataOrder?.JumlahPaket} {typeDuration}
            </Text>
            <Text
              style={{ fontFamily: "Poppins", fontSize: 12, fontWeight: "400" }}
            >
              Rp {dataOrder?.TotalPembayaran}
            </Text>
            <Text
              style={{ fontFamily: "Poppins", fontSize: 12, fontWeight: "400" }}
            >
              {dataOrder?.TanggalSewa}
            </Text>
            <Text
              style={{ fontFamily: "Poppins", fontSize: 12, fontWeight: "400" }}
            >
              {dataOrder?.TanggalSelesai}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.containerPaymentMethod}>
        <Text style={[styles.txtTitle, { width: "100%" }]}>Payment Method</Text>
        <Image
          source={require("../../assets/img/bca-bank-central-asia.png")}
          style={styles.imgBCA}
        />
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 30 }}
        >
          <Image
            source={require("../../assets/icon/pngtree-email-vector-icon-png-image_355828.png")}
            style={styles.imgMail}
          />
          <Text>payment@kedasi.co.id</Text>
        </View>
      </View>

      <View style={styles.containerButton}>
        <TouchableOpacity
          style={[styles.containerItemButton, { backgroundColor: "#4099f7" }]}
          onPress={() => navigation.navigate("Dashboard")}
        >
          <Text style={styles.txtButton}>Dashboard</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={[styles.containerItemButton, { backgroundColor: "#28A745" }]}
        >
          <Text
            style={{
              fontFamily: "Poppins",
              fontSize: 20,
              fontWeight: "bold",
              color: "white",
            }}
          >
            Upload Payment
          </Text>
        </TouchableOpacity> */}
      </View>
    </ScrollView>
  );
};

export default CheckOut;

const styles = StyleSheet.create({
  containerPaymentStatus: {
    width: "100%",
    // height: 130,
    marginBottom: 10,
    backgroundColor: "white",
    borderBottomColor: "rgba(0, 0, 0, 0.10)",
    borderBottomWidth: 4,
  },
  lineStatusPayment: {
    width: "35%",
    height: 5,
    position: "absolute",
    top: 20,
  },
  containerCrycleStatusPayment: {
    marginHorizontal: 50,
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  crycle: {
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
  },
  containerIconCheck: {
    width: "100%",
    paddingHorizontal: 52,
    marginTop: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
  },
  containerTextStatusPayment: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 25,
    marginTop: 15,
  },
  containerDate: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
  },

  containerDetail: {
    width: "100%",
    // height: 210,
    backgroundColor: "white",
    marginBottom: 10,
    borderBottomColor: "rgba(0, 0, 0, 0.10)",
    borderBottomWidth: 4,
  },
  txtTitle: {
    marginTop: 15,
    marginLeft: 15,
    marginBottom: 12,
    fontFamily: "Poppins",
    fontSize: 14,
    fontWeight: "bold",
  },

  containerItemDetail: {
    marginHorizontal: 15,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  containerPaymentMethod: {
    // width: '100%',
    // height: 150,
    backgroundColor: "white",
    alignItems: "center",
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomColor: "rgba(0, 0, 0, 0.10)",
    borderBottomWidth: 4,
  },
  imgBCA: {
    width: 120,
    height: 40,
    resizeMode: "stretch",
    marginTop: 10,
  },
  imgMail: {
    width: 25,
    height: 15,
    resizeMode: "stretch",
    marginRight: 5,
  },

  containerButton: {
    height: 60,
    backgroundColor: "white",
    marginBottom: 1,
    flexDirection: "row",
  },
  containerItemButton: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 1,
    // borderColor: "rgba(0, 0, 0, 0.10)",
  },
  txtButton: {
    fontFamily: "Poppins",
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});
