import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight
} from 'react-native';
import { Badge } from 'antd-mobile';
import moment from 'moment';

export default class MessageItem extends Component {
  render() {
    const { roomId, otherSideName, message, newMessageNum = ''  } = this.props;
    return (
      <TouchableHighlight
        onPress={()=>{this.props.navigation.navigate('Chat',{
          roomId: roomId,
          otherSideName: otherSideName
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
              }}
            />
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
              }}>{moment(message.time).format('HH:mm:ss')}</Text>
            </View>
            <View style={styles.itemRightPart}>
              <Text style={{
                flex:1,
                color:'#666'
              }}>{message.content}</Text>
              <Badge text={newMessageNum} style={{marginTop: 10, marginRight: 10}}/>
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
    marginTop: 10,
  }
})
