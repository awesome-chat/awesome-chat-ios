import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,  
  FlatList,
  ScrollView
} from 'react-native';
import Button from '../components/Button';

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

    const group1 = [
      {name:'我的资料',id:1},
      {name:'我的工牌',id:2},
    ]
    const group2 = [
      {name:'我的请假',id:1},
      {name:'一键打卡',id:2},
    ]
    const group3 = [
      {name:'修改密码',id:1},
      {name:'意见反馈',id:2},
      {name:'设置',id:3},
    ]
    return (
      <ScrollView>
        <View style={styles.header}>
          <View style={{width: 80,height: 80, backgroundColor:'#fff', marginTop: 30, borderRadius: 10}}></View>
          <View style={{marginTop: 10, flexDirection: 'row',}}>
            <Text style={{
              color: '#fff',
              fontSize: 20,
              fontWeight: 'bold',
              }}>name</Text>
          </View>
        </View>
        <View style={styles.group}>
          {group1.map(d => <View style={styles.groupItem} key={d.id}>
            <Text style={styles.itemWord}>{d.name}</Text>
            <Image style={styles.itemImage} source={require('../asset/enter.png')} />
          </View>)}
        </View>
        <View style={styles.group}>
          {group2.map(d => <View style={styles.groupItem} key={d.id}>
            <Text style={styles.itemWord}>{d.name}</Text>
            <Image style={styles.itemImage} source={require('../asset/enter.png')} />
          </View>)}
        </View>
        <View style={styles.group}>
          {group3.map(d => <View style={styles.groupItem} key={d.id}>
            <Text style={styles.itemWord}>{d.name}</Text>
            <Image style={styles.itemImage} source={require('../asset/enter.png')} />
          </View>)}
        </View>
        <View style={{
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Button
            onPress={() => this.props.navigation.navigate('MessageList')}
            title="退出登录"
            style={{
              marginTop: 20,
              width: '90%',
              backgroundColor: 'red',
            }}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    height: 160,
    backgroundColor: '#1D3548',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  img: {
    marginLeft: 5,
    marginTop: 5,
    width: 18,
    height: 18,
  },
  group: {
    marginTop: 10,
    flex: 1,
    flexDirection: 'column',
  },
  groupItem: {
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 12,
    flexDirection: 'row',
    borderBottomColor: '#ddd',
    borderBottomWidth: 0.5,
    backgroundColor: '#fff',
  },
  itemWord: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#999',
    flex: 1,
    height: 20,
  },
  itemImage: {
    width: 15,
    height: 15,
  }
})
