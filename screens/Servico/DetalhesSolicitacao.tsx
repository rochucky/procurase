import React  from 'react';
import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native';
import { ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Badge, Text } from 'react-native-paper';
import Button from '../../components/Button';

import * as firebase from 'firebase';
import 'firebase/firestore';

import Header from '../../components/Header';
import CustomImage from '../../components/Image';
import Colors from '../../constants/Colors';
import Loading from '../../components/Loading';
import { red100 } from 'react-native-paper/lib/typescript/src/styles/colors';

type MyProps = {
  navigation: any,
  route: any
};
type MyState = any;

export default class DetalhesSolicitacao extends React.Component<MyProps, MyState> {
  jobId: any;
  thumbInterval: any;
  private _unsubscribe: any;
  user: firebase.User | null;
  owner: any;

  constructor(props: Readonly<MyProps>) {
    super(props)
    this.state = {
      job: '',
      loading: false,
      loadingText: '',
      thumb: '',
      owner: undefined,
      thumbNumber: 0,
      myOffer: ''
    };

    this.jobId = this.props.route.params.id;
    this.user = firebase.auth().currentUser;

  };
  
  componentDidMount(){
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.setState({loading: true});
      firebase.firestore().collection('jobs').doc(this.props.route.params.id).get()
        .then((doc) => {
          if (doc.exists) {
            firebase.firestore().collection('users').doc(doc.data()?.owner).get()
              .then((docData) => {
                this.setState({owner: docData.data()});
              })
            this.setState({job: doc.data(), loading: false}, () => {
              clearInterval(this.thumbInterval);
              if(this.state.job.images.length > 0){
                this.setState({thumb: this.state.job.images[this.state.thumbNumber].url || undefined})
                var that = this;
                this.thumbInterval = setInterval(() => {
                  var newVal = that.state.thumbNumber + 1
                  if(that.state.job.images[newVal] == undefined){
                    that.setState({thumbNumber: 0, thumb: this.state.job.images[0].url});
                  }
                  else{
                    that.setState({thumbNumber: newVal, thumb: this.state.job.images[newVal].url});
                  }
                }, 3000)
              }
            })
          } else {
            this.setState({loading: false}, () => {
              Alert.alert(
                'Falha no carregamento',
                'Falha ao Carregar a Solicitação',
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
          }
        })

      firebase.firestore().collection('offers').where('jobId', '==', this.props.route.params.id).where('offerUser', '==', this.user?.uid).get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.setState({myOffer: doc.id});
          })
        })
    });
  }

  componentWillUnmount(){
    this._unsubscribe();
  }

  render() {
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation} label="Detalhes da Solicitação" back={true}/>
        <Loading visible={this.state.loading} label={this.state.loadingText}/>
        {
          this.state.job != '' &&
          <ScrollView style={styles.scrollview} showsVerticalScrollIndicator={false}>
            {this.state.job.images[0] != undefined && 
              <CustomImage uri={this.state.thumb} style={styles.thumb}/>
            }
            {this.state.job.acceptedOffer ? (
              <View></View>
            ): (
              this.state.job.owner == this.user?.uid &&
                <TouchableOpacity style={styles.offers} onPressOut={this.handleOffersButton.bind(this)}>
                  <Text style={styles.offersText}>Ver Propostas: {this.state.job.offers || 0}</Text>
                </TouchableOpacity>
            )}
            <View style={styles.item}>
              <Text>Profissional:</Text>
              <Text style={styles.title}>{this.state.job.profession}</Text>
            </View>
            <View style={styles.item}>
              <Text>Valor:</Text>
              <Text style={styles.description}>{this.state.job.value ? 'R$ ' + this.state.job.value : 'A Combinar'}</Text>
            </View>
            <View style={styles.item}>
              <Text>Descrição:</Text>
              <Text style={styles.description}>{this.state.job.description}</Text>
            </View>
            {this.user?.uid == this.state.job.owner ? // Usuario é o owner do job??
              (
                this.state.job.acceptedOffer ? ( // Dados da oferta aceita
                  <View>
                    <View style={styles.item}>
                      <Text>Endereço:</Text>
                      <Text style={styles.description} onPress={() => {alert('Teste')}}>{this.state.job.logradouro}, {this.state.job.numero} - {this.state.job.bairro} - {this.state.job.cidade} - {this.state.job.uf}</Text>
                    </View>
                    <View style={styles.header}>
                      <Text style={styles.headerText}>Proposta Aceita:</Text>
                    </View>
                    <View style={[styles.item, {flex: 1, flexDirection: "row", justifyContent: "space-between"}]}>
                      <View style={{flex: 1}}>
                        <Text>Nome:</Text>
                        <Text style={styles.description}>{this.state.job.acceptedOffer.offerUserData.name}</Text>
                      </View>
                      <View style={styles.offerUserImage}>
                        <CustomImage style={styles.offerUserImage} uri={this.state.job.acceptedOffer.offerUserData.image}/>
                      </View>
                    </View>
                  </View>
                ):(
                <View>
                  <View style={styles.item}>
                    <Text>Endereço:</Text>
                    <Text style={styles.description} onPress={() => {alert('Teste')}}>{this.state.job.logradouro}, {this.state.job.numero} - {this.state.job.bairro} - {this.state.job.cidade} - {this.state.job.uf}</Text>
                    <Text style={styles.addressObs}>*Esta informação só é visível para você</Text>
                  </View>
                  <Button label="Editar" onPress={this.handleEdit.bind(this)} style={styles.editButton}/>
                  <Button label="Excluir" onPress={this.handleDelete.bind(this)} style={styles.deleteButton}/>
                </View>

                )

              ):(
                <View>
                  <TouchableWithoutFeedback style={styles.item} onPress={() => {alert('Teste')}}>
                    <Text>Solicitante:</Text>
                    {this.state.owner != undefined ? (
                      <View>
                        <Text style={styles.description}>{this.state.owner.name}</Text>
                        <Text style={styles.addressObs}>*Clique para ver o perfil</Text>
                      </View>
                    ):(
                      <ActivityIndicator />
                    )}
                  </TouchableWithoutFeedback>
                  {this.state.myOffer ? (
                    <Button label="Ver Minha Proposta" onPress={this.handleOffer.bind(this)} style={styles.offerButton}/>
                    ):(
                      <Button label="Fazer Proposta" onPress={this.handleOffer.bind(this)} style={styles.offerButton}/>
                  )}
                </View>
              )
            }
          </ScrollView>
        }
        
        
      </View>
    )
  };

  
  handleOffersButton = () => {
    if(this.state.job.offers >= 1){
      this.props.navigation.navigate('Propostas', {job: this.state.job, jobId: this.props.route.params.id})
    }
    else{
      alert('Não há propostas para esta solicitação');
    }
  }

  handleOffer = () => {
    this.props.navigation.navigate('FazerProposta', {job: this.state.job, jobId: this.props.route.params.id, offerId: this.state.myOffer});
  }

  handleDelete = () => {
    Alert.alert(
      'Excluir Solicitação',
      'Deseja realmente excluir esta solicitação?',
      [
        {
          text: 'Sim',
          onPress: async () => {
            this.setState({loading: true, loadingText: 'Excluindo Solicitação'})
            clearInterval(this.thumbInterval);
            var imgPromise = this.state.job.images.map( async (item: any, index: any) => {
              let ref = item.url.replace('https://firebasestorage.googleapis.com/v0/b/bicos-6a1f2.appspot.com/o/', "").split('?')[0];
              await firebase.storage().ref().child(decodeURIComponent(ref)).delete()
            })

            Promise.all(imgPromise)
              .then(() => {
                firebase.firestore().collection('jobs').doc(this.jobId).delete()
                  .then(() => {
                    this.setState({loading: false, loadingText: ''})
                    this.props.navigation.goBack();
                  })
              })
          }
        },
        {
          text: 'Não'
        }
      ]
    )
  }

  handleEdit = () => {
    this.setState({thumbNumber: 0});
    this.props.navigation.navigate('EditarSolicitacao', {id: this.jobId});
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGray,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 50,
    height: 'auto'
  },
  offers: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10
  },
  offersText: {
    fontSize: 20,
    backgroundColor: Colors.green,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 50
  },
  scrollview: {
    paddingBottom: 20
  },
  thumb: {
    width: '100%',
    height: undefined,
    aspectRatio: 4/3,
    borderRadius: 5,
    elevation: 5,
    marginTop: 20
  },
  item: {
    position: 'relative',
    borderBottomWidth: 1,
    marginTop: 10,
    paddingBottom: 10
  },
  title: {
    fontSize: 30,
    fontWeight: "bold"
  },
  description: {
    fontSize: 18,
    marginTop: 5
  },
  addressObs: {
    fontSize: 12
  },
  header: {
    marginTop: 15,
    borderBottomWidth: 2
  },
  headerText: {
    fontSize: 20,
    fontWeight: "700"
  },
  offerUserImage: {
    flex: 0,
    width: 60,
    height: 60,
    borderRadius: 50,
    overflow: "hidden",
    margin: 0,
    padding: 0
  },
  editButton: {
    backgroundColor: Colors.lightYellow,
    marginTop: 20
  },
  offerButton: {
    backgroundColor: Colors.lightYellow,
    marginTop: 20,
    marginBottom: 20
  },
  deleteButton: {
    backgroundColor: Colors.danger,
    marginTop: 20,
    marginBottom: 20
  }
})