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
        return '#35a6f2'
      case 'owner':
        return '#569FF1'
      default:
        return '#204264'
    }
  }

  render() {
    const props = this.props;
    console.log(this.props)
    const typeMapping = {
      department: require('../../../asset/department.png'),
      group: require('../../../asset/group.png'),
      service: require('../../../asset/service.png'),
    };

    return (
      <TouchableHighlight
        underlayColor='#fff'
        style={styles.touch}
        onPress={()=>{this.props.navigation.navigate(props.link, props.params || {})}}
      >
        <View style={styles.container}>
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: 40,
            height: 40,
            borderRadius: 40,
            backgroundColor: this.switchColor(),
            ...props.style
          }}>
            <Image style={{width: 20, height: 20}} source={typeMapping[props.type]} />
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