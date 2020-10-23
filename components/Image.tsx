import React  from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Modal, Portal, Text } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons'; 

// Custom Components
import Colors from '../constants/Colors';

type MyProps = {
  style?: any,
  uri: string,
  onDelete?: Function

};
type MyState = any;

export default class CustomImage extends React.Component<MyProps, MyState> {
  constructor(props: Readonly<MyProps>) {
    super(props)

    this.state = {
       modalVisible: false,
       image: ''
    };
  };
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <Portal>
          <Modal visible={this.state.modalVisible} onDismiss={() => {this.setState({modalVisible: false})}}>
            <View style={styles.imageContainer}>
              <Image source={{uri: this.state.image}} style={styles.imageModal}/>
            </View>
            <View style={styles.actions}>
              <FontAwesome name="arrow-left" size={38} color={Colors.lightYellow} onPress={() => {this.setState({modalVisible: false})}} />
              {this.props.onDelete != undefined &&
                  <TouchableOpacity onPress={() => {
                    this.props.onDelete();
                    this.setState({modalVisible: false});
                  }}>
                    <FontAwesome name="trash" size={38} color={Colors.lightYellow}/>
                  </TouchableOpacity>
              }
            </View>
          </Modal>
        </Portal>
        <TouchableOpacity onPress={() => {this.setState({modalVisible: true, image: this.props.uri})}}>
          <Image source={{uri: this.props.uri}} style={styles.image}/>
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
    elevation: 5
  },
  imageContainer: {
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: Colors.lightYellow
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 5
  },
  imageModal: {
    width: '100%',
    height: undefined,
    aspectRatio: 4/3
  },
  actions: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 3,
    marginLeft: 10,
    marginRight: 10
  }
})