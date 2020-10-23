import React  from 'react';
import { Alert, KeyboardAvoidingView, Linking, Platform, StyleSheet, View  } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location';

import Header from '../../components/Header';
import Picker from '../../components/Picker';
import CustomImage from '../../components/Image';
import Colors from '../../constants/Colors';

import * as firebase from 'firebase';
import 'firebase/firestore';
import Loading from '../../components/Loading';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Button from '../../components/Button';

type MyProps = {
  navigation: any,
  route: any
};
type MyState = any;

export default class EditarSolicitacao extends React.Component<MyProps, MyState> {
  
  professionals: any;
  inputNumero: any;
  inputDescription: any;
  inputCep: any;
  blob: any;
  jobs: any;
  ufs: { value: string; label: string; }[];
  url: any;
  data: any;
  user: firebase.User | null;
  job: any;
  private _unsubscribe: any;
  jobId: any;
  inputValue: any;

  constructor(props: Readonly<MyProps>) {
    super(props)

    this.state = {
      profession: '',
      description: '',
      value: 0,
      professions: [],
      images: [],
      deleteImages: [],
      cep: '',
      logradouro: '',
      numero: '',
      uf: '',
      bairro: '',
      cidade: '',
      loading: true,
      laodingText: '',
      errors: {
        profession: false,
        description: false,
        numero: false,
        uf: false,
        bairro: false,
        cidade: false
      }
    };

    this.ufs = [
      {value: 'AC', label: 'AC'},
      {value: 'AL', label: 'AL'},
      {value: 'AP', label: 'AP'},
      {value: 'AM', label: 'AM'},
      {value: 'BA', label: 'BA'},
      {value: 'CE', label: 'CE'},
      {value: 'DF', label: 'DF'},
      {value: 'ES', label: 'ES'},
      {value: 'GO', label: 'GO'},
      {value: 'MA', label: 'MA'},
      {value: 'MS', label: 'MS'},
      {value: 'MT', label: 'MT'},
      {value: 'MG', label: 'MG'},
      {value: 'PA', label: 'PA'},
      {value: 'PB', label: 'PB'},
      {value: 'PR', label: 'PR'},
      {value: 'PE', label: 'PE'},
      {value: 'PI', label: 'PI'},
      {value: 'RJ', label: 'RJ'},
      {value: 'RN', label: 'RN'},
      {value: 'RS', label: 'RS'},
      {value: 'RO', label: 'RO'},
      {value: 'RR', label: 'RR'},
      {value: 'SC', label: 'SC'},
      {value: 'SP', label: 'SP'},
      {value: 'SE', label: 'SE'},
      {value: 'TO', label: 'TO'},
    ]


    this.professionals = firebase.firestore().collection('professions');
    this.jobs = firebase.firestore().collection('jobs')
    this.user = firebase.auth().currentUser;

    this.jobId = this.props.route.params.id;

    var that = this;
    this.professionals.get()
    .then(function(querySnapshot: any) {
      var professions: any = [];
      querySnapshot.forEach(function(doc: any) {
          professions.push({value: doc.data().name, label: doc.data().name});
      });
      that.setState({professions: professions});
    })

  };

  componentDidMount(){
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.setState({loading: true});
      firebase.firestore().collection('jobs').doc(this.props.route.params.id).get()
        .then((doc) => {
          if (doc.exists) {
            this.setState({...doc.data(), loading: false}, () => {
              console.log(this.state.images);
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
    });
  }
  componentWillUnmount(){
    this._unsubscribe();
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS == "ios" ? "padding" : undefined}>
        <Loading visible={this.state.loading} label={this.state.laodingText}/>
        <Header navigation={this.props.navigation} label="Editar Solicitação" back={true}/>
        <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
          <Picker label="Profissional" error={this.state.errors.profession} items={this.state.professions} value={this.state.profession} onChange={(item: any) => {
            this.setState({profession: item.value}, () => {
              this.inputDescription.focus();
            })
          }}/>
          <TextInput 
            label="Descrição" 
            mode="outlined" 
            multiline={true} 
            value={this.state.description} 
            onChangeText={(text) => {this.setState({description: text})}} 
            error={this.state.errors.description} 
            placeholder="Nos dê uma breve descrição do serviço"
            style={styles.textinput}
            ref={(input) => {this.inputDescription = input}}
          />
          <TextInput 
            label="Valor" 
            mode="outlined"  
            value={this.state.value}
            onChangeText={(text) => {this.setState({value: text})}} 
            keyboardType="number-pad"
            style={styles.textinput}
            ref={(input) => {this.inputValue = input}}
            />
          <Text style={styles.inputObs}>*Se não souber o valor a pagar no serviço, deixe em branco</Text>
          {this.state.logradouro !=  '' ? (
            <View>
              <TextInput 
                label="Logradouro" 
                mode="outlined" 
                value={this.state.logradouro}
                style={styles.textinput}
                disabled={true}
              />
              <TextInput 
                label="Número" 
                mode="outlined" 
                value={this.state.numero} 
                onChangeText={(text) => {this.setState({numero: text})}}
                style={styles.textinput}
                ref={(input) => { this.inputNumero = input}}
                error={this.state.errors.numero}
              />
              <TextInput 
                label="Bairro" 
                mode="outlined" 
                value={this.state.bairro} 
                onChangeText={(text) => {this.setState({bairro: text})}}
                style={styles.textinput}
                error={this.state.errors.bairro}
              />
              <TextInput 
                label="Cidade" 
                mode="outlined" 
                value={this.state.cidade} 
                onChangeText={(text) => {this.setState({cidade: text})}}
                style={styles.textinput}
                error={this.state.errors.cidade}
              />
              <Picker label="Estado" error={this.state.errors.uf} items={this.ufs} value={this.state.uf} onChange={(item: any) => {
                this.setState({uf: item.value})
              }}/>
              <TouchableOpacity style={styles.cepHelp} onPress={this.changeAddress.bind(this)}>
                <Text style={styles.cepHelpText}>Alterar endereço</Text>
              </TouchableOpacity>

              <Text>Imagens: {this.state.images.length}/3</Text>
              <View style={styles.imagesContainer}>
              {this.state.images.map((item: any, index: number) => {
                return (
                  <CustomImage uri={item.uri || item.url} style={styles.image} onDelete={this.handleImageDelete.bind(this, index)}/> 
                )
              })}
              </View>

              <Button label="Adicionar Imagens" onPress={this.takePicture.bind(this) } style={{marginBottom: 20, backgroundColor: Colors.lightYellow}}/>
              <Button label="Gravar" onPress={this.save.bind(this)} style={styles.saveButton}/>
              
                
            </View>
          ):(
            <View>
              <TextInput 
              label="CEP" 
              mode="outlined" 
              value={this.state.cep} 
              onChangeText={this.handleCep.bind(this)}
              error={this.state.errors.cep} 
              placeholder="00000-000"
              style={styles.textinput}
              keyboardType="numeric"
              returnKeyType="search"
              onBlur={this.getAddress.bind(this)}
              ref={(input) => {this.inputCep = input}}
              />
              <TouchableOpacity style={styles.cepHelp} onPress={this.cepHelp.bind(this)}>
                <Text style={styles.cepHelpText}>Não sei meu cep</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cepHelp} onPress={this.getLocation.bind(this)}>
                <Text style={styles.cepHelpText}>Usar minha localização</Text>
              </TouchableOpacity>

            </View>
          )
          }

        </ScrollView>
      </KeyboardAvoidingView>
    )
  };


  async save(imageOnly = false){
    var labels: any = {
      profession: 'Profissão',
      description: 'Descrição',
      numero: 'Número',
      bairro: 'Bairro',
      cidade: 'Cidade',
      uf: 'Estado'
    }
    var errors = this.state.errors;
    var hasErrors: string = '';
    for(let field of Object.keys(this.state.errors)){
      if(this.state[field] == ''){
        errors[field] = true;
        hasErrors += labels[field] + "\n";
      }
      else{
        errors[field] = false;
      }
    }
    await this.setState({errors: errors});
    if(hasErrors != ''){
      alert("Os campos abaixo são obrigatórios:\n\n" + hasErrors)
    }
    else{
      this.setState({loading: true, laodingText: 'Gravando'});
      this.data = {
        profession: this.state.profession,
        description: this.state.description,
        logradouro: this.state.logradouro,
        numero: this.state.numero,
        bairro: this.state.bairro,
        cidade: this.state.cidade,
        uf: this.state.uf,
        owner: this.user?.uid,
        status: this.state.status,
        value: (this.state.value ? parseFloat(this.state.value).toFixed(2) : ''),
        images: []
        
      }
      const imgPromise = this.state.images.map( async (item: any, index: number) => {
        if(item.blob != undefined){
          let date = new Date()
          let filename = this.user?.email + '_' + date.getFullYear() + (date.getMonth() + 1) + date.getDate() + date.getHours() + date.getMinutes() + date.getSeconds() + index + '.jpg'
          await firebase.storage().ref().child(filename).put(item.blob)
            .then( async (snap) => {
              this.url = await snap.ref.getDownloadURL()
              this.data.images = [...this.data.images,{url: this.url}]
            })
            console.log(this.data);
        }
        else{
          this.data.images = [...this.data.images,{url: item.url}]
        }
      })

      Promise.all(imgPromise)
      .then(() => {
        this.state.deleteImages.map((item: any, index: any) => {
          firebase.storage().ref().child(decodeURIComponent(item.ref)).delete()
            .then(() => {
              
            })
            .catch((err) => {
              alert('Falha ao excluir arquivo.');
              console.error(err);
            })
          
        })
        this.jobs.doc(this.jobId).update(this.data)
        .then((result: any) => {
          this.setState({loading: false});
          if(imageOnly){
            alert('Imagens Atualizadas');
          }
          else{
            Alert.alert(
              'Solicitação Aatualizada',
              'Sua solicitação foi atualizada com sucesso.',
              [
                {
                  text: 'Ok',
                  onPress: () => {
                    this.props.navigation.goBack();
                  }
                }
              ]
            )
          }
        })
        .catch((err: any) => {
          alert('Falha ao criar solicitação');
          console.log('Erro:',err);
        })

      })
    }
  }

  handleImageDelete = (index: number) => {
    Alert.alert(
      'Excluir Imagem',
      "Deseja realmente excluir esta imagem?\nEsta operação não pode ser desfeita!!",
      [
        {
          text: 'Sim',
          onPress: () => {
            var images: any = [];
            var deleteImages: any = [...this.state.deleteImages];
            this.state.images.map((item: any, ind: number) => {
              if(index != ind){
                images.push(item)
              }
              else{
                if(item.url != undefined){
                  let ref = item.url.replace('https://firebasestorage.googleapis.com/v0/b/bicos-6a1f2.appspot.com/o/', "").split('?')[0];
                  deleteImages.push({ref: ref});
                  this.setState({deleteImages: deleteImages})
                }
              }
            });
            this.setState({images: images});
          }
        },
        {
          text: 'Não'
        }
      ]
    )
  }

  takePicture = async () => {
    if(this.state.images.length == 3){
      alert('Só é permitido adicionar até 3 fotos');
      return false;
    }
    if(!this.getPermissionAsync()){
      alert('É preciso dar permissão para utilização da Câmera');
      return false;
    }
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      base64: false,
      quality: 0.2,
      aspect: [4, 3],
    })
    if(!result.cancelled){
      let response = await fetch(result.uri);
      this.blob = await response.blob();
      this.setState({images: [...this.state.images, {uri: result.uri, blob: this.blob}]});
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

  handleCep(text: string){
    var value = text.replace(/\D/g, "");
    if(value.length <= 8){
      if(value.length >= 6){
        value = value.slice(0,5) + - + value.slice(5);
      }
      this.setState({cep: value}, () => {
        if(value.length == 9){
          this.inputCep.blur();
        }
      });
    }
  }

  getAddress(){
    var value = this.state.cep.replace(/\D/g, "");
    if(value.length == 8){
      this.setState({loading: true});
      fetch('https://viacep.com.br/ws/'+value+'/json/')
        .then((response) => response.json())
        .then((json) => {
          if(json.erro){
            alert('Cep não encontrado');
          }
          else{
            this.setState({
              logradouro: json.logradouro,
              bairro: json.bairro,
              cidade: json.localidade,
              uf: json.uf
            }, () => {
              this.inputNumero.focus();
            });
          }
          this.setState({loading: false});
        })
        .catch((error) => {
          console.error(error);
          this.setState({loading: false});
        });
    }
    else{
      this.setState({
        logradouro: '',
        numero: '',
        bairro: '',
        localidade: '',
        uf: ''
      }, () => {
        alert('Cep inválido');
        this.inputCep.focus();
      })
    }
    
  }

  cepHelp(){
    Linking.openURL('http://www.buscacep.correios.com.br/sistemas/buscacep/').catch(err => console.error("Couldn't load page", err));
  }

  async getLocation(){
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location was denied');
    }

    await this.setState({loading: true})
    let location = await Location.getCurrentPositionAsync({accuracy: 6});
    if(location){
      var address = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      })
      this.setState({loading: false});
      Alert.alert(
        'Confirmar endereço',
        "Este é o seu endereço?\n\n" + address[0].street + ' - ' + address[0].region,
        [
          {
            text: 'Sim',
            onPress: () => {
              this.setState({
                logradouro: address[0].street,
                cidade: address[0].region // Cidade
              })
            }
          },
          {
            text: 'Não'
          }
        ]
      )
    }
  }

  changeAddress(){
    this.setState({
      logradouro: '',
      numero: '',
      bairro: '',
      cidade: '',
      uf: '',
      errors: {
        profession: false,
        description: false,
        numero: false,
        uf: false,
        bairro: false,
        cidade: false
      }
    })
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGray,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 50
  },
  form: {
    marginTop: 20
  },
  textinput: {
    marginBottom: 10
  },
  inputObs: {
    paddingBottom: 10,
    fontSize: 12,
    marginTop: -10 
  },
  cepHelp: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 10,
    marginBottom: 10
  },
  cepHelpText: {
    textDecorationLine: "underline"
  },
  saveButton: {
    backgroundColor: Colors.yellow,
    marginBottom: 30
  },
  imagesContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-evenly",
    marginTop: 10,
    marginBottom: 10
  },
  image: {
    width: '31%',
    aspectRatio: 4/3,
    borderRadius: 5
  }
})