import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput
} from 'react-native';


export default (props) => <View style={styles.input}>
  <TextInput style={styles.text} {...props}/>
</View>

const styles = StyleSheet.create({
  input:{
    marginTop:10,
    marginBottom:10,
    paddingTop:10,
    paddingBottom:10,
    width:'80%',
    borderBottomWidth: 1,
    borderBottomColor:'#DBDCE0',
  },
  text:{
    fontSize:15,
  }
});