import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {Component} from 'react';

import BackGound from '../../assets/img/bg.jpeg';
import ExamplePhotoProfile from '../../assets/img/romadebrian.png';

export default class Profile extends Component {
  render() {
    return (
      <View
        style={{
          backgroundColor: '#FEF7EF',
          alignItems: 'center',
          height: '100%',
        }}>
        <Image source={BackGound} style={{width: '100%', height: 150}} />
        <Image
          source={ExamplePhotoProfile}
          style={{
            width: 145,
            height: 145,
            borderRadius: 145 / 2,
            position: 'absolute',
            top: 65,
          }}
        />
        <Text style={{marginTop: 65, marginBottom: 20}}>Roma Debrian</Text>
        <TextInput
          placeholder="Name"
          style={[styles.input]}
          //   value={email}
          //   onChangeText={}
        />
        <TextInput
          placeholder="Email"
          style={[styles.input]}
          //   value={email}
          //   onChangeText={}
        />
        <TextInput
          placeholder="Phone Number"
          style={[styles.input]}
          //   value={email}
          //   onChangeText={}
        />
        <TextInput
          placeholder="Address"
          style={[styles.inputAddress]}
          //   value={email}
          //   onChangeText={}
        />

        <View
          style={{
            width: 300,
            marginBottom: 10,
            flexDirection: 'row',
          }}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{
                width: 80,
                height: 40,
                marginRight: 5,
                backgroundColor: '#007BFF',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Poppins',
                  fontWeight: 'bold',
                  fontSize: 16,
                }}>
                SAVE
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 80,
                height: 40,
                backgroundColor: '#FFC107',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins',
                  fontWeight: 'bold',
                  fontSize: 16,
                }}>
                CANCEL
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{width: '45%', flexDirection: 'row-reverse'}}>
            <TouchableOpacity
              style={{
                width: 80,
                height: 40,
                backgroundColor: '#28A745',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontFamily: 'Poppins',
                  fontWeight: 'bold',
                  fontSize: 13,
                }}>
                Change Password
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 13,
    width: 300,
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 18,
    borderColor: 'rgba(0, 0, 0, 0.3)',
    fontFamily: 'Poppins',
    fontSize: 16,
    // textAlignVertical: 'center',
  },
  inputAddress: {
    marginBottom: 13,
    width: 300,
    height: 100,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 18,
    borderColor: 'rgba(0, 0, 0, 0.3)',
    fontFamily: 'Poppins',
    fontSize: 16,
    textAlignVertical: 'top',
  },
});
