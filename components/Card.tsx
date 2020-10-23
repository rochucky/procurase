import React  from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
import Colors from '../constants/Colors';

const noImage = require('../assets/no-image.png');

type MyProps = {
  navigation: any,
  thumb?: any,
  title: any,
  description: string,
  value: number
};
type MyState = {};

export default class Card extends React.Component<MyProps, MyState> {
  constructor(props: Readonly<MyProps>) {
    super(props)

    this.state = {
       
    };
  };
  render() {
    return (
      <TouchableWithoutFeedback style={styles.container}>
        {this.props.thumb != undefined && 
        (
          <Image source={{uri: this.props.thumb.url}} style={styles.thumb} />
        )}
        <Text style={styles.title}>{this.props.title}</Text>
        <Text style={styles.description}>{this.props.description.substr(0,50)}{this.props.description.length > 50 ? '...' : ''}</Text>
        <Text style={styles.value}>{this.props.value ? 'R$ ' + this.props.value : 'A Combinar'}</Text>
      </TouchableWithoutFeedback>
    )
  };

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEE',
    marginTop: 5,
    marginBottom: 5,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 2, // Android
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5

  },
  thumb: {
    aspectRatio: 4/3,
    width: '100%'
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 5,
    marginRight: 5
  },
  value: {
    fontSize: 22,
    marginLeft: 5,
    marginRight: 5,
    paddingRight: 5,
    paddingLeft: 5,
    borderRadius: 5,
    alignSelf: "flex-end",
    backgroundColor: Colors.green
  },
  description: {
    fontSize: 18,

    marginRight: 5,
    marginLeft: 5,
    marginBottom: 5
  },
  distance: {
    backgroundColor: Colors.blue,
  }
})