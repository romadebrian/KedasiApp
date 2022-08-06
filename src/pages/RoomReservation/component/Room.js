import {Text, StyleSheet, View, ScrollView} from 'react-native';
import React, {Component} from 'react';
import CardRoom from '../../../components/CardRoom';

export default class Room extends Component {
  render() {
    return (
      <ScrollView style={{backgroundColor: '#FEF7EF'}}>
        <CardRoom />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({});
