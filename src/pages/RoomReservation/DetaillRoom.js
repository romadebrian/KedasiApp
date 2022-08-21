import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  BackHandler,
  Alert,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { getDatabase, ref, set, child, get, push } from "firebase/database";

const DetaillRoom = ({ route, navigation }) => {
  const globalState = useSelector((state) => state);
  const detialTarget = route.params.ListDetailRoom.find(
    ({ id }) => id === route.params.room
  );

  const [isLoad, setIsLoad] = useState(false);
  const [dataOrder, setDataOrder] = useState();
  const [nextOrderId, setNextOrderId] = useState("");
  const [paket, setPaket] = useState("");
  const [totalPayment, setTotalPayment] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    console.log(route.params.room);
    console.log(route);
    console.log(dataOrder);
    // console.log(nextOrderId);
    // console.log("Name User", globalState.dataPengguna.displayName);

    if (!isLoad) {
      console.log("Didmount");
      handleCollectData();
      handleTypePaket();

      handleGetOrderID();
      handleDueDate();

      // handleFormatingDate();

      setIsLoad(true);
    }

    const backAction = () => {
      navigation.navigate("Room", {
        DataAvalRoom: route.params.DataAvalRoom,
        type: route.params.type,
        duration: route.params.duration,
        pickDate: route.params.pickDate,
        endDate: route.params.endDate,
      });
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  });

  useEffect(() => {
    // handleCollectDataUser();

    const unsubscribe = navigation.addListener("focus", () => {
      setIsLoad(false);
      // setPhoto("");
    });
    return unsubscribe;
  }, [navigation]);

  const img =
    detialTarget.img === "room1"
      ? require("../../assets/img/room1.jpg")
      : detialTarget.img === "room2"
      ? require("../../assets/img/room2.jpg")
      : detialTarget.img === "room3"
      ? require(`../../assets/img/room3.jpg`)
      : null;

  const handleBooking = async () => {
    var nameUser = globalState.dataPengguna.displayName;
    var duration = route.params.duration;
    var room = route.params.room;
    var paymentStatus = "Menunggu Pembayaran";
    var startDate = handleFormatingDate(route.params.pickDate);
    var endDate = handleFormatingDate(route.params.endDate);

    console.log("Order Id: ", nextOrderId);
    console.log("Paket: ", paket);
    console.log("Jumlah Paket: ", duration);
    console.log("Nama Costumer: ", nameUser);
    console.log("Ruangan: ", room);
    console.log("Tanggal Mulai: ", startDate);
    console.log("Tanggal Selesai: ", endDate);
    console.log("StatusPembayaran: ", paymentStatus);
    console.log("Total Pembayaran", totalPayment);
    console.log("Jatuh Tempo", dueDate);

    const db = getDatabase();
    const orderListRef = ref(db, "order");
    const newOrderRef = push(orderListRef);

    set(newOrderRef, {
      OrderId: nextOrderId,
      Paket: paket,
      JumlahPaket: duration,
      NamaPemesan: nameUser,
      Ruangan: room,
      TanggalSewa: startDate,
      TanggalSelesai: endDate,
      Status: paymentStatus,
      TotalPembayaran: totalPayment,
      BuktiPembayaran: "",
      JatuhTempo: dueDate,
    })
      .then(() => {
        // Data saved successfully!
        ToastAndroid.show("Booking Success", ToastAndroid.SHORT);
        console.log("Booking Success");
        console.log(
          "send value: ",
          nextOrderId,
          paket,
          duration,
          nameUser,
          room,
          startDate,
          endDate,
          paymentStatus,
          totalPayment,
          "",
          dueDate
        );
      })
      .catch((error) => {
        // The write failed...
        alert("Gagal Simpan");
      });
    // navigation.navigate("CheckOut");
  };

  const handleCollectData = async () => {
    const dataR = [];
    const dbRef = ref(getDatabase());
    await get(child(dbRef, `order`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          // console.log(snapshot.val());
          Object.keys(snapshot.val()).map((key) => {
            dataR.push({
              id: key,
              data: snapshot.val()[key],
            });

            // data2.push(snapshot.val()[key]);
            setDataOrder(dataR);

            return dataR;
          });
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });

    return dataR;
  };

  const handleGetOrderID = async () => {
    var ListOrder = await handleCollectData();
    console.log(ListOrder.length);
    var totalOrderId = ListOrder.length;
    var init = totalOrderId + 1;
    var str = "" + init;
    var pad = "0000";
    var ans = pad.substring(0, pad.length - str.length) + str;
    const valVNextOrderId = "ORD" + ans;

    // this.setState({ nextOrderId: valVNextOrderId });
    setNextOrderId(valVNextOrderId);

    console.log("valVNextOrderId", valVNextOrderId);
  };

  const handleTypePaket = () => {
    var tipe = route.params.type;
    if (tipe === "Casual 1") {
      setPaket("PERJAM");
    } else if (tipe === "Casual 2") {
      setPaket("HARIAN");
    } else if (tipe === "Casual 3") {
      setPaket("HARIAN(PELAJAR)");
    } else if (tipe === "Monthly 1") {
      setPaket("BULANAN 25JAM");
    } else if (tipe === "Monthly 2") {
      setPaket("BULANAN 50JAM");
    } else if (tipe === "Monthly 3") {
      setPaket("BULANAN 100JAM");
    } else if (tipe === "Monthly 4") {
      setPaket("BULANAN TANPA BATAS");
    } else {
      null;
    }

    console.log("Type Pacet: ", paket);

    return handleTotalPayment();
  };

  const handleTotalPayment = () => {
    var totalPaket = route.params.duration;
    let ConvertToCurrency = Intl.NumberFormat("en-US");

    if (paket === "PERJAM") {
      setTotalPayment(ConvertToCurrency.format(30000 * totalPaket));
    } else if (paket === "HARIAN") {
      setTotalPayment(ConvertToCurrency.format(100000 * totalPaket));
    } else if (paket === "HARIAN(PELAJAR)") {
      setTotalPayment(ConvertToCurrency.format(75000 * totalPaket));
    } else if (paket === "BULANAN 25JAM") {
      setTotalPayment(ConvertToCurrency.format(450000 * totalPaket));
    } else if (paket === "BULANAN 50JAM") {
      setTotalPayment(ConvertToCurrency.format(650000 * totalPaket));
    } else if (paket === "BULANAN 100JAM") {
      setTotalPayment(ConvertToCurrency.format(900000 * totalPaket));
    } else if (paket === "BULANAN TANPA BATAS") {
      setTotalPayment(ConvertToCurrency.format(1200000 * totalPaket));
    } else {
      setTotalPayment(0);
    }

    // can't call "totalPayment because useState"
    // return console.log("Total Payment", totalPayment);
  };

  const handleDueDate = () => {
    var dateNow = new Date();

    // add a day
    dateNow.setDate(dateNow.getDate() + 2);

    console.log("Due Date", dateNow);

    // return new Promise((resolve) => {
    //   resolve(dateNow);
    // });

    return setDueDate(dateNow);
  };

  const handleFormatingDate = (date) => {
    // console.log("input date ", input);
    // let date = route.params.pickDate;

    // var date = new Date(
    //   "Wed Aug 24 2022 14:45:03 GMT+0700 (Western Indonesia Time)"
    // );

    let convertDate =
      date.getDate() +
      "-" +
      parseInt(date.getMonth() + 1) +
      "-" +
      date.getFullYear();

    // console.log("Result Formating ", convertDate);
    // setConvertTglMulai(convertDate);
    return convertDate;
  };

  const handleBookingPress = () => {
    Alert.alert("Confirmation", "Are you sure you want to book a room?", [
      {
        text: "Cancel",
        onPress: () => {
          console.log("Cancel Pressed");
          ToastAndroid.show("Cancelled", ToastAndroid.SHORT);
        },
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          handleBooking();
        },
      },
    ]);
  };

  return (
    <ScrollView style={{ backgroundColor: "#FEF7EF" }}>
      <View>
        <Image
          source={img}
          style={{ width: "100%", height: 200, resizeMode: "stretch" }}
        />
        <View style={styles.containerHead}>
          <Text style={styles.TxtHeadTitle}>{detialTarget.title}</Text>
          <Text style={styles.TxtSubHeadTitle}>Kedasi coworking space</Text>
        </View>

        <View style={styles.containerDetailRoom}>
          <Text style={[styles.TxtTitle, { marginTop: 10 }]}>Detail</Text>
          <Text style={{ marginBottom: 10 }}>{detialTarget.desc}</Text>

          <View style={{ marginBottom: 15 }}>
            <Text style={styles.TxtTitle}>Capacity</Text>
            <View style={{ flexDirection: "row", marginTop: 5 }}>
              <Image
                source={require("../../assets/icon/user-group-solid.png")}
                style={{ width: 25, height: 25 }}
              />
              <Text style={{ marginLeft: 10, fontFamily: "Poppins" }}>
                Maximum for {detialTarget.people} people
              </Text>
            </View>
          </View>
          <View style={{ marginBottom: 15 }}>
            <Text style={styles.TxtTitle}>Additional Benefits</Text>
            <View style={{ flexDirection: "row", marginTop: 5 }}>
              <Image
                source={require("../../assets/icon/id-card-clip-solid.png")}
                style={{ width: 25, height: 25 }}
              />
              <Text style={{ marginLeft: 10, fontFamily: "Poppins" }}>
                Access Card
              </Text>
            </View>
          </View>
          <View style={{ marginBottom: 15 }}>
            <Text style={styles.TxtTitle}>General Regulation</Text>
            <View style={{ flexDirection: "row", marginTop: 5 }}>
              <Image
                source={require("../../assets/icon/ban-smoking-solid.png")}
                style={{ width: 25, height: 25 }}
              />
              <Text style={{ marginLeft: 10, fontFamily: "Poppins" }}>
                No smoking
              </Text>
            </View>
          </View>
          <View style={{ marginBottom: 15 }}>
            <Text style={styles.TxtTitle}>Operational Schedule</Text>
            <View style={{ flexDirection: "row", marginTop: 5 }}>
              <Image
                source={require("../../assets/icon/clock-solid.png")}
                style={{ width: 25, height: 25 }}
              />
              <Text style={{ marginLeft: 10, fontFamily: "Poppins" }}>
                Weekdays 08:00 - 20:00
              </Text>
            </View>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Rp. {totalPayment}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.containerButton}
            onPress={handleBookingPress}
          >
            <Text style={styles.TxtButton}>Book now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default DetaillRoom;

const styles = StyleSheet.create({
  containerHead: {
    width: "100%",
    height: 60,
    backgroundColor: "white",
  },
  TxtHeadTitle: {
    marginTop: 10,
    marginLeft: 25,
    fontSize: 15,
    fontWeight: "bold",
  },
  TxtSubHeadTitle: {
    marginTop: 5,
    marginLeft: 25,
    fontSize: 10,
    fontWeight: "bold",
  },

  containerDetailRoom: {
    marginTop: 10,
    paddingHorizontal: 25,
    backgroundColor: "white",
  },
  TxtTitle: {
    fontSize: 15,
    fontWeight: "bold",
    fontFamily: "Poppins",
  },
  containerButton: {
    width: 300,
    height: 50,
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: "#4099f7",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  TxtButton: {
    fontFamily: "Poppins",
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
});
