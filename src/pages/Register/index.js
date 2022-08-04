import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const Register = () => {
  return (
    <View style={{backgroundColor: '#FEF7EF', height: '100%'}}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.textRegis}>REGISTRATION</Text>
        <TextInput
          placeholder="Full Name"
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
          placeholder="Password"
          secureTextEntry={true}
          style={[styles.input]}
          //   value={email}
          //   onChangeText={}
        />
        <TextInput
          placeholder="Confirm Password"
          secureTextEntry={true}
          style={[styles.input]}
          //   value={email}
          //   onChangeText={}
        />
        <TouchableOpacity style={styles.BTNRegis}>
          <Text style={styles.BTNText}>REGISTER</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{width: '100%'}}>
          <Text style={styles.TextToLogin}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  textRegis: {
    marginTop: 125,
    marginBottom: 40,
    // fontWeight: 'bold',
    fontFamily: 'PTSerifCaption-Regular',
    fontSize: 36,
  },
  input: {
    width: 300,
    height: 50,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 18,
    borderColor: 'rgba(0, 0, 0, 0.3)',
    fontFamily: 'Poppins',
  },
  BTNRegis: {
    marginTop: 13,
    width: 310,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#4592fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  BTNText: {
    color: 'white',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 25,
    lineHeight: 24,
  },
  TextToLogin: {
    fontWeight: 'bold',
    marginTop: 15,
    marginStart: '10%',
    color: '#4592fa',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 13,
  },
});
