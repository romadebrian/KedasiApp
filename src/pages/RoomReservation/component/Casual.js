import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect } from "react";

import IconCheck from "../../../assets/icon/check-solid.png";

const Casual = ({ nav }) => {
  useEffect(() => {
    console.log("Log casual", nav);
  });
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        onPress={() => nav.navigate("PickDate", { type: "Casual 1" })}
        // onPress={() => nav.jumpTo("PickDate", { type: "Casual 1" })}
        style={{ width: "80%" }}
      >
        <View style={styles.cardContainer}>
          <Text style={{ fontSize: 10, fontWeight: "400", marginTop: 20 }}>
            HOURLY
          </Text>
          <View style={{ flexDirection: "row", alignItems: "baseline" }}>
            <Text style={{ marginTop: 10, fontSize: 32, fontWeight: "400" }}>
              Rp 30.000
            </Text>
            <Text>/hour</Text>
          </View>
          <View style={styles.lineItemCard} />
          <View style={{ width: "100%", marginLeft: 40 }}>
            <View style={styles.itemListContainer}>
              <Image source={IconCheck} style={styles.iconItem} />
              <Text>Desk space</Text>
            </View>
            <View style={styles.itemListContainer}>
              <Image source={IconCheck} style={styles.iconItem} />
              <Text>High speed wifi internet</Text>
            </View>
            <View style={styles.itemListContainer}>
              <Image source={IconCheck} style={styles.iconItem} />
              <Text>Free flow coffee & tea</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => nav.navigate("PickDate", { type: "Casual 2" })}
        style={{ width: "80%" }}
      >
        <View style={styles.cardContainer}>
          <Text style={{ fontSize: 10, fontWeight: "400", marginTop: 20 }}>
            DAILY
          </Text>
          <View style={{ flexDirection: "row", alignItems: "baseline" }}>
            <Text style={{ marginTop: 10, fontSize: 32, fontWeight: "400" }}>
              Rp 100.000
            </Text>
            <Text>/day</Text>
          </View>
          <View style={styles.lineItemCard} />
          <View style={{ width: "100%", marginLeft: 40 }}>
            <View style={styles.itemListContainer}>
              <Image source={IconCheck} style={styles.iconItem} />
              <Text>Desk space</Text>
            </View>
            <View style={styles.itemListContainer}>
              <Image source={IconCheck} style={styles.iconItem} />
              <Text>High speed wifi internet</Text>
            </View>
            <View style={styles.itemListContainer}>
              <Image source={IconCheck} style={styles.iconItem} />
              <Text>Free flow coffee & tea</Text>
            </View>
            <View style={styles.itemListContainer}>
              <Image source={IconCheck} style={styles.iconItem} />
              <Text>20 sheets free printing</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => nav.navigate("PickDate", { type: "Casual 3" })}
        style={{ width: "80%" }}
      >
        <View style={styles.cardContainer}>
          <Text style={{ fontSize: 10, fontWeight: "400", marginTop: 20 }}>
            DAILY (STUDENT)
          </Text>
          <View style={{ flexDirection: "row", alignItems: "baseline" }}>
            <Text style={{ marginTop: 10, fontSize: 32, fontWeight: "400" }}>
              Rp 75.000
            </Text>
            <Text>/hour</Text>
          </View>
          <View style={styles.lineItemCard} />
          <View style={{ width: "100%", marginLeft: 40 }}>
            <View style={styles.itemListContainer}>
              <Image source={IconCheck} style={styles.iconItem} />
              <Text>Desk space</Text>
            </View>
            <View style={styles.itemListContainer}>
              <Image source={IconCheck} style={styles.iconItem} />
              <Text>High speed wifi internet</Text>
            </View>
            <View style={styles.itemListContainer}>
              <Image source={IconCheck} style={styles.iconItem} />
              <Text>Free flow coffee & tea</Text>
            </View>
            <View style={styles.itemListContainer}>
              <Image source={IconCheck} style={styles.iconItem} />
              <Text>20 sheets free printing</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <View style={{ width: "100%", height: 10 }} />
    </ScrollView>
  );
};

export default Casual;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FEF7EF",
    alignItems: "center",
  },
  cardContainer: {
    // width: 300,
    // height: 250,
    backgroundColor: "white",
    marginTop: 10,
    paddingBottom: 20,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "rgba(0, 0, 0, 0.15)",
    borderBottomColor: "rgba(0, 0, 0, 0.20)",
    borderBottomWidth: 4,
  },
  lineItemCard: {
    width: 50,
    height: 3,
    backgroundColor: "#007BFF",
    marginTop: 10,
  },
  itemListContainer: { flexDirection: "row", marginBottom: 10 },
  iconItem: { width: 15, height: 15, marginRight: 10 },
});
