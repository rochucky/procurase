import React  from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Text, TextInput } from 'react-native-paper';

import * as firebase from 'firebase';
import 'firebase/firestore';

import Header from '../../components/Header';
import Loading from '../../components/Loading';
import Colors from '../../constants/Colors';
import Button from '../../components/Button';

type MyProps = {
  navigation: any,
  route: any
};
type MyState = any;

export default class FazerProposta extends React.Component<MyProps, MyState> {
  jobId: any;
  user: firebase.User | null;
  job: any;
  
  constructor(props: Readonly<MyProps>) {
    super(props)

    this.state = {
       value: '0.00',
       description: '',
       loading: true,
       loadingText: '',
       job: this.props.route.params.job,
       update: false,
       offers: 0
    };
    this.jobId = this.props.route.params.jobId;
    this.user = firebase.auth().currentUser;
    this.job = firebase.firestore().collection('jobs').doc(this.jobId);
    this.job.get()
      .then((doc: any) => {
        if(doc.exists){
          let offers = doc.data()?.offers || 0;
          this.setState({offers: offers});
        }
      })

  };

  componentDidMount(){
    if(this.props.route.params.offerId != ''){
      firebase.firestore().collection('offers').doc(this.props.route.params.offerId).get()
        .then((doc) => {
          if(doc.exists){
            this.setState({
              value: doc.data()?.value,
              description: doc.data()?.description,
              update: true,
              loading: false
            });
          }
          else{
            this.setState({loading: false});
          }
        })
    }
    else{
      this.setState({loading: false});
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation} label="Fazer Proposta" back={true}/>
        <Loading visible={this.state.loading} label={this.state.loadingText}/>
        {this.state.job &&
          <ScrollView showsVerticalScrollIndicator={false} style={styles.main}>
            <Text style={styles.title}>Detalhes:</Text>
            <View style={styles.item}>
              <Text>Profissional:</Text>
              <Text style={styles.description}>{this.state.job.profession}</Text>
            </View>
            <View style={styles.item}>
              <Text>Valor:</Text>
              <Text style={styles.description}>{this.state.job.value ? 'R$ ' + this.state.job.value : 'A Combinar'}</Text>
            </View>
            <View style={styles.item}>
              <Text>Descrição:</Text>
              <Text style={styles.description}>{this.state.job.description}</Text>
            </View>
            <View>
            <Text style={styles.title}>Proposta:</Text>
              <TextInput
                label="Valor" 
                mode="outlined" 
                value={this.state.value}
                onChangeText={this.handleCurrency.bind(this)}
                keyboardType="number-pad"
                style={styles.input}
              />
              <TextInput
                label="Detalhes"
                mode="outlined"
                placeholder="Detalhe o porquê você quer essa vaga e suas qualificações"
                value={this.state.description}
                onChangeText={(text) => {this.setState({description: text})}}
                multiline={true}
                style={styles.input}
              />
              {this.state.update ? (
                <Button label="Atualizar" onPress={this.handleUpdate.bind(this)} style={styles.btnSend}/>
              ):(
                <Button label="Enviar" onPress={this.handleSend.bind(this)} style={styles.btnSend}/>
              )
              
              }
            </View>
          </ScrollView>
        }
      </View>
    )
  };

  handleUpdate(){
    if(!this.state.job.value){
      if(this.state.value == '0.00'){
        alert('Quando o valor da solicitação é "A Combinar" o campo valor é obrigatório.');
        return false;
      }
    }
    if(this.state.description == ''){
      alert('Preencha a descrição.\nUtilize-a para explicar a sua proposta.');
      return false;
    }

    Alert.alert(
      'Atualizar Proposta',
      `Deseja realmente atualizar esta proposta?\n\nValor: R$ ${this.state.value}\n\nDescrição: ${this.state.description}`,
      [
        {
          text: 'Sim',
          onPress: () => {
            firebase.firestore().collection('offers').doc(this.props.route.params.offerId).update({
              value: this.state.value,
              description: this.state.description,
            })
            .then(() => {
              Alert.alert(
                'Proposta Atualizada',
                'Sua proposta foi atualizada com sucesso.',
                [
                  {
                    text: 'Ok',
                    onPress: () => {
                      this.props.navigation.goBack();
                    }
                  }
                ]
              )
            })
            .catch((err) => {
              alert('Falha no envio da proposta.');
              console.log(err);
            })
          }
        },
        {
          text: 'Não'
        }
      ]
    )
  }

  handleSend(){
    if(!this.state.job.value){
      if(this.state.value == '0.00'){
        alert('Quando o valor da solicitação é "A Combinar" o campo valor é obrigatório.');
        return false;
      }
    }
    if(this.state.description == ''){
      alert('Preencha a descrição.\nUtilize-a para explicar a sua proposta.');
      return false;
    }

    Alert.alert(
      'Enviar Proposta',
      `Deseja realmente enviar esta proposta?\n\nValor: R$ ${this.state.value}\n\nDescrição: ${this.state.description}`,
      [
        {
          text: 'Sim',
          onPress: () => {
            firebase.firestore().collection('offers').add({
              jobId: this.jobId,
              value: this.state.value,
              description: this.state.description,
              offerUser: this.user?.uid
            })
            .then(() => {
              this.job.update({
                offers: (this.state.offers + 1)
              })
              Alert.alert(
                'Proposta Enviada',
                'Sua proposta foi enviada com sucesso.',
                [
                  {
                    text: 'Ok',
                    onPress: () => {
                      this.props.navigation.goBack();
                    }
                  }
                ]
              )
            })
            .catch((err) => {
              alert('Falha no envio da proposta.');
              console.log(err);
            })
          }
        },
        {
          text: 'Não'
        }
      ]
    )

  }

  handleCurrency(val: any){
    var value;
    if(val == '0' || val == ''){
      value = '0.00';
    }
    else{
      value = parseInt(val.replace('.',''));
      value = (value/100).toFixed(2);
    }
    this.setState({value: value.toString()});
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGray,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 50,
    height: '100%'
  },
  main: {
    paddingBottom: 20
  },
  item: {
    borderBottomWidth: 1,
    marginTop: 10,
    paddingBottom: 10
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20
  },
  description: {
    fontSize: 18,
    marginTop: 5
  },
  input: {
    marginTop: 10
  },
  btnSend: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: Colors.lightYellow
  }
})