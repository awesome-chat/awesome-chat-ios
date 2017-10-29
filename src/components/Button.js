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
  style={{
    width: '80%',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#2B8CF4',
    borderRadius: 5,
    ...props.style,
  }}
  underlayColor='#fff'>
  <Text style={styles.text}>{props.title}</Text>
</TouchableOpacity>

const styles = StyleSheet.create({
  text:{
    fontSize: 16,
    fontWeight: 'bold',  
    color:'#fff',
    textAlign:'center'
  },
});