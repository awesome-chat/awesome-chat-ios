import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableHighlight
} from 'react-native';
import KeyboardSpacer from '../../../components/KeyboardSpacer';

export default class ChatBg extends Component {

  render() {
    const {messageList = []} = this.props;
    return (
      <ScrollView
        onContentSizeChange={(contentWidth, contentHeight)=>{        
          this._scrollView.scrollToEnd({animated: false});
        }}
        ref={component => this._scrollView = component}
        style={{flexDirection:'column', paddingTop: 5}}
      >
        {messageList.map((d, i) => {
          if (d.sysMessage) {
            return (
              <View style={styles.sysCon} key={i}>
                <View style={styles.sysMessage}>
                  <Text style={{textAlign: 'center', color: '#666', fontSize: 12}}>{d.content}</Text>
                </View>
              </View>
            )
          }
          if (d.isPic && d.isMine) {
          // if(true) {
            return (
              <View style={styles.messageRight} key={i}>
                <View style={styles.inMessageRight}>
                  <TouchableHighlight
                    onPress={()=>{}}
                    underlayColor='#fff'
                  >
                    <Image
                      style={styles.pic}
                      source={require('../../../asset/bg.jpg')}
                    />
                  </TouchableHighlight>
                </View>
              </View>
            )
          }
          if (d.isPic) {
            
          }
          if (d.isMine) {
            return (
              <View style={styles.messageRight} key={i}>
                <View style={styles.inMessageRight}>
                  <Text style={styles.textRight}>{d.content}</Text>
                </View>
              </View>
            )
          }

          return (
            <View style={styles.messageLeft} key={i}>
              <View style={styles.inMessageLeft}>
                <Text style={styles.textLeft}>{d.content}</Text>
              </View>
            </View>
          )
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  sysCon: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  sysMessage: {
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'rgba(200, 200, 200, 0.2)'
  },
  messageLeft: {
    flex: 1,
    marginLeft: 10,
    alignItems: 'flex-start',
    // height: 40
    marginBottom: 5,
  },
  messageRight: {
    flex: 1,
    marginRight: 10,
    alignItems: 'flex-end',
    // height: 40,
    marginBottom: 5,
  },
  pic: {
    maxHeight: 300,
    maxWidth: '80%',
  },
  inMessageRight: {
    backgroundColor: '#2189f7',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    // height: 30,
    maxWidth: '80%'
  },
  inMessageLeft: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    // height: 30,
    borderRadius: 10,
    maxWidth: '80%'
  },
  textRight:{
    fontSize: 15,
    color: '#fff',
  },
  textLeft:{
    fontSize: 15,
    color: '#000',
  }
})
