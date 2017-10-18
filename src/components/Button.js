import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  Text
} from 'react-native';

export default (props) =><TouchableOpacity
  {...props}
  style={styles.button}
  underlayColor='#fff'>
  <Text style={styles.text}>{props.title}</Text>
</TouchableOpacity>

const styles = StyleSheet.create({
  button:{
    width:'80%',
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#2B8CF4',
    borderRadius:10
  },
  text:{
    color:'#fff',
    textAlign:'center'
  },
});