import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

import IconPeople from '../../assets/icon/user-group-solid.png';
import IconArrow from '../../assets/icon/circle-arrow-right-solid.png';
import Room1 from '../../assets/img/room1.jpg';

const CardRoom = () => {
  return (
    <View style={{alignItems: 'center', marginTop: 15}}>
      <TouchableOpacity
        style={{
          width: '90%',
          height: 250,
          backgroundColor: 'white',
        }}>
        <Image
          source={Room1}
          style={{width: '100%', height: 160, resizeMode: 'stretch'}}
        />
        <Text
          style={{
            marginTop: 12,
            marginLeft: 15,
            fontFamily: 'Poppins',
            fontSize: 14,
            fontWeight: 'bold',
          }}>
          Shared Office Desk
        </Text>
        <Text
          style={{
            marginTop: 3,
            marginLeft: 15,
            fontFamily: 'Poppins',
            fontSize: 10,
            fontWeight: '400',
          }}>
          Shared office room with sitting position facing each other
        </Text>
        <View
          style={{
            // width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
            marginLeft: 15,
            // backgroundColor: 'red',
          }}>
          <View style={{flexDirection: 'row'}}>
            <Image source={IconPeople} style={{width: 20, height: 20}} />
            <Text
              style={{
                marginLeft: 7,
                fontFamily: 'Poppins',
                fontSize: 18,
                fontWeight: 'bold',
                color: 'black',
              }}>
              6
            </Text>
          </View>
          <View
            style={{
              backgroundColor: '#4099f7',
              width: 88,
              height: 25,
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <Text
              style={{
                color: 'white',
                marginLeft: 8,
                marginRight: 4,
                fontFamily: 'Poppins',
                fontSize: 12,
                fontWeight: '400',
              }}>
              More Info
            </Text>
            <Image source={IconArrow} style={{width: 13, height: 13}} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CardRoom;

const styles = StyleSheet.create({});
