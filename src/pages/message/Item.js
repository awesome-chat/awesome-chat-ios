import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight
} from 'react-native';
import { Badge, Modal } from 'antd-mobile';
import moment from 'moment';
import ep from '../../store'

export default class MessageItem extends Component {
  handleDelete = () => {
    // 长按置顶或删除
    Modal.operation([
      { text: '置顶聊天', onPress: () => {
        storage.load({
          key: 'rooms'
        }).then(ret => {
          let topItem = {}
          newRooms = ret.filter(d => {
            if (d.roomId === this.props.roomId) {
              topItem = d
            }
            return d.roomId !== this.props.roomId
          })
          newRooms.unshift(topItem)
          storage.save({
            key: 'rooms',
            data: newRooms
          }).then(d => {
            ep.emit('update')        
          })
        })
      }},
      { text: '删除会话', onPress: () => {
        storage.load({
          key: 'rooms'
        }).then(ret => {
          const newRooms = ret.filter(d =>d.roomId !== this.props.roomId)
          storage.save({
            key: 'rooms',
            data: newRooms
          }).then(d => {
            ep.emit('update')        
          })
        })
      }},
    ])
  }
  render() {
    const { roomId, otherSideName, otherSideAvatar, message, newMessageNum = '', isGroup, userId } = this.props;
    return (
      <TouchableHighlight
        onLongPress={this.handleDelete}
        onPress={()=>{this.props.navigation.navigate('Chat',{
          roomId,
          otherSideName,
          isGroup,
          userId
        })}}
        underlayColor='#fff'
      >
        <View style={styles.item}>
          <View style={styles.itemLeft}>
            <View
              style={{
                width:60,
                height:60,
                backgroundColor:'#eee',
                borderRadius:30,
                overflow: 'hidden'
              }}
            >
            {otherSideAvatar ? (
              <Image
                style={{
                  width: '100%',
                  height: '100%'
                }}
                source={{uri: `http://localhost:3000/static/img/${otherSideAvatar}`}}
              />
            ) : null}
            </View>
          </View>
          <View style={styles.itemRight}>
            <View style={styles.itemRightPart}>
              <Text style={{
                flex:1,
                color:'#666'
              }}>{otherSideName}</Text>
              <Text style={{
                width:100,
                textAlign: 'right',
                color:'#666'
              }}>{moment(Number(message.createTime)).format('HH:mm:ss')}</Text>
            </View>
            <View style={styles.itemRightBottom}>
              <View style={{
                width: '90%',
                maxHeight: 35,
                flexDirection: 'row',
                marginRight: 10,
              }}>
                <Text style={{
                  flex:1,
                  color:'#666',
                  width: '80%'
                }}>{
                  message.sysMessage ? `[系统] ${message.content}` : (
                    message.isPic ? '[图片]' : message.content
                  )
                }</Text>
              </View>
              <Badge text={newMessageNum || ''} style={{marginTop: 10, marginRight: 10}}/>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    paddingLeft: 0,
    paddingRight: 10,
    flex: 1,
    flexDirection: 'row',
    height: 80,
    borderBottomColor: '#ddd',
    borderBottomWidth: 0.5,
  },
  itemLeft: {
    width: 90,
    height: 79,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemRight: {
    flex: 1,
    height: 79,
  },
  itemRightPart: {
    flexDirection: 'row',
    marginTop: 12,
  },
  itemRightBottom: {
    maxHeight: 35,
    flexDirection: 'row',
    marginTop: 4,
  }
})
