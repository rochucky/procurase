import React  from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, Menu } from 'react-native-paper';

import { FontAwesome } from '@expo/vector-icons';
import { MenuItem } from 'react-native-paper/lib/typescript/src/components/Menu/MenuItem';

type MyProps = {
  label: string,
  back: boolean,
  navigation: any,
  menu?: any[] // Tentei fazer um menu mas n?o deu muito certo, deixei aqui para o futuro
};
type MyState = any;

export default class Header extends React.Component<MyProps, MyState> {
  menuRef: any;
  constructor(props: Readonly<MyProps>) {
    super(props)

    this.state = {
       showMenu: false
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => {
            this.props.navigation.goBack()
          }}>
            <FontAwesome name="arrow-left" size={24} color="black" />
          </TouchableOpacity>
        <Text style={styles.headerText}>{this.props.label}</Text>
      </View>
    )
  };

}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  headerText: {
    fontSize: 26
  },
  menuButton: {
    paddingRight: 3
  },
  menuContainer: {
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'center',

  }
})