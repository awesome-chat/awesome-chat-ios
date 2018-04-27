import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableHighlight,
  Modal
} from 'react-native';
import KeyboardSpacer from '../../../components/KeyboardSpacer';

export default class ChatBg extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      currentImage: ''
    }
  }
  handleShowDetail = (d) => {
    this.setState({
      modalVisible: true,
      currentImage: d.content
    })
  }
  handleLink = (d) => {
    this.props.navigation.navigate('FriendDetail',{userId: d.userId})
  }
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
        <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.modalVisible}
        >
          <TouchableHighlight
            onPress={() => {
              this.setState({
                modalVisible: false
              })
            }}
            underlayColor='#fff'
          >
            <View
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Image
                resizeMode="center"
                style={{
                  width: 500,
                  height: 800,
                  maxWidth: '90%'
                }}
                source={{uri: this.state.currentImage}}
              />
            </View>
          </TouchableHighlight>
        </Modal>
        {messageList.map((d, i) => {
          if (d.sysMessage) {
            return (
              <View style={styles.sysCon} key={i}>
                <View style={styles.sysMessage}>
                  <Text style={{textAlign: 'center', color: '#fff', fontSize: 12}}>{d.content}</Text>
                </View>
              </View>
            )
          }
          if (d.isPic && d.isMine) {
            return (
              <View style={styles.messageRight} key={i}>
                <View style={styles.inMessageRight}>
                  <TouchableHighlight
                    onPress={this.handleShowDetail.bind(this, d)}
                    underlayColor='#fff'
                  >
                    <Image
                      style={styles.pic}
                      source={{uri: d.content}}
                    />
                  </TouchableHighlight>
                </View>
              </View>
            )
          }
          if (d.isPic) {
            return (
              <View style={styles.messageLeft} key={i}>
                <View style={styles.inMessageLeft}>
                  <TouchableHighlight
                    onPress={this.handleShowDetail.bind(this, d)}
                    underlayColor='#fff'
                  >
                    <Image
                      style={styles.pic}
                      source={{uri: d.content}}
                    />
                  </TouchableHighlight>
                </View>
              </View>
            )
          }
          if (d.isMine && d.isRecommend) {
            const data = JSON.parse(d.content)
            return (
              <View style={styles.messageRight} key={i}>
                <View style={styles.inMessageRightRecommend}>
                  <TouchableHighlight
                    onPress={this.handleLink.bind(this, data)}
                    underlayColor='#fff'
                  >
                    <View style={styles.avatarCon}>
                      <View style={styles.avatar}>
                        <Image style={styles.avatarPic} source={{uri: `http://47.95.234.220/static/img/${data.userAvatar}`}} />
                      </View>
                      <View style={{
                        width: '100%',
                        borderTopColor: '#eee',
                        borderTopWidth: 1,
                        paddingTop: 10,
                        paddingBottom: 5,
                      }}>
                        <Text style={styles.avatarTextRight}>{`名片：${data.userName}`}</Text>
                      </View>
                    </View>
                  </TouchableHighlight>
                </View>
              </View>
            )
          }
          if (d.isRecommend) {
            const data = JSON.parse(d.content)
            return (
              <View style={styles.messageLeft} key={i}>
                <View style={styles.inMessageLeft}>
                  <TouchableHighlight
                    style={{
                      paddingTop: 10,
                    }}
                    onPress={this.handleLink.bind(this, data)}
                    underlayColor='#fff'
                  >
                    <View style={styles.avatarCon}>
                      <View style={styles.avatar}>
                        <Image style={styles.avatarPic} source={{uri: `http://localhost:3000/static/img/${data.userAvatar}`}} />
                      </View>
                      <View style={{
                        width: '100%',
                        borderTopColor: '#eee',
                        borderTopWidth: 1,
                        paddingTop: 10,
                        paddingBottom: 5,
                      }}>
                        <Text style={styles.avatarTextLeft}>{`名片：${data.userName}`}</Text>
                      </View>
                    </View>
                  </TouchableHighlight>
                </View>
              </View>
            )
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
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: 'rgba(200, 200, 200, 1)'
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
  avatarCon: {
    width: 100,
    alignItems: 'center'
  },
  avatar: {
    borderRadius: 35,
    backgroundColor: '#eee',
    height: 70,
    width: 70,
    marginBottom: 10,
    overflow: 'hidden'
  },
  avatarTextRight: {
    color: '#999',
    fontSize: 10,
    textAlign: 'center'
  },
  avatarTextLeft: {
    color: '#999',
    fontSize: 10,
    textAlign: 'center'
  },
  avatarPic: {
    width: '100%',
    height: '100%'
  },
  pic: {
    height: 300,
    width: 300,
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
  inMessageRightRecommend: {
    backgroundColor: '#fff',
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
