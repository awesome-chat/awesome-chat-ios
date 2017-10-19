import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList
} from 'react-native';

export default class FriendList extends Component {
  static navigationOptions = {
    tabBarLabel: '通讯录',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../asset/联系人.png')}
        style={{width: 25, height: 25}}
      />
    )
  };
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={[
            {key: 'Devin'}, 
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
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})
