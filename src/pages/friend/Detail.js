import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import api from '../../model/api';

export default class FriendDetail extends Component {
  static navigationOptions = {
    title: 'name'
  };

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      userInfo: {},
      hideBottom: true,
      params: this.props && this.props.navigation.state.params || {}
    }
  }

  componentWillMount() {
    this.getCurrentUser()
    this.fetchDetail()
  }

  getCurrentUser() {
    storage.load({
      key: 'userInfo',
    }).then(ret => {
      this.setState({
        userInfo: ret.data,
      })
    }).catch(err => {
      console.warn(err.message);
    })
  }
  
  fetchDetail = () => {
    const { params } = this.state
    api.getUser({
      userId: params.userId || 1,
    })
    .then(({data}) => {
      if (data.code === 0) {
        this.setState({
          user: data.data || {},
          hideBottom: this.state.userInfo.userId === data.data.userId
        })
      } else {
        hideBottom: false
      }
    })
  }

  handleCall = () => {
    //do sth
  }

  handleChat =() => {
    this.props.navigation.navigate('Chat',  { id: '0001' })
  }

  renderLabelValue = (id, user) => {
    if(id.indexOf('.') > 0) {
      const ids = id.split('.')
      let value;
      ids.forEach(d => {
        value = value ? value[d] : user[d]
      })
      return value
    }
    return user[id]
  }

  render() {
    const { user, userInfo, hideBottom } = this.state;

    const label = [
      {id: 'userSign', name: '签名'},
      {id: 'dep.depName', name: '部门'},
      {id: 'userMisId', name: 'MisId'},
      {id: 'userTel', name: '手机'},
      {id: 'userWorkPlace', name: '地点'},
      {id: 'userExt', name: '分机'},
      {id: 'userLeader.userName', name: '直属上级'},
    ]
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <View style={{width: 80,height: 80, backgroundColor:'#999', marginTop: 30, borderRadius: 10}}></View>
            <View style={{marginTop: 15, flexDirection: 'row',}}>
              <Text style={{
                color: '#999',
                fontSize: 20,
                fontWeight: 'bold',
                }}>{user.userName}</Text>
              {user.userSex === 2 ? (
                <Image style={styles.img} source={require('../../asset/girl.png')} />
              ) : (
                <Image style={styles.img} source={require('../../asset/boy.png')} />
              )}
            </View>
          </View>
          {label.map(d => <View style={styles.listItme} key={d.id}>
            <Text style={styles.itemLeft}>{d.name}</Text>
            <Text style={styles.itemRight}>{this.renderLabelValue(d.id, user)}</Text>
          </View>)}
        </ScrollView>
        {hideBottom? null : (
          <View style={{
            height: 40,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor:'#5B93FC',
            flexDirection:'row',
            paddingTop: 5,
            paddingBottom: 5,
          }}>
            <TouchableOpacity style={styles.button} onPress={this.handleCall}>
              <Image style={styles.btnImg} source={require('../../asset/call.png')} />
              <Text style={styles.buttonText}>语音通话</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button1} onPress={this.handleChat}>
              <Image style={styles.btnImg} source={require('../../asset/talk.png')} />
              <Text style={styles.buttonText}>发消息</Text>
            </TouchableOpacity>
          </View>
        )}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   flexDirection: 'column'
  },
  img: {
    marginLeft: 5,
    width: 18,
    height: 18,
  },
  btnImg: {
    marginRight: 2,
    width: 24,
    height: 24,
  },
  header: {
    height: 180,
    backgroundColor:'#fff',
    flexDirection:'column',
    alignItems:'center',
    marginBottom: 5,
    marginTop: 5,
  },
  listItme: {
    backgroundColor: '#fff',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 8,
    paddingTop: 8,
    flexDirection: 'row',
    borderBottomColor: '#ddd',
    borderBottomWidth: 0.5,
  },
  itemLeft: {
    width: 80,
    color: '#333',
  },
  itemRight: {
    color: '#999',    
  },
  button: {
    flex:1,
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRightColor: 'rgba(255,255,255,0.2)',
    borderRightWidth: 1,
  },
  button1: {
    flex:1,
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff'
  }
})
