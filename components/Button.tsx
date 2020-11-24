import React  from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';

type MyProps = {
  label: string,
  onPress: Function,
  style?: any,
  textStyle?: any

};
type MyState = {};

export default class Button extends React.Component<MyProps, MyState> {
  constructor(props: Readonly<MyProps>) {
    super(props)

    this.state = {
       
    };
  };
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <TouchableOpacity style={{width: '100%'}} onPress={() => {this.props.onPress()}}>
          <Text style={[styles.innerText, this.props.textStyle]}>{this.props.label}</Text>
        </TouchableOpacity>
      </View>
    )
  };

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    height: 40,
    width: '100%',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    elevation: 5
  },
  innerText: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 2
  }
})