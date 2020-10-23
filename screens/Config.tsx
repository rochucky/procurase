import React  from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { FontAwesome } from '@expo/vector-icons'; 
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Header from '../components/Header';
import MainMenuItem from '../components/MainMenuItem';

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
        </ScrollView>
      </View>
    )
  };

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dba92a',
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