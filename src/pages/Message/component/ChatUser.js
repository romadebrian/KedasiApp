import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const ChatUser = (props) => {
  //   console.log(props);
  return (
    <View style={{ marginHorizontal: 5 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text>{props.Data.Waktu}</Text>
        <Text style={{ fontWeight: "bold" }}>{props.Name}</Text>
      </View>
      <View style={styles.rowSecond}>
        <Text style={styles.txtPesan}>{props.Data.Pesan}</Text>
        {props.Photo === "" ? (
          <Image
            //   source={NoImage}
            source={require("../../../assets/img/no-image.png")}
            style={styles.img}
          />
        ) : (
          <Image
            //   source={NoImage}
            source={{ uri: props.Photo }}
            style={styles.img}
          />
        )}
      </View>
    </View>
  );
};

export default ChatUser;

const styles = StyleSheet.create({
  rowSecond: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    //   backgroundColor: "red",
  },
  txtPesan: {
    height: 40,
    flex: 1,
    borderRadius: 10,
    color: "white",
    backgroundColor: "#007bff",
    textAlignVertical: "center",
    textAlign: "right",
    paddingRight: 5,
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
  },
});
