import React  from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import * as firebase from 'firebase';
import { MainMenuItem } from '../../components/CustomComponents';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

type MyProps = {
  navigation: any
};
type MyState = any;

export default class Cadastro extends React.Component<MyProps, MyState> {
  constructor(props: Readonly<MyProps>) {
    super(props)

    this.state = {
       name: '',
       photo: ''
    };
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.greetingContainer}>
          <Text style={styles.greeting}>Olá, {this.state.name.split(' ')[0]}</Text>
          <TouchableOpacity onPress={() => {
            this.props.navigation.navigate('Config');
          }}>
            <FontAwesome name="cog" size={40} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={styles.subtext}>O que você procura hoje?</Text>
        <ScrollView style={styles.menuItems}>
          <MainMenuItem label="Procuro um Profissional" onPress={() => {
            this.props.navigation.navigate('Profissional')
          }}/>
          <MainMenuItem label="Procuro um Trabalho" onPress={() => {
            this.props.navigation.navigate('Trabalho')
          }}/>
        </ScrollView>
      </View>
    )
  };

  async componentDidMount(){
    var that = this;
    await firebase.auth().onAuthStateChanged(function(user){
      if(user){
        that.setState({
          loading: false,
          name: user.displayName,
          photo: user.photoURL
        })
      }
      else{
        that.setState({loading: false});
      }
    });
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGray,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 50,
    height: '100%'
  },
  greetingContainer: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  greeting: {
    fontSize: 30,
    fontWeight: "bold"
  },
  subtext: {
    fontSize: 16,
    marginTop: 10,
    paddingLeft: 10
  },
  menuItems: {
    flex: 1,
    flexDirection: "column",
    marginTop: 30
  }
})