import React  from 'react';
import { StyleSheet, View, Keyboard } from 'react-native';
import { TextInput, Modal, Text, Portal, List, Title } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

type MyProps = {
  label: string,
  value: string,
  onChange: Function,
  items: { value: string, label:string }[],
  error?: boolean
};
type MyState = {
  modal: boolean
};

export default class Picker extends React.Component<MyProps, MyState> {

  constructor(props: Readonly<MyProps>) {
    super(props)

    this.state = {
       modal: false
    };
  };
  render() {

    var { items } = this.props
    var value;

    return (
      <View style={styles.main} onTouchStart={() => {
        this.setState({modal: true});
      }}>
        <Portal>
          <Modal visible={this.state.modal} onDismiss={() => {this.setState({modal: false})}}>
            <ScrollView style={styles.modalView}>
              <List.Section>
                <List.Subheader><Title style={styles.listTitle}>Selecione um item</Title></List.Subheader>
                {items.map((item, index) => {

                  if(item.value == this.props.value){
                    value = item.label;
                  }

                  return (
                    <List.Item 
                      key={item.value}
                      title={item.label}
                      onPress={() => {
                        this.props.onChange({value: item.value });
                        this.setState({modal: false})
                      }}
                    />
                  )
                })}
                

              </List.Section>
              
            </ScrollView>
          </Modal>
        </Portal>
        <TextInput 
            style={styles.textinput}
            mode="outlined"
            label={this.props.label}
            value={value || 'Selecione um item'}
            error={this.props.error || false}
            onTouchEnd={() => {
              Keyboard.dismiss()
            }}
          />
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
  modalView: {
    backgroundColor: '#fff',
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom:10,
    maxHeight: '60%'
  },
  listTitle: {
    fontSize: 20
  }
})