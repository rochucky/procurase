import React  from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Badge, Text } from 'react-native-paper';
import { Item } from 'react-native-paper/lib/typescript/src/components/Drawer/Drawer';
import { green100 } from 'react-native-paper/lib/typescript/src/styles/colors';
import Colors from '../constants/Colors';

const noImage = require('../assets/no-image.png');

type MyProps = {
  navigation: any,
  thumb?: any,
  title: any,
  description: string,
  value: number,
  myOffer?: boolean,
  item: any,
  uid: any
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
        {this.props.item.owner == this.props.uid &&
          <Badge size={35} style={styles.badge}>Propostas: {this.props.item.offers || 0}</Badge>
        }
        {this.props.thumb != undefined && 
        (
          <Image source={{uri: this.props.thumb.url}} style={styles.thumb} />
        )}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{this.props.item.profession}</Text>
        </View>
        <Text style={styles.description}>{this.props.item.description.substr(0,50)}{this.props.item.description.length > 50 ? '...' : ''}</Text>
        <Text style={styles.value}>{this.props.item.value ? 'R$ ' + this.props.item.value : 'A Combinar'}</Text>
        {this.props.myOffer &&
          <Text style={styles.offer}>Proposta enviada</Text>
        }
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
  badge: {
    position: "absolute",
    zIndex: 1000,
    backgroundColor: '#EEE',
    borderRadius: 0
  },
  thumb: {
    aspectRatio: 4/3,
    width: '100%'
  },
  titleContainer:{
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center"
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
  offer: {
    fontSize: 22,
    marginLeft: 5,
    marginRight: 5,
    paddingRight: 5,
    paddingLeft: 5,
    borderRadius: 5,
    alignSelf: "flex-end",
    backgroundColor: Colors.lightYellow
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