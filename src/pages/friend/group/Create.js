import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  TextInput,
  Text,
  View,
  Alert,
  Image
} from 'react-native';
import { List, InputItem, ActivityIndicator } from 'antd-mobile';
import api from '../../model/api'

export default class GroupCreate extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: '创建群',
    headerBackTitle: '返回',
  });

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      inputValue: '',
      loading: false
    }
    this.tmpArr = []
  }

  handleChangeHoc = (e) => {
    this.tmpArr.push(e)
    this.setState({
      inputValue: e,
      loading: true
    })
    if(this.tmpArr.length > 0) {
      setTimeout(() => {
        this.handleChange(this.tmpArr[this.tmpArr.length - 1])
      }, 2000)
    }
  }
  handleChange = (e) => {
    if(e) {
      api.searchUsers({
        value: e
      }).then(({data}) => {
        if(data.code === 0) {
          this.setState({
            users: data.data
          })
        }
        this.setState({
          loading: false
        })
      })
    } else {
      this.setState({
        loading: false
      })
    }
    this.tmpArr = []
  }

  render() {
    const {users, inputValue, loading} = this.state;
    return (
      <View style={styles.container}>
        <List
          style={{width: '100%'}}
        >
          <View
            style={{
              padding: 10,
              backgroundColor: '#eee'
            }}
          >
            <TextInput
              style={{
                borderRadius: 4,
                padding: 5,
                backgroundColor: '#fff',
                borderBottomColor: '#eee',
                borderBottomWidth: 1,
                color:'#999'
              }}
              autoFocus
              value={inputValue}
              onChangeText={this.handleChangeHoc}
              placeholder="请输入姓名或misId"
            />
          </View>
          {
            users.length > 0 && !loading ? (
              users.map(d => (
                <List.Item
                  key={d.userId}
                  onClick={() => {this.props.navigation.navigate('FriendDetail',{userId: d.userId})}}
                  arrow="horizontal"
                >
                  <Text style={{ color: '#666' }}>{`${d.userName}(${d.userMisId})`}</Text>
                </List.Item>
              ))
            ) : null
          }
          {
            inputValue && users.length === 0 && !loading ? (
              <List.Item>
                <Text style={{color: '#666'}}>没有找到相关联系人</Text>
              </List.Item>
            ) : null
          }
          {
            loading ? (
              <List.Item>
                <ActivityIndicator />
              </List.Item>
            ) : null
          }
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
