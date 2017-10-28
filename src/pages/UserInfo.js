import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,  
  FlatList
} from 'react-native';

export default class UserInfo extends Component {
  static navigationOptions = {
    tabBarLabel: '我',
    headerLeft: null,
    tabBarIcon: ({ focused }) => {
      return focused ? <Image
        source={require('../asset/people_fill.png')}
        style={{width: 30, height: 30}}
      /> : <Image
        source={require('../asset/people.png')}
        style={{width: 30, height: 30}}
      /> 
    },
  };
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={[
            {key: 'Devin'},
            {key: 'Jackson'},
            {key: 'James'},
            {key: 'Joel'},
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})
