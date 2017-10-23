import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList
} from 'react-native';

export class FriendItem extends Component {
  render() {
    return (
      <View style={styles.container}>
        
      </View>
    );
  }
}

export class DepartmentItem extends Component {
  render() {
    console.log(this.props)
    return (
      <View style={styles.container}>
        {this.props.children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
  }
})