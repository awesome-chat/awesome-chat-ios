import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList
} from 'react-native';

import {
  FriendItem,
  DepartmentItem
} from './FriendItem';

// [
//   {
//     type: 1,
//     name: 'xxx'
//   },
//   {
//     type: 2,
//     name: 'xxx',
//     child: [
//       {
//         type: 1,
//         name: 'xxx'
//       }
//     ]
//   },
//   {
//     type: 2,
//     name: 'xxx'
//   }
// ]

export default class FriendList extends Component {
  static navigationOptions = {
    title: '通讯录',
    tabBarLabel: '通讯录',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../asset/联系人.png')}
        style={{width: 25, height: 25}}
      />
    )
  };

  // transform = (data) => {
  //   data.map(d => {
  //     if(d.type === 1){
  //       return <FriendItem />
  //     }else if(d.type === 2){
  //       return <DepartmentItem>
  //         {d.child.map(d => this.transform(d.child))}
  //       </DepartmentItem>
  //     }
  //   })
  // }

  render() {
    return (
      <View style={styles.container}>
        <DepartmentItem>
          <Text>123</Text>
        </DepartmentItem>
        <FlatList
          data={[
            {key: 'Devin'}, 
            {key: '111'}, 
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
