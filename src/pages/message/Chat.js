import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  ScrollView
} from 'react-native';

export default class Chat extends Component {
  static navigationOptions = {
    title: 'Name',
  };
  render() {
    return (
      <ScrollView
        keyboardShouldPersistTaps={true}
        style={styles.container}
      >
        <View style={{
          height: 900,
          backgroundColor: 'grey'
        }}></View>
        <View style={{
          height: 50,
          paddingLeft: 10,
          paddingRight: 10,
          backgroundColor: 'red'
          // justifyContent: 'center',
          // alignItems: 'center'
        }}>
          <TextInput
            style={{
              width: '100%',
              height: 30,
            }}
            editable = {true}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 500
  }
})
