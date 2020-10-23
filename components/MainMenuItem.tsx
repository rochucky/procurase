import React  from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
import Colors from '../constants/Colors';

type MyProps = {
  label: string,
  onPress: Function
};
type MyState = {};

export default class MainMenuItem extends React.Component<MyProps, MyState> {
  constructor(props: Readonly<MyProps>) {
    super(props)

    this.state = {
       
    };
  };
  render() {
    return (
          <TouchableOpacity style={styles.container} onPress={() => {
            this.props.onPress()
          }}>
            <Text style={styles.labelText}>{this.props.label}</Text>
          </TouchableOpacity>
    )
  };

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightYellow,
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    height: 80,
    borderRadius: 15,
    elevation: 5
  },
  labelText: {
    fontSize: 25,
    fontWeight: "bold",
    color: Colors.black,
    paddingBottom: 15
  }
})