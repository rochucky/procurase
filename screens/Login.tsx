import React  from 'react';
import { StyleSheet, Text, View, AsyncStorage, Platform, BackHandler } from 'react-native';
import { TextInput, Button, Appbar } from 'react-native-paper';

import * as firebase from 'firebase';
import 'firebase/firestore';

import * as SQLite  from 'expo-sqlite'
import Loading from '../components/Loading';

const db = SQLite.openDatabase('bicos');

type MyProps = {
  navigation: any
};
type MyState = { 
  login: string,
  password: string,
  loading: boolean
};

export default class Login extends React.Component<MyProps, MyState> {

  constructor(props: Readonly<MyProps>){
    super(props);

    this.state = {
      login: '',
      password: '',
      loading: true
    };
  }

  render(){
    return (
      <View style={styles.main}>
        <Loading visible={this.state.loading}/>
        <View style={styles.container}>
          
          <View style={styles.inputs}>
            <TextInput 
              style={styles.textinput}
              mode="outlined"
              label="Login"
              value={this.state.login}
              onChangeText={text => this.setState({login: text})}
            />
            <TextInput 
              style={styles.textinput}
              mode="outlined"
              label="Senha"
              secureTextEntry={true}
              value={this.state.password}
              onChangeText={text => this.setState({password: text})}
            />
          </View>
          <Button  mode="contained" style={styles.button} onPress={this.login.bind(this)}>
            Entrar
          </Button>
          <Button  mode="contained" style={styles.button} onPress={() => {this.props.navigation.push("Cadastro")}}>
            Cadastrar
          </Button>
        </View>
      </View>
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  async componentDidMount(){

    if (Platform.OS == "android") {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);                           
    }

    var that = this;
    await firebase.auth().onAuthStateChanged(function(user){
      if(user){
        that.setState({loading: false}, () => {
          that.props.navigation.navigate('Main')
        })
      }
      else{
        that.setState({loading: false});
      }
    });
  }

  handleBackButton = () => {
    BackHandler.exitApp();
    return true;
  }

  async login(){
    this.setState({loading: true});
    const pass = this.state.password;
    firebase.auth().signInWithEmailAndPassword(this.state.login.toLowerCase(), this.state.password)
    .then( async (user) => {
      console.log(user);
      db.transaction(tx => {
        tx.executeSql(
          "insert into config (email, password) values ( ?, ?)", [this.state.login, this.state.password],
          () => {}
        );
      });
      this.setState({password: ''});
        this.props.navigation.navigate('Main');
      
    })
    .catch((err) => {
      if(err == 'Error: The email address is badly formatted.'){
        alert('Email inválido');
        this.setState({loading: false});
      }
      if(err == 'Error: The password is invalid or the user does not have a password.'){
        alert('Senha incorreta');
        this.setState({loading: false});
      }
      if(err == 'Error: There is no user record corresponding to this identifier. The user may have been deleted.'){
        alert('Usuário não existe, por favor verifique o login e senha novamente');
        this.setState({loading: false});
      }
      // console.log(err);
    });

  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    height: '100%'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    height: '100%'
  },
  inputs: {
    width: '100%',
    marginBottom: 10
  },
  textinput: {
    height: 50,
    width: '100%'
  },
  button: {
    height: 50,
    marginTop: 5,
    marginBottom: 5,
    justifyContent: 'center',
    width: '100%'
  }
});
