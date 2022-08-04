import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {Component} from 'react';

import Bars from '../../assets/img/bars-solid.png';
import Bel from '../../assets/img/bell-regular.png';

export default class Dashboard extends Component {
  render() {
    return (
      <View style={{backgroundColor: '#FEF7EF', height: '100%', width: '100%'}}>
        <View style={styles.header}>
          <View style={styles.containerBtnMenu}>
            <TouchableOpacity>
              <Image
                source={Bars}
                style={{width: 20, height: 20, marginLeft: 12, marginRight: 10}}
              />
            </TouchableOpacity>
            <Text style={{fontSize: 14, fontWeight: '500'}}>Dashboard</Text>
          </View>
          <View style={styles.containerBel}>
            <TouchableOpacity style={{flexDirection: 'row-reverse'}}>
              <Image source={Bel} style={styles.iconLonceng} />
              <Text style={styles.TextLonceng}>99</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity>
              <View
                style={[
                  styles.ContainerItem,
                  styles.shadow,
                  {backgroundColor: '#28A745'},
                ]}>
                <Text style={[styles.TitleItem, {color: 'white'}]}>
                  Active Orders
                </Text>
                <Text style={[styles.DetailItem, {color: 'white'}]}>
                  ROOM 001 MONTHLY 50 HOURS
                </Text>
                <Text style={[styles.DetailTimeItem, {color: 'white'}]}>
                  1/01/2022 - 30/12/2022
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View
                style={[
                  styles.ContainerItem,
                  styles.shadow,
                  {backgroundColor: '#FFC107'},
                ]}>
                <Text style={[styles.TitleItem, {color: 'black'}]}>
                  Unpaid Orders
                </Text>
                <Text style={[styles.DetailItem, {color: 'black'}]}>
                  ROOM 001 MONTHLY 50 HOURS
                </Text>
                <Text style={[styles.DetailTimeItem, {color: 'black'}]}>
                  Payment Due : 30/12/2022
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View
                style={[
                  styles.ContainerItemUnorder,
                  styles.shadow,
                  {backgroundColor: '#6C757D'},
                ]}>
                <Text style={[styles.TitleItem, {color: 'white'}]}>
                  You don't have orders
                </Text>
                <Text style={[styles.DetailItem, {color: 'white'}]}>
                  Order Now
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    // width: '100%',
    // height: 50,
    // backgroundColor: 'white',
    flexDirection: 'row',
    // justifyContent: 'center',
  },
  containerBel: {
    //   backgroundColor: 'blue',
    flex: 1,
    height: 50,
    justifyContent: 'center',
  },
  containerBtnMenu: {
    //   backgroundColor: 'green',
    flex: 1,
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconLonceng: {
    width: 20,
    height: 20,
    marginEnd: 20,
    resizeMode: 'stretch',
  },
  TextLonceng: {
    width: 16,
    height: 13,
    fontSize: 10,
    backgroundColor: 'rgba(255, 193, 7, 0.7)',
    //   padding: 4,
    textAlign: 'center',
    borderRadius: 5,
    position: 'absolute',
    bottom: 15,
    left: 12,
    fontFamily: 'Poppins',
    fontWeight: 'bold',
  },
  ContainerItem: {
    width: 300,
    height: 150,
    borderRadius: 10,
    marginTop: 10,
  },
  ContainerItemUnorder: {
    width: 300,
    height: 100,
    borderRadius: 10,
    marginTop: 10,
  },
  TitleItem: {
    marginTop: 11,
    marginLeft: 13,
    fontFamily: 'Poppins',
    fontSize: 13,
    fontWeight: 'bold',
    // color: 'white',
  },
  DetailItem: {
    marginTop: 23,
    marginLeft: 13,
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '400',
    // color: 'white',
  },
  DetailTimeItem: {
    marginTop: 13,
    marginLeft: 13,
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '400',
    // color: 'white',
  },
  shadow: {
    borderColor: '#b8b8b8',
    borderWidth: 3,
    overflow: 'hidden',
    shadowColor: '#b8b8b8',
    shadowRadius: 10,
    shadowOpacity: 1,
  },
});
