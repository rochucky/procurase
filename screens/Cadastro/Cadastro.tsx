import React  from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform, Image, Alert } from 'react-native';
import { TextInput, Button, Avatar, Text } from 'react-native-paper';
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'

import { Loading } from '../../components/CustomComponents';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

import * as firebase from 'firebase';
import 'firebase/firestore';

type MyProps = {
  navigation: any
};
type MyState = any;

export default class Cadastro extends React.Component<MyProps, MyState> {
  users: firebase.firestore.CollectionReference;
  professions: {  value: string; label: string }[];
  types: { value: string; label: string; }[];
  blob: any;
  url: any;
  
  constructor(props: Readonly<MyProps>) {
    super(props)

    this.state = {
       name: '',
       lastname: '',
       email: '',
       type: '',
       profession: '',
       image: '',
       pass: '',
       cameraPermission: false,
       loading: false,
       error: {
         name: false,
         lastname: false,
         email: false,
         pass: false
       }
    };

    this.users = firebase.firestore().collection('users');

    this.types = [
      {
        value: 'cliente',
        label: 'Cliente'
      },
      {
        value: 'freelancer',
        label: 'Profissional/Estabelecimento'
      }
    ]

    this.professions = [
      {
        value: 'item 1',
        label: 'Item 1'
      },
      {
        value: 'item 2',
        label: 'Item 2'
      }
    ]

    this.blob = '';

  };
  render() {
    return (
      <KeyboardAvoidingView style={styles.main} behavior={Platform.OS == "ios" ? "padding" : undefined}> 
        <Loading visible={this.state.loading} />
        <ScrollView contentContainerStyle={styles.container}>
          <TouchableOpacity style={styles.image} onPress={this.takePicture.bind(this)}>
            {this.state.image == '' &&
              <Avatar.Icon size={100} icon="account"/>
            }
            {this.state.image != '' &&
              // <Image source={this.state.image}/>
              <Avatar.Image size={100} source={this.state.image}/>
            }
            
            <Text>Adicionar Foto</Text>
          </TouchableOpacity>
          <TextInput 
            style={styles.inputs}
            mode="outlined"
            label="Nome"
            value={this.state.name}
            error={this.state.error.name}
            onChangeText={text => this.setState({name: text, error: {name: false}})}
          />
          <TextInput 
            style={styles.inputs}
            mode="outlined"
            label="Sobrenome"
            value={this.state.lastname}
            error={this.state.error.lastname}
            onChangeText={text => this.setState({lastname: text, error: {lastname: false}})}
          />
          <TextInput 
            style={styles.inputs}
            mode="outlined"
            label="Email"
            value={this.state.email}
            error={this.state.error.email}
            onChangeText={text => this.setState({email: text, error: {email: false}})}
          />
          <TextInput 
            style={styles.inputs}
            mode="outlined"
            label="Senha"
            secureTextEntry={true}
            value={this.state.pass}
            error={this.state.error.pass}
            onChangeText={text => this.setState({pass: text, error: {password: false}})}
          />
          
          <Button mode="outlined" style={styles.button} onPress={this.signup.bind(this)}>Cadastrar</Button>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  };

  takePicture = async () => {
    if(!this.getPermissionAsync()){
      alert('É preciso dar permissão para utilização da Câmera')
      return false
    }
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      base64: false,
      quality: 0.7,
    })
    if(!result.cancelled){
      let response = await fetch(result.uri);
      this.blob = await response.blob();
      this.setState({image: {uri: result.uri}});
    }
  }

  handlePicker(item: { name: string; value: string}){
    this.setState({[item.name]: item.value, error: {[item.name]: false}});
  }

  async signup(){
    if(this.state.name == ''){
      alert('O campo Nome é obrigatório');
      this.setState({error: {name: true}});
    }
    else if(this.state.lastname == ''){
      alert('O campo Sobrenome é obtigatório');
      this.setState({error: {lastname: true}});
    }
    else if(this.state.email == ''){
      alert('O campo Email é obtigatório');
      this.setState({error: {email: true}});
    }
    else if(this.state.password == ''){
      alert('O campo Senha é obtigatório');
      this.setState({error: {password: true}});
    }
    else if (this.blob == ''){
      alert('A foto é obtigatória');
    }
    else{
      await this.setState({loading: true});
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.pass)
      .then((response) => {
        let date = new Date()
        let filename = this.state.email + '_' + date.getFullYear() + (date.getMonth() + 1) + date.getDate() + date.getHours() + date.getMinutes() + date.getSeconds() + '.jpg'
        firebase.storage().ref().child(filename).put(this.blob)
          .then( async (snap) => {
          this.url = await snap.ref.getDownloadURL()
          response.user.updateProfile({
            displayName: this.state.name + ' ' + this.state.lastname,
            photoURL: this.url
          })
          .then(async (result) => {
            await this.setState({loading: false});
            Alert.alert(
              'Concluído', 
              'Cadastro realizado com sucesso',
              [
                {
                  text: 'ok',
                  onPress: () => {
                    this.props.navigation.navigate('Login');
                  }
                }
              ]
            )
          })
          .catch(async (err) => {
            await this.setState({loading: false});
            alert('Falha ao carregar arquivo!')
            console.log(err)
          })
        })
      })
      .catch(async (err) => {
        await this.setState({loading: false});
        console.log(err);
        alert(err.code_);
      })
    }
  }

  getPermissionAsync = async () => {
    if (Platform.OS == 'ios') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
      if (status !== 'granted') {
        // alert('Sorry, we need camera roll permissions to make this work!')
        return false
      }
    }
    else{
      const { status } = await Permissions.askAsync(Permissions.CAMERA)
      if (status !== 'granted') {
        // alert('Sorry, we need camera permissions to make this work!')
        return false
      }
    }
    return true
  }


}

const styles = StyleSheet.create({
  main: {
    flex: 1
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  inputs: {
    width: '100%',
    marginBottom: 10
  },
  button: {
    height: 50,
    marginTop: 5,
    marginBottom: 5,
    justifyContent: 'center',
    width: '100%'
  },
  image: {
    margin: 40,
    alignItems: 'center'
  }
})