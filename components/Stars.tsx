import React  from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Text, TextInput } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons'; 


import * as firebase from 'firebase';
import 'firebase/firestore';

import Colors from '../constants/Colors';

type MyProps = {
  value: number
};
type MyState = {};

export default class Stars extends React.Component<MyProps, MyState> {
  constructor(props: Readonly<MyProps>) {
    super(props)

    this.state = {
       value: this.props.value || 0
    };
  };
  render() {
    switch (this.props.value){
      case 0:
        return (
          <View style={styles.starsContainer}>
            <FontAwesome name="star-o" size={32} color={Colors.yellow} />
            <FontAwesome name="star-o" size={32} color={Colors.yellow} />
            <FontAwesome name="star-o" size={32} color={Colors.yellow} />
            <FontAwesome name="star-o" size={32} color={Colors.yellow} />
            <FontAwesome name="star-o" size={32} color={Colors.yellow} />
            <Text style={styles.evaluationValue}>{this.props.value}</Text>
          </View>
        );
      
      case 0.5:
        return (
          <View style={styles.starsContainer}>
            <FontAwesome name="star-half-o" size={32} color={Colors.yellow} />
            <FontAwesome name="star-o" size={32} color={Colors.yellow} />
            <FontAwesome name="star-o" size={32} color={Colors.yellow} />
            <FontAwesome name="star-o" size={32} color={Colors.yellow} />
            <FontAwesome name="star-o" size={32} color={Colors.yellow} />
            <Text style={styles.evaluationValue}>{this.props.value}</Text>
          </View>
        );

      case 1:
        return (
          <View style={styles.starsContainer}>
            <FontAwesome name="star" size={32} color={Colors.yellow} />
            <FontAwesome name="star-o" size={32} color={Colors.yellow} />
            <FontAwesome name="star-o" size={32} color={Colors.yellow} />
            <FontAwesome name="star-o" size={32} color={Colors.yellow} />
            <FontAwesome name="star-o" size={32} color={Colors.yellow} />
            <Text style={styles.evaluationValue}>{this.props.value}</Text>
          </View>
        );
      
      case 1.5:
        return (
          <View style={styles.starsContainer}>
            <FontAwesome name="star" size={32} color={Colors.yellow} />
            <FontAwesome name="star-half-o" size={32} color={Colors.yellow} />
            <FontAwesome name="star-o" size={32} color={Colors.yellow} />
            <FontAwesome name="star-o" size={32} color={Colors.yellow} />
            <FontAwesome name="star-o" size={32} color={Colors.yellow} />
            <Text style={styles.evaluationValue}>{this.props.value}</Text>
          </View>
        );
      
      case 2:
        return (
          <View style={styles.starsContainer}>
            <FontAwesome name="star" size={32} color={Colors.yellow} />
            <FontAwesome name="star" size={32} color={Colors.yellow} />
            <FontAwesome name="star-o" size={32} color={Colors.yellow} />
            <FontAwesome name="star-o" size={32} color={Colors.yellow} />
            <FontAwesome name="star-o" size={32} color={Colors.yellow} />
            <Text style={styles.evaluationValue}>{this.props.value}</Text>
          </View>
        );
      
      case 2.5:
        return (
          <View style={styles.starsContainer}>
            <FontAwesome name="star" size={32} color={Colors.yellow} />
            <FontAwesome name="star" size={32} color={Colors.yellow} />
            <FontAwesome name="star-half-o" size={32} color={Colors.yellow} />
            <FontAwesome name="star-o" size={32} color={Colors.yellow} />
            <FontAwesome name="star-o" size={32} color={Colors.yellow} />
            <Text style={styles.evaluationValue}>{this.props.value}</Text>
          </View>
        );
      
      case 3:
        return (
          <View style={styles.starsContainer}>
            <FontAwesome name="star" size={32} color={Colors.yellow} />
            <FontAwesome name="star" size={32} color={Colors.yellow} />
            <FontAwesome name="star" size={32} color={Colors.yellow} />
            <FontAwesome name="star-o" size={32} color={Colors.yellow} />
            <FontAwesome name="star-o" size={32} color={Colors.yellow} />
            <Text style={styles.evaluationValue}>{this.props.value}</Text>
          </View>
        );
      
      case 3.5:
        return (
          <View style={styles.starsContainer}>
            <FontAwesome name="star" size={32} color={Colors.yellow} />
            <FontAwesome name="star" size={32} color={Colors.yellow} />
            <FontAwesome name="star" size={32} color={Colors.yellow} />
            <FontAwesome name="star-half-o" size={32} color={Colors.yellow} />
            <FontAwesome name="star-o" size={32} color={Colors.yellow} />
            <Text style={styles.evaluationValue}>{this.props.value}</Text>
          </View>
        );
      
      case 4:
        return (
          <View style={styles.starsContainer}>
            <FontAwesome name="star" size={32} color={Colors.yellow} />
            <FontAwesome name="star" size={32} color={Colors.yellow} />
            <FontAwesome name="star" size={32} color={Colors.yellow} />
            <FontAwesome name="star" size={32} color={Colors.yellow} />
            <FontAwesome name="star-o" size={32} color={Colors.yellow} />
            <Text style={styles.evaluationValue}>{this.props.value}</Text>
          </View>
        );
      
      case 4.5:
        return (
          <View style={styles.starsContainer}>
            <FontAwesome name="star" size={32} color={Colors.yellow} />
            <FontAwesome name="star" size={32} color={Colors.yellow} />
            <FontAwesome name="star" size={32} color={Colors.yellow} />
            <FontAwesome name="star" size={32} color={Colors.yellow} />
            <FontAwesome name="star-half-o" size={32} color={Colors.yellow} />
            <Text style={styles.evaluationValue}>{this.props.value}</Text>
          </View>
        );
      
      case 5:
        return (
          <View style={styles.starsContainer}>
            <FontAwesome name="star" size={32} color={Colors.yellow} />
            <FontAwesome name="star" size={32} color={Colors.yellow} />
            <FontAwesome name="star" size={32} color={Colors.yellow} />
            <FontAwesome name="star" size={32} color={Colors.yellow} />
            <FontAwesome name="star" size={32} color={Colors.yellow} />
            <Text style={styles.evaluationValue}>{this.props.value}</Text>
          </View>
        );
      
        

    }
    
  };

}

const styles = StyleSheet.create({
  starsContainer: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  evaluationValue: {
    fontSize: 20,
    backgroundColor: Colors.yellow,
    paddingRight: 5,
    paddingLeft: 5,
    marginLeft: 5,
    borderRadius: 20
  }
})