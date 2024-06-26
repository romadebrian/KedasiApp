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
  get,
  update,
} from "firebase/database";

import IconCheck from "../../assets/icon/check-white.png";

import store from "../../config/redux";
import { setCurentPage } from "../../config/someGlobalData";
import { useSelector } from "react-redux";

import { FormattingDateTime } from "../../config/formattingDateTime";

const CheckOut = ({ route, navigation }) => {
  const globalState = useSelector((state) => state.dataPengguna);

  const [isLoad, setIsLoad] = useState(false);
  const [dataOrder, setDataOrder] = useState("");
  const [subTotal, setSubTotal] = useState();
  const [typeDuration, setTypeDuration] = useState();
  const [paymentStatus, setPaymentStatus] = useState(false);

  useEffect(() => {
    console.log("route", route);
    console.log(dataOrder);

    if (!isLoad) {
      console.log("Didmount");
      handleGetOrderDetail();
      store.dispatch(setCurentPage("Order Detail"));
      setIsLoad(true);
    }

    handlePriceAndDuration();
    handlePaymentStatus();

    const backAction = () => {
      // console.log(route.params?.previous?;
      // navigation.navigate("Dashboard");
      route.params.previous
        ? navigation.navigate(route.params.previous)
        : navigation.navigate("Dashboard");
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
          console.log("log checkout result database", resultDatabase[0].data);
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

  const handleFormatingDateFull = (data) => {
    // console.log(data);

    // Moment.locale("id");
    // const result = Moment(data).format("D MMMM YYYY, h:mm:ss a");

    // const date = new Date(data).getDate();
    // const month = new Date(data).getMonth();
    // const year = new Date(data).getFullYear();
    // const time = new Date(data).toTimeString();

    // const result = date + " " + month + " " + year + " ";

    const date = new Date(data);

    var strArray = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var d = date.getDate();
    var m = strArray[date.getMonth()];
    var y = date.getFullYear();

    function addZero(i) {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    }

    let jam = addZero(date.getHours());
    let menit = addZero(date.getMinutes());
    let detik = addZero(date.getSeconds());
    let time = jam + ":" + menit + ":" + detik;
    let ampm = jam >= 12 ? "pm" : "am";

    const result =
      "" +
      (d <= 9 ? "0" + d : d) +
      " " +
      m +
      " " +
      y +
      ", " +
      time +
      " " +
      ampm;

    return result;
  };

  const handleFormatingDate = (data) => {
    const date = new Date(data).getDate();
    const month = new Date(data).getMonth();
    const year = new Date(data).getFullYear();

    const result = date + "-" + month + "-" + year;

    return result;
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

  // const handleSendPayment = () => {
  //   handleCreateNotificationToAdmin();
  // };

  // const handleCreateNotificationToAdmin = () => {
  //   var idUser = globalState.uid;
  //   var DateTimeNow = FormattingDateTime(new Date());

  //   // console.log(DateTimeNow);

  //   const db = getDatabase();
  //   const addNotification = ref(db, `notifikasi`);
  //   const newNotificationRef = push(addNotification);

  //   set(newNotificationRef, {
  //     Aksi: "Chat",
  //     Isi: "Anda mendapat pesan baru",
  //     Judul: "Pesan Baru",
  //     Status: "Unread",
  //     Target: idUser,
  //     Meta_Data: idUser,
  //     Date: DateTimeNow,
  //   });
  // };

  const handleCancelBooking = async (userID) => {
    const db = getDatabase();

    const getPrimaryKey = () => {
      return new Promise((resolve) => {
        const idPesanan = dataOrder.OrderId;

        const db = getDatabase();
        const DetailOrder = query(
          ref(db, "order"),
          orderByChild("OrderId"),
          equalTo(idPesanan)
        );

        get(DetailOrder).then((snapshot) => {
          Object.keys(snapshot.val()).map((key) => {
            // console.log("get key order", key);
            resolve(key);
            return key;
          });
        });
      });
    };

    const PrimaryKeyOrder = await getPrimaryKey();
    console.log("PrimaryKeyOrder", PrimaryKeyOrder);
    // A post entry.
    const postData = "Batal";

    const updates = {};
    // updates['/posts/' + newPostKey] = postData;
    updates["order/" + PrimaryKeyOrder + "/Status"] = "Batal";

    return update(ref(db), updates)
      .then(() => {
        // Data saved successfully!
        console.log("Data saved successfully!");
      })
      .catch((error) => {
        // The write failed...
      });
  };

  return (
    <View style={{ flex: 1 }}>
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
              {handleFormatingDateFull(dataOrder.TanggalTransaksi)}
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
              {handleFormatingDateFull(dataOrder.JatuhTempo)}
            </Text>
          </View>
        </View>

        <View style={styles.containerDetail}>
          <Text style={styles.txtTitle}>Transaction Details</Text>
          <View style={styles.containerItemDetail}>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: "Poppins",
                  fontSize: 12,
                  fontWeight: "400",
                }}
              >
                Package
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins",
                  fontSize: 12,
                  fontWeight: "400",
                }}
              >
                Room
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins",
                  fontSize: 12,
                  fontWeight: "400",
                }}
              >
                Price
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins",
                  fontSize: 12,
                  fontWeight: "400",
                }}
              >
                Duration
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins",
                  fontSize: 12,
                  fontWeight: "400",
                }}
              >
                Subtotal
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins",
                  fontSize: 12,
                  fontWeight: "400",
                }}
              >
                Check In
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins",
                  fontSize: 12,
                  fontWeight: "400",
                }}
              >
                Check Out
              </Text>
            </View>
            <View style={{ flex: 1, height: 100 }}>
              <Text
                style={{
                  fontFamily: "Poppins",
                  fontSize: 12,
                  fontWeight: "400",
                }}
              >
                {dataOrder?.Paket}
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins",
                  fontSize: 12,
                  fontWeight: "400",
                }}
              >
                {/* Shared Office Desk  */}
                {dataOrder?.Ruangan}
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins",
                  fontSize: 12,
                  fontWeight: "400",
                }}
              >
                Rp {subTotal}
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins",
                  fontSize: 12,
                  fontWeight: "400",
                }}
              >
                {dataOrder?.JumlahPaket} {typeDuration}
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins",
                  fontSize: 12,
                  fontWeight: "400",
                }}
              >
                Rp {dataOrder?.TotalPembayaran}
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins",
                  fontSize: 12,
                  fontWeight: "400",
                }}
              >
                {handleFormatingDate(dataOrder.TanggalSewa)}
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins",
                  fontSize: 12,
                  fontWeight: "400",
                }}
              >
                {handleFormatingDate(dataOrder.TanggalSelesai)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.containerPaymentMethod}>
          <Text style={[styles.txtTitle, { width: "100%" }]}>
            Payment Method
          </Text>
          <Image
            source={require("../../assets/img/bca-bank-central-asia.png")}
            style={styles.imgBCA}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 30,
            }}
          >
            <Image
              source={require("../../assets/icon/pngtree-email-vector-icon-png-image_355828.png")}
              style={styles.imgMail}
            />
            <Text>payment@kedasi.co.id</Text>
          </View>
        </View>

        {dataOrder.Status === "Menunggu Pembayaran" ? (
          <View style={styles.containerButton}>
            <TouchableOpacity
              style={[
                styles.containerItemButton,
                { backgroundColor: "#fc3030" },
              ]}
              onPress={() => handleCancelBooking()}
            >
              <Text style={styles.txtButton}>Cancel Booking</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </ScrollView>
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
    </View>
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
