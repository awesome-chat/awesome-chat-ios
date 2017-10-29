import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight
} from 'react-native';


export default (props) => <TouchableHighlight underlayColor='#eee' style={styles.con} onPress={()=>{}}>
  <View style={styles.input}>
    <Image style={{width: 15, height: 15}} source={require('../asset/search.png')} />
    <Text style={styles.text}>搜索</Text>
  </View>
</TouchableHighlight>

const styles = StyleSheet.create({
  con: {
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
  },
  input:{
    backgroundColor: '#fff',
    width: '96%',
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:8,
    marginBottom:8,
    paddingTop: 4,
    paddingBottom: 4,
  },
  text:{
    color: '#8a8a8a',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 4,
  }
});