import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Text, Card, Button, Icon } from "@rneui/themed";

const CardItemTransaction = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
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
                Order: #ORD0038
              </Text>
              <Text>BULANAN 50JAM</Text>
              <Text style={{ color: "#b8b8b8", fontSize: 12 }}>ROOM 005</Text>
            </View>
            <View
              style={{
                flex: 1.1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text>Total</Text>
              <Text>Rp 3,250,000</Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ textAlign: "center" }}>Menunggu Pembayaran</Text>
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
  },
});
