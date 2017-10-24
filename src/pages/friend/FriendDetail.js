import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView
} from 'react-native';

export default class FriendDetail extends Component {
  static navigationOptions = {
    title: 'name'
  };

  handleCall = () => {
    //do sth
  }

  handleChat =() => {
    this.props.navigation.navigate('Chat',  { id: '0001' })
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <View style={{width: 80,height: 80, backgroundColor:'#999'}}></View>
            <Text style={{color: '#fff'}}>detail</Text>
          </View>
          {[1,2,3,4].map(d => <View style={styles.listItme} key={d}>
            <Text>{d}</Text>
          </View>)}
        </ScrollView>
        <View style={{
          height: 45,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor:'#5B93FC',
          flexDirection:'row',
        }}>
          <View style={styles.button} onPress={this.handleCall}>
            <Text style={styles.buttonText}>btn1</Text>
          </View>
          <View style={styles.button} onPress={this.handleChat}>
            <Text style={styles.buttonText}>btn1</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   flexDirection: 'column'
  },
  header: {
    height: 180,
    backgroundColor:'#666',
    flexDirection:'column',
    justifyContent: 'space-around',
    alignItems:'center'
  },
  listItme: {
    backgroundColor: '#eee',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 5,
    paddingTop: 5,
    marginBottom: 5,
  },
  button: {
    flex:1,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff'
  }
})
