import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,  
  FlatList,
  ScrollView,
  TouchableHighlight,
  TouchableWithoutFeedback
} from 'react-native';
import ImagePicker from 'react-native-image-picker'
import { Button } from 'antd-mobile';
import api from '../model/api'

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

  constructor(props) {
    super(props)
    this.state = {
      user: {}
    }
  }

  componentWillMount() {
    storage.load({
      key: 'userInfo',
    }).then(ret => {
      this.setState({
        user: ret
      })
    }).catch(err => {
      console.log(err.message);
    })
  }

  changeImage = () => {
    var options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    
    ImagePicker.showImagePicker(options, (response) => {
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };
    
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
    
        this.setState({
          avatarSource: source
        });
      }
    });
  }

  handleLogout = () => {
    storage.remove({
      key: 'authorization'
    });
    storage.remove({
      key: 'rooms'
    });
    api.disconnect()
    this.props.navigation.navigate('Login')
  }

  render() {
    const { user } = this.state
    const group1 = [
      {name:'我的资料', id:1, link:'FriendDetail', params: {userId: user.userId}},
      // {name:'我的工牌',id:2},
    ]
    const group2 = [
      {name:'我的请假', id: 1, link: 'Cottage'},
      {name:'一键打卡', id: 2, link: 'SignIn'},
    ]
    const group3 = [
      {name:'修改密码', id: 1, link: 'ResetPwd'},
      {name:'意见反馈', id: 2, link: 'FeedBack'},
      {name:'设置', id: 3, link: 'Setting'},
    ]

    const renderItem = (d) => (
      <TouchableHighlight
        key={d.name}
        underlayColor='#eee'
        onPress={()=>{
          this.props.navigation.navigate(d.link, d.params || {})
        }}
      >
        <View style={styles.groupItem} key={d.id}>
          <Text style={styles.itemWord}>{d.name}</Text>
          <Image style={styles.itemImage} source={require('../asset/enter.png')} />
        </View>
      </TouchableHighlight>
    )

    return (
      <ScrollView>
        <View style={styles.header}>
          <TouchableWithoutFeedback
            onPress={()=>{
              this.changeImage()
            }}
          >
            <View style={{width: 80,height: 80, backgroundColor:'#fff', marginTop: 30, borderRadius: 10}}></View>
          </TouchableWithoutFeedback>
          <View style={{marginTop: 10, flexDirection: 'row',}}>
            <Text style={{
              color: '#fff',
              fontSize: 20,
              fontWeight: 'bold',
              }}>{user.userName}</Text>
          </View>
        </View>
        <View style={styles.group}>
          {group1.map(d => renderItem(d))}
        </View>
        <View style={styles.group}>
          {group2.map(d => renderItem(d))}
        </View>
        <View style={styles.group}>
          {group3.map(d => renderItem(d))}
        </View>
        <View style={{
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Button
            style={{
              marginTop: 20,
              width: '90%'
            }}
            onClick={this.handleLogout}
            type="warning"
          >退出登录</Button>
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
