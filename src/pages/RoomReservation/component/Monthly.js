import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";

import IconCheck from "../../../assets/icon/check-solid.png";

const Monthly = ({ nav }) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <TouchableOpacity
        onPress={() => nav.navigate("PickDate", { type: "Monthly 1" })}
        style={{ width: "80%" }}
      >
        <View style={styles.cardContainer}>
          <Text style={{ fontSize: 10, fontWeight: "400", marginTop: 20 }}>
            25 HOURS
          </Text>
          <View style={{ flexDirection: "row", alignItems: "baseline" }}>
            <Text style={{ marginTop: 10, fontSize: 32, fontWeight: "400" }}>
              Rp 450.000
            </Text>
            <Text>/month</Text>
          </View>
          <View style={styles.lineItemCard} />
          <View style={{ width: "100%", marginLeft: 40 }}>
            <View style={styles.itemListContainer}>
              <Image source={IconCheck} style={styles.iconItem} />
              <Text>Desk space</Text>
            </View>
            <View style={styles.itemListContainer}>
              <Image source={IconCheck} style={styles.iconItem} />
              <Text>25 hours monthly access</Text>
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
              <Text>25 sheets free printing</Text>
            </View>
            <View style={styles.itemListContainer}>
              <Image source={IconCheck} style={styles.iconItem} />
              <Text>Personal Locker</Text>
            </View>
            <View style={styles.itemListContainer}>
              <Image source={IconCheck} style={styles.iconItem} />
              <Text>Free 2 hours meeting room</Text>
            </View>
            <View style={styles.itemListContainer}>
              <Image source={IconCheck} style={styles.iconItem} />
              <Text>1 guest pass</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => nav.navigate("PickDate", { type: "Monthly 2" })}
        style={{ width: "80%" }}
      >
        <View style={styles.cardContainer}>
          <Text style={{ fontSize: 10, fontWeight: "400", marginTop: 20 }}>
            50 HOURS
          </Text>
          <View style={{ flexDirection: "row", alignItems: "baseline" }}>
            <Text style={{ marginTop: 10, fontSize: 32, fontWeight: "400" }}>
              Rp 650.000
            </Text>
            <Text>/month</Text>
          </View>
          <View style={styles.lineItemCard} />
          <View style={{ width: "100%", marginLeft: 40 }}>
            <View style={styles.itemListContainer}>
              <Image source={IconCheck} style={styles.iconItem} />
              <Text>Desk space</Text>
            </View>
            <View style={styles.itemListContainer}>
              <Image source={IconCheck} style={styles.iconItem} />
              <Text>25 hours monthly access</Text>
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
              <Text>25 sheets free printing</Text>
            </View>
            <View style={styles.itemListContainer}>
              <Image source={IconCheck} style={styles.iconItem} />
              <Text>Personal Locker</Text>
            </View>
            <View style={styles.itemListContainer}>
              <Image source={IconCheck} style={styles.iconItem} />
              <Text>Free 2 hours meeting room</Text>
            </View>
            <View style={styles.itemListContainer}>
              <Image source={IconCheck} style={styles.iconItem} />
              <Text>2 guest pass</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => nav.navigate("PickDate", { type: "Monthly 3" })}
        style={{ width: "80%" }}
      >
        <View style={styles.cardContainer}>
          <Text style={{ fontSize: 10, fontWeight: "400", marginTop: 20 }}>
            100 HOURS
          </Text>
          <View style={{ flexDirection: "row", alignItems: "baseline" }}>
            <Text style={{ marginTop: 10, fontSize: 32, fontWeight: "400" }}>
              Rp 900.000
            </Text>
            <Text>/month</Text>
          </View>
          <View style={styles.lineItemCard} />
          <View style={{ width: "100%", marginLeft: 40 }}>
            <View style={styles.itemListContainer}>
              <Image source={IconCheck} style={styles.iconItem} />
              <Text>Desk space</Text>
            </View>
            <View style={styles.itemListContainer}>
              <Image source={IconCheck} style={styles.iconItem} />
              <Text>25 hours monthly access</Text>
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
              <Text>25 sheets free printing</Text>
            </View>
            <View style={styles.itemListContainer}>
              <Image source={IconCheck} style={styles.iconItem} />
              <Text>Personal Locker</Text>
            </View>
            <View style={styles.itemListContainer}>
              <Image source={IconCheck} style={styles.iconItem} />
              <Text>Free 2 hours meeting room</Text>
            </View>
            <View style={styles.itemListContainer}>
              <Image source={IconCheck} style={styles.iconItem} />
              <Text>3 guest pass</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => nav.navigate("PickDate", { type: "Monthly 4" })}
        style={{ width: "80%" }}
      >
        <View style={styles.cardContainer}>
          <Text style={{ fontSize: 10, fontWeight: "400", marginTop: 20 }}>
            UNLIMITED
          </Text>
          <View style={{ flexDirection: "row", alignItems: "baseline" }}>
            <Text style={{ marginTop: 10, fontSize: 32, fontWeight: "400" }}>
              Rp 1.200.000
            </Text>
            <Text>/month</Text>
          </View>
          <View style={styles.lineItemCard} />
          <View style={{ width: "100%", marginLeft: 40 }}>
            <View style={styles.itemListContainer}>
              <Image source={IconCheck} style={styles.iconItem} />
              <Text>Desk space</Text>
            </View>
            <View style={styles.itemListContainer}>
              <Image source={IconCheck} style={styles.iconItem} />
              <Text>Unlimited monthly access</Text>
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
              <Text>150 sheets free printing</Text>
            </View>
            <View style={styles.itemListContainer}>
              <Image source={IconCheck} style={styles.iconItem} />
              <Text>Personal Locker</Text>
            </View>
            <View style={styles.itemListContainer}>
              <Image source={IconCheck} style={styles.iconItem} />
              <Text>Free 5 hours meeting room</Text>
            </View>
            <View style={styles.itemListContainer}>
              <Image source={IconCheck} style={styles.iconItem} />
              <Text>4 guest pass</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <View style={{ width: "100%", height: 10 }} />
    </ScrollView>
  );
};

export default Monthly;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FEF7EF",
    alignItems: "center",
  },
  cardContainer: {
    // width: 300,
    // height: 350,
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
