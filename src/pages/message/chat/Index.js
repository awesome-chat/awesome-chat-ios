import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  ScrollView,
  TouchableHighlight
} from 'react-native';
import KeyboardSpacer from '../../../components/KeyboardSpacer';
import Background from './Background'

export default class Chat extends Component {
  static navigationOptions = {
    title: 'Name',
  };

  constructor(props){
    super(props);
    this.state = {
      showOther: false,
    }
  }

  handleShowOther = () => {
    this.setState({
      showOther: !this.state.showOther
    })
  }

  render() {
    const state = this.state;
    return (
      <View style={[{flex: 1}]}>
        <Background />
        <View style={{
          flexDirection:'row',
          backgroundColor: '#fff',
          height: 40,
        }}>
          <View style={{
            width: 30,
            justifyContent: 'center',
            alignItems:'center',
          }}>
            <Image
              source={require('../../../asset/语音.png')}
              style={{width: 25, height: 25}}
            />
          </View>
          <View style={{
            flex: 1,
            justifyContent: 'center',
            paddingLeft: 10,
            paddingRight: 10
          }}>
            <TextInput
              multiline={true}
              style={{left: 0, right: 0, height: 30}}
              placeholder={'Enter your text!'}
            />
          </View>
          <View style={{
            width: 30,
            justifyContent: 'center',
            alignItems:'center',
          }}>
            <Image
              source={require('../../../asset/表情.png')}
              style={{width: 25, height: 25}}
            />
          </View>
          <View style={{
            width: 30,
            justifyContent: 'center',
            alignItems:'center',
          }}>
            <TouchableHighlight
              style={{borderRadius: 12.5}}
              underlayColor="#fff"
              onPress={this.handleShowOther}
            >
              <Image
                source={require('../../../asset/添加.png')}
                style={{width: 25, height: 25}}
              />
            </TouchableHighlight>
          </View>
        </View>
        {state.showOther ? <View>
          <View>
            <View>
              <Image
                source={require('../../../asset/添加.png')}
                style={{width: 25, height: 25}}
              />
              <Text>图片</Text>
            </View>
          </View>
        </View> : null}
        <KeyboardSpacer/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 500
  }
})
