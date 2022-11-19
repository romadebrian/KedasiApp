import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const ChatAdmin = (props) => {
  // console.log(props);
  return (
    <View style={{ marginHorizontal: 5 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontWeight: "bold" }}>Kedasi</Text>
        <Text>{props.Data.Waktu}</Text>
      </View>
      <View style={styles.rowSecond}>
        <Image
          //   source={NoImage}
          source={require("../../../assets/img/kedasi_logo.png")}
          style={styles.img}
        />
        <Text style={styles.txtPesan}>{props.Data.Pesan}</Text>
      </View>
    </View>
  );
};

export default ChatAdmin;

const styles = StyleSheet.create({
  rowSecond: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    //   backgroundColor: "red",
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  txtPesan: {
    minHeight: 40,
    flex: 1,
    borderRadius: 10,
    backgroundColor: "#d2d6de",
    textAlignVertical: "center",
    paddingLeft: 5,
  },
});
