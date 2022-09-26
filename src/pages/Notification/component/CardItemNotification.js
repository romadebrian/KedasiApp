import { StyleSheet, View, TouchableOpacity } from "react-native";
import React from "react";
import { Text, Card } from "@rneui/themed";

const CardItemNotification = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
      // onPress={() =>
      //   navigation.navigate("CheckOut", { orderID: dataTansaction.OrderId })
      // }
      >
        <Card>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <View
              style={{
                width: "90%",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#b8b8b8", fontSize: 12 }}>
                {props.DateValue}
              </Text>
              <Text style={{ marginTop: 10 }}>{props.NotificationValue}</Text>
            </View>

            <View
              style={{
                width: "10%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {props.Status === "Unread" ? (
                <View
                  style={{
                    backgroundColor: "#28a745",
                    width: 20,
                    height: 20,
                    borderWidth: 0,
                    borderRadius: 10,
                  }}
                />
              ) : null}
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    </View>
  );
};

export default CardItemNotification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: -8,
    marginVertical: -5,
  },
});
