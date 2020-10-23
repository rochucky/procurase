import React  from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import Header from '../../components/Header';

type MyProps = {
  navigation: any
};
type MyState = {};

export default class Trabalho extends React.Component<MyProps, MyState> {
  constructor(props: Readonly<MyProps>) {
    super(props)

    this.state = {
       
    };
  };
  render() {
    return (
      <View style={styles.container}>
        <Header back={true} label="Procurar Trabalho" navigation={this.props.navigation}/>
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
})