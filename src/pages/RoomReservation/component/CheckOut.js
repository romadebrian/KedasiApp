import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

import IconCheck from "../../../assets/icon/check-white.png";

const CheckOut = () => {
  return (
    <ScrollView style={{ backgroundColor: "#FEF7EF" }}>
      <View style={styles.containerPaymentStatus}>
        <View
          style={[
            styles.lineStatusPayment,
            {
              backgroundColor: "#007BFF",
              left: 55,
            },
          ]}
        />
        <View
          style={[
            styles.lineStatusPayment,
            {
              backgroundColor: "rgba(217, 217, 217, 0.7)",
              left: 180,
            },
          ]}
        />

        <View style={styles.containerCrycleStatusPayment}>
          <View style={[styles.crycle, { backgroundColor: "#007BFF" }]} />
          <View style={[styles.crycle, { backgroundColor: "#007BFF" }]} />
          <View
            style={[
              styles.crycle,
              { backgroundColor: "rgba(217, 217, 217, 0.7)" },
            ]}
          />
        </View>

        <View style={styles.containerIconCheck}>
          <Image source={IconCheck} style={{ width: 10, height: 10 }} />
          {/* <Image source={IconCheck} style={{ width: 10, height: 10 }} />
          <Image source={IconCheck} style={{ width: 10, height: 10 }} /> */}
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
            30/12/2022 - 23:59 WIB
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
            1/1/2022 - 23:59 WIB
          </Text>
        </View>
      </View>

      <View style={styles.containerDetail}>
        <Text style={styles.txtTitle}>Transaction Details</Text>
        <View style={styles.containerItemDetail}>
          <View style={{ flex: 1, height: 100 }}>
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
              Monthly 50 Hours
            </Text>
            <Text
              style={{ fontFamily: "Poppins", fontSize: 12, fontWeight: "400" }}
            >
              Shared Office Desk
            </Text>
            <Text
              style={{ fontFamily: "Poppins", fontSize: 12, fontWeight: "400" }}
            >
              Rp 650.000
            </Text>
            <Text
              style={{ fontFamily: "Poppins", fontSize: 12, fontWeight: "400" }}
            >
              3 Month
            </Text>
            <Text
              style={{ fontFamily: "Poppins", fontSize: 12, fontWeight: "400" }}
            >
              Rp 1.950.000
            </Text>
            <Text
              style={{ fontFamily: "Poppins", fontSize: 12, fontWeight: "400" }}
            >
              1-1-2022
            </Text>
            <Text
              style={{ fontFamily: "Poppins", fontSize: 12, fontWeight: "400" }}
            >
              1-4-2022
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.containerPaymentMethod}>
        <Text style={[styles.txtTitle, { width: "100%" }]}>Payment Method</Text>
        <Image
          source={require("../../../assets/img/bca-bank-central-asia.png")}
          style={styles.imgBCA}
        />
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 30 }}
        >
          <Image
            source={require("../../../assets/icon/pngtree-email-vector-icon-png-image_355828.png")}
            style={styles.imgMail}
          />
          <Text>payment@kedasi.co.id</Text>
        </View>
      </View>

      <View style={styles.containerButton}>
        <TouchableOpacity
          style={[styles.containerItemButton, { backgroundColor: "#4099f7" }]}
        >
          <Text style={styles.txtButton}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity
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
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CheckOut;

const styles = StyleSheet.create({
  containerPaymentStatus: {
    width: "100%",
    height: 130,
    marginBottom: 10,
    backgroundColor: "white",
    borderBottomColor: "rgba(0, 0, 0, 0.10)",
    borderBottomWidth: 4,
  },
  lineStatusPayment: {
    width: 125,
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
    height: 210,
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
    height: 150,
    backgroundColor: "white",
    marginBottom: 10,
    borderBottomColor: "rgba(0, 0, 0, 0.10)",
    borderBottomWidth: 4,
    alignItems: "center",
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