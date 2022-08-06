import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';

import IconSearch from '../../../assets/icon/iconsearch.png';

const PickDate = () => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  return (
    <View style={{alignItems: 'center'}}>
      <DatePicker date={date} onDateChange={setDate} mode="date" />
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
        <Text
          style={{
            fontFamily: 'Poppins',
            fontStyle: 'normal',
            fontWeight: '500',
            fontSize: 20,
            color: 'rgba(0, 0, 0, 0.8)',
          }}>
          Duration
        </Text>
        <TextInput
          placeholder="Date"
          defaultValue="1"
          keyboardType="number-pad"
          maxLength={2}
          style={{
            width: 106,
            height: 42,
            marginLeft: 15,
            marginRight: 10,
            borderColor: 'rgba(0, 0, 0, 0.5)',
            borderWidth: 1,
            borderBottomColor: 'rgba(0, 0, 0, 0.1)',
            borderRightColor: 'rgba(0, 0, 0, 0.10)',
            borderBottomWidth: 3,
            borderRightWidth: 2,
            textAlign: 'center',
          }}
          //   value={email}
          //   onChangeText={}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: '500',
            color: 'rgba(0, 0, 0, 0.5)',
          }}>
          /month
        </Text>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: '#4099f7',
          width: 200,
          height: 40,
          marginTop: 25,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 42,
        }}
        onPress={() => setOpen(true)}>
        <Image source={IconSearch} style={{width: 20, height: 20}} />
        <Text
          style={{
            marginLeft: 10,
            fontSize: 20,
            fontWeight: 'bold',
            color: 'white',
          }}>
          Search
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PickDate;

const styles = StyleSheet.create({});
