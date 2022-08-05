import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {Component} from 'react';

import Header from '../../components/Header';
import SideNav from '../../components/SideNav';

export default class Dashboard extends Component {
  state = {
    showMenu: true,
  };

  componentDidMount() {
    // console.log('trest');
  }

  handleShowMenu = () => {
    this.setState({showMenu: true});
  };

  HandleHideMenu = () => {
    this.setState({showMenu: false});
  };

  render() {
    return (
      <View style={{backgroundColor: '#FEF7EF', height: '100%', width: '100%'}}>
        {/* Header */}
        <Header showMenu={() => this.handleShowMenu()} />

        {/* List Order */}
        <ScrollView style={{position: 'relative'}}>
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
        {/* Side Nav */}
        {this.state.showMenu ? (
          <SideNav hideMenu={() => this.HandleHideMenu()} />
        ) : null}
        {/* <SideNav /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ////////////////////
  //   Item Order
  ////////////////////
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
