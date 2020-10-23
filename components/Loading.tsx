import React  from 'react';
import { StyleSheet, View, Keyboard } from 'react-native';
import { TextInput, Modal, Text, Portal, List, Title, ActivityIndicator } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

type MyProps = {
  visible: boolean,
  label?: string
};
type MyState = {
  modal: boolean
};

export default class Loading extends React.Component<MyProps, MyState> {

  constructor(props: Readonly<MyProps>) {
    super(props)

    this.state = {
       modal: false
    };
  };
  render() {

    var value;

    return (
      <View style={styles.main}>
        <Portal>
          <Modal visible={this.props.visible}>
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" />
              <Text style={styles.loadingText}>{this.props.label || 'Carregando'}</Text>
            </View>
              
          </Modal>
        </Portal>
      </View>
    )
  };

}

const styles = StyleSheet.create({
  main: {
    width: '100%',
    marginBottom: 10
  },
  textinput: {
    height: 50,
    width: '100%'
  },
  loadingContainer: {
    marginLeft: 50,
    marginRight: 50,
    paddingTop: 20,
    paddingBottom: 20,
    flex: 0,
    flexDirection: "column",
    alignContent: 'center',
    justifyContent: "center",
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    borderColor: '#dba92a',
    borderWidth: 2
  },
  loadingText: {
    fontSize: 20,
    alignSelf: "center",
    marginTop: 15,
    color: '#dba92a'
  }
})