import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight
} from 'react-native';

export default class Item extends Component {

  switchColor = () => {
    switch(this.props.type) {
      case 'user':
        return '#71b5ca'
      case 'owner':
        return '#415D87'
      default:
        return '#F3BD80'
    }
  }

  render() {
    const props = this.props;
    const typeMapping = {
      department: require('../../../asset/department.png'),
      group: require('../../../asset/group.png'),
      service: require('../../../asset/service.png'),
      system: require('../../../asset/system.png'),
    };

    return (
      <TouchableHighlight
        underlayColor='#fff'
        style={styles.touch}
        onPress={()=>{this.props.navigation.navigate(props.link, props.params || {})}}
      >
        <View style={styles.container}>
          <View style={{
            overflow: 'hidden',
            justifyContent: 'center',
            alignItems: 'center',
            width: 40,
            height: 40,
            borderRadius: 40,
            backgroundColor: this.switchColor(),
            ...props.style
          }}>
            {props.userAvatar ? (
              <Image style={{width: '100%', height: '100%'}} source={{uri: `http://47.95.234.220/static/img/${props.userAvatar}`}} />
            ) : (
              <Image style={{width: 20, height: 20}} source={typeMapping[props.type]} />
            )}
          </View>
          <View style={styles.body}>
            <Text style={styles.word}>{props.name}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  touch: {
    height: 50,
    borderBottomColor: '#ddd',
    borderBottomWidth: 0.5,   
    backgroundColor: '#fff'
  },
  container: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    height: 40,
    flex: 1,
    backgroundColor: '#fff',
    flexDirection:'row'
  },
  body:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  word: {
    width: '100%',
    marginLeft: 20,
  }
})