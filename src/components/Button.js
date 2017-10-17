import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button,
  TouchableHighlight
} from 'react-native';

export default (props) => <TouchableHighlight>
  <Button
    style={styles.button}
    {...props}
  />
</TouchableHighlight>

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    color: 'green'
  }
});