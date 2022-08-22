import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  BackHandler,
  LogBox,
} from "react-native";
import React, { Component, useEffect, useState } from "react";
import CardRoom from "../../../components/CardRoom";

const Room = ({ route, navigation }) => {
  const [dataRoom] = useState([
    {
      id: "ROOM 000",
      img: "room1",
      title: "Shared Office Desk",
      desc: "Shared office room with sitting position facing each other",
      people: "6",
    },
    {
      id: "ROOM 001",
      img: "room1",
      title: "Shared Office Desk",
      desc: "Shared office room with sitting position facing each other",
      people: "6",
    },
    {
      id: "ROOM 002",
      img: "room2",
      title: "Shared Office Desk",
      desc: "Office by sitting facing the wall",
      people: "4",
    },
    {
      id: "ROOM 003",
      img: "room3",
      title: "Shared Office Desk",
      desc: "Aesthetic office space",
      people: "5",
    },
    {
      id: "ROOM 004",
      img: "room3",
      title: "Shared Office Desk",
      desc: "Test 4",
      people: "5",
    },
    {
      id: "ROOM 005",
      img: "room3",
      title: "Shared Office Desk",
      desc: "Test 5",
      people: "5",
    },
  ]);

  useEffect(() => {
    console.log(route);
    console.log(route.params.DataAvalRoom);
    console.log(dataRoom);

    const backAction = () => {
      navigation.navigate("PickDate", { type: route.params.type });
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  });

  LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state",
  ]);

  return (
    <ScrollView style={{ backgroundColor: "#FEF7EF" }}>
      {route.params.DataAvalRoom.map((data) => {
        const dataDetail = dataRoom.find(({ id }) => id === data);
        console.log(dataDetail);
        return (
          <CardRoom
            key={data}
            img={dataDetail.img}
            title={dataDetail.title}
            desc={dataDetail.desc}
            people={dataDetail.people}
            nav={navigation}
            ListDetailRoom={dataRoom}
            room={data}
            dataBack={{
              DataAvalRoom: route.params.DataAvalRoom,
              type: route.params.type,
              duration: route.params.duration,
              pickDate: route.params.pickDate,
              endDate: route.params.endDate,
            }}
          />
        );
      })}
    </ScrollView>
  );
};

export default Room;

const styles = StyleSheet.create({});
