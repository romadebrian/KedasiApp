import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import React, { useEffect, useState } from "react";

import { getDatabase, ref, set, child, get } from "firebase/database";
import { async } from "@firebase/util";

const DetaillRoom = ({ route, navigation }) => {
  const detialTarget = route.params.ListDetailRoom.find(
    ({ id }) => id === route.params.room
  );

  const [isLoad, setIsLoad] = useState(false);
  const [dataOrder, setDataOrder] = useState();
  const [nextOrderId, setNextOrderId] = useState("");
  const [paket, setPaket] = useState("");

  useEffect(() => {
    console.log(route.params.room);
    console.log(route);
    console.log(dataOrder);
    // console.log(nextOrderId);

    if (!isLoad) {
      console.log("Didmount");
      handleCollectData();
      handleTypePaket();
      setIsLoad(true);

      handleGetOrderID();
    }

    const backAction = () => {
      navigation.navigate("Room", {
        type: route.params.type,
        DataAvalRoom: route.params.DataAvalRoom,
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

  const handleBooking = () => {
    console.log("Order Id: ", nextOrderId);
    console.log("Paket: ", paket);
    console.log("Jumlah Paket: ", totalPaket);
    console.log("Nama Costumer: ", e.target[3].value);
    console.log("Ruangan: ", e.target[4].value);
    console.log("Tanggal Mulai: ", convertTglMulai);
    console.log("Tanggal Selesai: ", tglSelesai);
    console.log("StatusPembayaran: ", statusPembayaran);
    console.log("Total Pembayaran", totalPayment);
    console.log("Jatuh Tempo", jatuhTempo);

    const db = getDatabase();
    set(ref(db, "users/" + userId), {
      username: name,
      email: email,
      profile_picture: imageUrl,
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

    console.log(valVNextOrderId);
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

    console.log(paket);
  };

  const handleTotalPayment = () => {};

  const handleDueDate = () => {};

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
              Rp. 10,000,000
            </Text>
          </View>
          <TouchableOpacity
            style={styles.containerButton}
            onPress={handleBooking}
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
