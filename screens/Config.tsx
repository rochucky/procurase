import React  from 'react';
import { Alert, BackHandler, Platform, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { FontAwesome } from '@expo/vector-icons'; 
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Header from '../components/Header';
import MainMenuItem from '../components/MainMenuItem';
import Colors from '../constants/Colors';

import * as firebase from 'firebase';

type MyProps = {
  navigation: any
};
type MyState = {};

export default class Config extends React.Component<MyProps, MyState> {
  constructor(props: Readonly<MyProps>) {
    super(props)

    this.state = {
       
    };
  };
  render() {
    return (
      <View style={styles.container}>
        <Header back={true} label="Configurações" navigation={this.props.navigation}/>
        <ScrollView style={styles.configMenu}>
          <MainMenuItem label="Dados Pessoais" onPress={() => {
            alert('Em desenvolvimento')
          }}/>
          <MainMenuItem label="Logout" onPress={this.logout.bind(this)}/>
        </ScrollView>
      </View>
    )
  };
  
  logout = () => {
    Alert.alert(
      'Sair',
      'Deseja realmente fazer logout?',
      [
        {
          text: 'Sim',
          onPress: () => {
            firebase.auth().signOut()
            .then(() => {
              this.props.navigation.navigate('Login');
            })
          }
        },
        {
          text: 'Não'
        }
      ]
    )
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
  configMenu: {
    flex: 0,
    flexDirection: "column",
    marginTop: 30
  }
})