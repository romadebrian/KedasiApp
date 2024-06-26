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

import { FormattingDateTime } from "../../config/formattingDateTime";

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

  var img =
    detialTarget.img === "room0"
      ? require("../../assets/img/room0.jpg")
      : detialTarget.img === "room1"
      ? require("../../assets/img/room1.jpg")
      : detialTarget.img === "room2"
      ? require(`../../assets/img/room2.jpg`)
      : detialTarget.img === "room3"
      ? require(`../../assets/img/room3.jpg`)
      : detialTarget.img === "room4"
      ? require(`../../assets/img/room4.jpg`)
      : detialTarget.img === "room5"
      ? require(`../../assets/img/room5.jpg`)
      : null;

  // var img = require(`../../assets/img/${detialTarget.img}.jpg`);
  // const img = require(`../../assets/img/room1.jpg`);

  useEffect(() => {
    console.log(route.params.room);
    console.log(route);
    console.log(dataOrder);
    // console.log(nextOrderId);
    console.log("Date User", globalState.dataPengguna);

    if (!isLoad) {
      console.log("Didmount");
      handleCollectData();
      handleTypePaket();

      handleGetOrderID();

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
          handleSaveToProfile();
        },
      },
    ]);
  };

  const handleBooking = async () => {
    var nameUser = globalState.dataPengguna.displayName;
    var duration = route.params.duration;
    var room = route.params.room;
    var paymentStatus = "Menunggu Pembayaran";

    const dateTransaction = new Date();
    const dueDate = new Date(dateTransaction);
    dueDate.setDate(dateTransaction.getDate() + 2);

    console.log("Order Id: ", nextOrderId);
    console.log("Paket: ", paket);
    console.log("Jumlah Paket: ", duration);
    console.log("Nama Costumer: ", nameUser);
    console.log("Ruangan: ", room);
    console.log("Tanggal Mulai: ", route.params.pickDate);
    console.log("Tanggal Selesai: ", route.params.endDate);
    console.log("StatusPembayaran: ", paymentStatus);
    console.log("Total Pembayaran", totalPayment);
    console.log("Tanggal Transaksi", dateTransaction);
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
      TanggalSewa: `${route.params.pickDate}`,
      TanggalSelesai: `${route.params.endDate}`,
      TanggalTransaksi: `${dateTransaction}`,
      Status: paymentStatus,
      TotalPembayaran: totalPayment,
      BuktiPembayaran: "",
      JatuhTempo: `${dueDate}`,
    })
      .then(() => {
        // Data saved successfully!
        ToastAndroid.show("Booking Success", ToastAndroid.LONG);
        console.log("Booking Success");
        console.log(
          "send value: ",
          nextOrderId,
          paket,
          duration,
          nameUser,
          room,
          route.params.pickDate,
          route.params.endDate,
          paymentStatus,
          totalPayment,
          "",
          dateTransaction,
          dueDate
        );
        handleCreateNotification();
        handleCreateNotificationToAdmin();

        navigation.navigate("CheckOut", { orderID: nextOrderId });
      })
      .catch((error) => {
        // The write failed...
        console.log("error", error);
        alert("Gagal Simpan");
      });
  };

  const handleSaveToProfile = () => {
    var idUser = globalState.dataPengguna.uid;

    const db = getDatabase();
    const addOrder = ref(db, `users/${idUser}/order`);
    const newOrderRef = push(addOrder);

    set(newOrderRef, { OrderId: nextOrderId });

    // const db = getDatabase();
    // set(ref(db, `users/${idUser}/profile`), { nextOrderId });
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
    // let ConvertToCurrency = Intl.NumberFormat("en-US");

    if (paket === "PERJAM") {
      setTotalPayment(currencyFormating(30000 * totalPaket));
    } else if (paket === "HARIAN") {
      setTotalPayment(currencyFormating(100000 * totalPaket));
    } else if (paket === "HARIAN(PELAJAR)") {
      setTotalPayment(currencyFormating(75000 * totalPaket));
    } else if (paket === "BULANAN 25JAM") {
      setTotalPayment(currencyFormating(450000 * totalPaket));
    } else if (paket === "BULANAN 50JAM") {
      setTotalPayment(currencyFormating(650000 * totalPaket));
    } else if (paket === "BULANAN 100JAM") {
      setTotalPayment(currencyFormating(900000 * totalPaket));
    } else if (paket === "BULANAN TANPA BATAS") {
      setTotalPayment(currencyFormating(1200000 * totalPaket));
    } else {
      setTotalPayment(0);
    }

    // can't call "totalPayment because useState"
    // return console.log("Total Payment", totalPayment);
  };

  const currencyFormating = (val) => {
    let num = parseInt(val);
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  };

  const handleCreateNotification = () => {
    var idUser = globalState.dataPengguna.uid;
    var DateTimeNow = FormattingDateTime(new Date());

    console.log(DateTimeNow);

    const db = getDatabase();
    const addNotification = ref(db, `users/${idUser}/notifikasi`);
    const newNotificationRef = push(addNotification);

    set(newNotificationRef, {
      Aksi: "CheckOut",
      Isi: "Pemesanan ruangan berhasil, pesanan menunggu pembayaran",
      Judul: "Pemesanan Ruangan Berhasil",
      Status: "Unread",
      Target: idUser,
      Meta_Data: nextOrderId,
      Date: DateTimeNow,
    });
  };

  const handleCreateNotificationToAdmin = () => {
    var idUser = globalState.dataPengguna.uid;
    var DateTimeNow = FormattingDateTime(new Date());

    // console.log(DateTimeNow);

    const db = getDatabase();
    const addNotification = ref(db, `notifikasi`);
    const newNotificationRef = push(addNotification);

    set(newNotificationRef, {
      Aksi: "CheckOut",
      Isi: `Pemesanan ruangan dengan ID ${nextOrderId}`,
      Judul: "Pemesanan Ruangan",
      Status: "Unread",
      Target: idUser,
      Meta_Data: nextOrderId,
      Date: DateTimeNow,
    });
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
              Rp {totalPayment}
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
