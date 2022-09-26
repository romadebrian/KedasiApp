import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  KeyboardAvoidingView,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";

import NoImage from "../../assets/img/no-image.png";

var DeviceWidth = Dimensions.get("window").width; //full width
var DeviceHeight = Dimensions.get("window").height; //full height

var ChatHeight = (DeviceHeight * 80) / 100;

const Message = () => {
  const [modeType, setModeType] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
        Keyboard.dismiss();
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView style={{ flex: 1 }}>
        <View style={{ marginHorizontal: 5 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Kedasi</Text>
            <Text>Mon, 10 Jan 2022 17:36:43 GMT</Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              //   backgroundColor: "red",
            }}
          >
            <Image
              //   source={NoImage}
              source={require("../../assets/img/kedasi_logo.png")}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                marginRight: 10,
              }}
            />
            <Text
              style={{
                height: 40,
                flex: 1,
                borderRadius: 10,
                backgroundColor: "#d2d6de",
                textAlignVertical: "center",
                paddingLeft: 5,
              }}
            >
              Hallo selamat siang
            </Text>
          </View>
        </View>

        <View style={{ marginHorizontal: 5 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text>Mon, 10 Jan 2022 17:37:10 GMT</Text>
            <Text style={{ fontWeight: "bold" }}>Roma Debrian</Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              //   backgroundColor: "red",
            }}
          >
            <Text
              style={{
                height: 40,
                flex: 1,
                borderRadius: 10,
                color: "white",
                backgroundColor: "#007bff",
                textAlignVertical: "center",
                textAlign: "right",
                paddingRight: 5,
              }}
            >
              Selamat siang
            </Text>
            <Image
              //   source={NoImage}
              source={require("../../assets/img/romadebrian.png")}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                marginLeft: 10,
              }}
            />
          </View>
        </View>
      </ScrollView>

      <View style={{ flexDirection: "row", margin: 5 }}>
        <TextInput
          placeholder="Type Messege .."
          style={{
            flex: 1,
            height: 40,
            borderWidth: 1,
            borderColor: "#ced4da",
          }}
          onPress={() => setModeType(true)}
          //   value="{password}"
          //   onChangeText={setPassword}
        />

        <TouchableOpacity>
          <Text
            style={{
              flex: 1,
              height: 40,
              borderColor: "#ced4da",
              borderTopWidth: 1,
              borderRightWidth: 1,
              borderBottomWidth: 1,
              color: "white",
              backgroundColor: "#007bff",
              textAlignVertical: "center",
              paddingHorizontal: 10,
            }}
          >
            Send
          </Text>
        </TouchableOpacity>
      </View>
      {isKeyboardVisible ? <View style={{ width: 50, height: 80 }} /> : null}
    </KeyboardAvoidingView>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around",
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12,
  },
});
