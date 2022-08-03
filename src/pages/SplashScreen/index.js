import {Text, StyleSheet, View, Image} from 'react-native';
import React, {Component} from 'react';

import Logo from '../../assets/img/Logo&Name.png';

export default class SplashScreen extends Component {
  render() {
    return (
      <View style={{backgroundColor: '#FEF7EF', height: '100%'}}>
        <View style={{alignItems: 'center'}}>
          <Image source={Logo} style={styles.logoKedasi} />
          <Text style={{paddingTop: 60}}>Loading 100%</Text>
          <View style={styles.loading} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logoKedasi: {
    width: 330,
    height: 90,
    marginTop: 228,
  },
  loading: {
    paddingTop: 13,
    borderBottomColor: '#F5D942',
    borderBottomWidth: 2,
    width: 200,
  },
});
