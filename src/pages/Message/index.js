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
  BackHandler,
} from "react-native";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { getDatabase, ref, onValue, push, set } from "firebase/database";

import NoImage from "../../assets/img/no-image.png";
import ChatUser from "./component/ChatUser";
import ChatAdmin from "./component/ChatAdmin";
import { FormattingDateTime } from "../../config/formattingDateTime";

import store from "../../config/redux";
import { setCurentPage } from "../../config/someGlobalData";

var DeviceWidth = Dimensions.get("window").width; //full width
var DeviceHeight = Dimensions.get("window").height; //full height

var ChatHeight = (DeviceHeight * 80) / 100;

const Message = ({ navigation }) => {
  const globalState = useSelector((state) => state.dataPengguna);

  const [modeType, setModeType] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [listMessage, listMessagesetListMessge] = useState([]);
  const [valMessege, setValMessage] = useState([]);

  const inputRef = useRef(null);

  useFocusEffect(
    useCallback(() => {
      // console.log(globalState);
      if (!isLoad) {
        console.log("Is Load");
        handleGetMessege();
        store.dispatch(setCurentPage("Message"));
        setIsLoad(true);
      }

      const backAction = () => {
        navigation.navigate("Dashboard");
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", backAction);

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", backAction);
      };
    })
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setIsLoad(false);
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    FormattingDateTime(new Date());

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

  const handleGetMessege = () => {
    const userID = globalState.uid;
    var ListO = "";

    const db = getDatabase();

    const starCountRef = ref(db, `chat/${userID}`);
    // const starCountRef = ref(db, `chat/zAhbiHR06ZQbwSdTiT6ftB91BH62`);
    onValue(starCountRef, async (snapshot) => {
      const ListT = [];
      if (snapshot.exists()) {
        Object.keys(snapshot.val()).map((key) => {
          ListT.push({
            id: key,
            data: snapshot.val()[key],
          });

          // console.log(ListT);
        });

        listMessagesetListMessge(ListT);
        ListO = ListT;
      } else {
        console.log("No data available");
      }

      // console.log(ListT);
      return ListT;
    });

    return ListO;
  };

  const handleSendMessage = () => {
    var idUser = globalState.uid;
    var DateTimeNow = FormattingDateTime(new Date());

    if (valMessege != "") {
      const db = getDatabase();
      const addOrder = ref(db, `chat/${idUser}`);
      const newOrderRef = push(addOrder);

      set(newOrderRef, {
        IDUser: idUser,
        Pesan: valMessege,
        Waktu: DateTimeNow,
      });

      handleCreateNotificationToAdmin();
      setValMessage("");
    }
  };

  const handleCreateNotificationToAdmin = () => {
    var idUser = globalState.uid;
    var DateTimeNow = FormattingDateTime(new Date());

    // console.log(DateTimeNow);

    const db = getDatabase();
    const addNotification = ref(db, `notifikasi`);
    const newNotificationRef = push(addNotification);

    set(newNotificationRef, {
      Aksi: "Chat",
      Isi: "Anda mendapat pesan baru",
      Judul: "Pesan Baru",
      Status: "Unread",
      Target: idUser,
      Meta_Data: idUser,
      Date: DateTimeNow,
    });
  };

  return (
    <KeyboardAvoidingView
      // behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView style={{ flex: 1 }}>
        {listMessage.length > 0
          ? listMessage.map((MessageData) => {
              // console.log(MessageData);
              if (MessageData.data.IDUser === globalState.uid) {
                return (
                  <View key={MessageData.id}>
                    {/* Name User and Photo user based on global state for use current name and foto */}
                    <ChatUser
                      Data={MessageData.data}
                      Name={globalState.displayName}
                      Photo={globalState.photoURL}
                    />
                  </View>
                );
              } else {
                return (
                  <View key={MessageData.id}>
                    <ChatAdmin Data={MessageData.data} />
                  </View>
                );
              }
            })
          : null}
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
          value={valMessege}
          onChangeText={setValMessage}
        />

        <TouchableOpacity onPress={handleSendMessage}>
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
      {/* {isKeyboardVisible ? <View style={{ width: 50, height: 0 }} /> : null} */}
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
