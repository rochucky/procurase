import React  from 'react';
import { RefreshControl, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import Header from '../../components/Header';
import * as Location from 'expo-location';

import * as firebase from 'firebase';
import 'firebase/firestore';
import Colors from '../../constants/Colors';
import Button from '../../components/Button';
import { FlatList, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Card from '../../components/Card';

type MyProps = any;
type MyState = any;

export default class Trabalho extends React.Component<MyProps, MyState> {

  jobs: any;
  _unsubscribe: any;
  user: firebase.User | null;

  constructor(props: Readonly<MyProps>) {
    super(props)

    this.state = {
       jobs: [],
       filter: 'Aberto'
    };

    this.user = firebase.auth().currentUser;

  };

  componentDidMount(){
    this._unsubscribe = this.props.navigation.addListener('focus', this.handleRefresh.bind(this))
  }

  componentWillUnmount(){
    this._unsubscribe();
  }

  handleRefresh(){
    this.setState({loading: true});
    var user = firebase.auth().currentUser;
    var that = this;
    var jobs = firebase.firestore().collection('jobs')
    if(this.state.filter == 'Em Andamento'){
      jobs.where('acceptedOffer.offerUser','==', user?.uid).where('status', '==', this.state.filter).orderBy('date','desc');
    }
    else if (this.state.filter == 'Aberto'){
      jobs.where('status', '==', this.state.filter).orderBy('date','desc');
    }
    jobs.get()
    .then( function(querySnapshot) {
      var items: any = [];
      querySnapshot.forEach(function(doc) {
        var myOffer = false;
        firebase.firestore().collection('offers').where('jobId','==',doc.id).where('offerUser','==',that.user?.uid).get()
          .then((offerQuery) => {
            offerQuery.forEach((offerDoc) => {
              myOffer = true;
            })
          })
          .then(() => {
            items.push({id: doc.id ,...doc.data(), myOffer: myOffer});
          })
          .then(async () => {
            console.log(items);
            await that.setState({jobs: items, loading: false});
          })
      });
    })
  }

  filterReload = (status: string) => {
    console.log('Teste');
    this.setState({filter: status, loading: true}, () => {
      var user = firebase.auth().currentUser;
      var that = this;
      var jobs = firebase.firestore().collection('jobs')
      if(this.state.filter == 'Em Andamento'){
        jobs.where('acceptedOffer.offerUser','==', user?.uid).where('status', '==', this.state.filter).orderBy('date','desc');
      }
      else if (this.state.filter == 'Aberto'){
        jobs.where('status', '==', this.state.filter).orderBy('date','desc');
      }
      jobs.get()
      .then(function(querySnapshot) {
        var items: any = [];
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          if (doc.data().status == 'Aberto' && doc.data().owner == user?.uid){
            return;
          }
          console.log(doc.id, " => ", doc.data());
          items.push({id: doc.id ,...doc.data()});
        });
        that.setState({jobs: items, loading: false});
      })
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Header back={true} label="Trabalhos" navigation={this.props.navigation}/>
        <Text style={styles.legend}>Filtrar</Text>
        <View style={styles.filters}>
            <Button style={this.state.filter == 'Aberto' ? styles.filterButtonSelected : styles.filterButton} textStyle={styles.filterButtonFontStyle} label="Aberto" onPress={this.filterReload.bind(this, 'Aberto')}/>
            <Button style={this.state.filter == 'Em Andamento' ? styles.filterButtonSelected : styles.filterButton} textStyle={styles.filterButtonFontStyle} label="Em Andamento" onPress={this.filterReload.bind(this, 'Em Andamento')}/>
            <Button style={this.state.filter == 'Finalizado' ? styles.filterButtonSelected : styles.filterButton} textStyle={styles.filterButtonFontStyle} label="Finalizado" onPress={this.filterReload.bind(this, 'Finalizado')}/>
        </View>
        <Text style={styles.legend}>Trabalhos Diponíveis</Text>
        <FlatList 
          showsVerticalScrollIndicator={false}
          data={this.state.jobs}
          renderItem={this.renderItem}
          keyExtractor={(item: any) => item.id}
          refreshControl={
            <RefreshControl 
              refreshing={this.state.loading}
              onRefresh={this.handleRefresh.bind(this, this.state.filte)}
            />
          }
        />

      </View>
    )
  };

  renderItem = (arr: any) => {
    if(arr.item.owner != this.user?.uid){
        console.log(arr.item);
          return(
            <TouchableWithoutFeedback onPress={() => {this.props.navigation.navigate('DetalhesSolicitacao', {id: arr.item.id})}}>
              <Card 
                key={arr.item.id}
                navigation={this.props.navigation} 
                item={arr.item}
                thumb={arr.item.image ? arr.item.image[0] : undefined}
                title={arr.item.profession} 
                description={arr.item.description}
                value={arr.item.value || undefined}
                myOffer={arr.item.myOffer}
                uid={this.user?.uid}
              />
      
            </TouchableWithoutFeedback>
          )
      
    }
    else{
      return(
        <View></View>
      )
    }
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
  filters: {
    flex: 0,
    flexDirection: "row",
    marginTop: 10
  },
  filterButton:{
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 20,
  },
  filterButtonSelected:{
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 20,
    backgroundColor: Colors.yellow
  },
  filterButtonFontStyle: {
    textAlign: "center",
    fontWeight: "normal",
    letterSpacing: 0.5,
    fontSize: 16
  },
  btnContainer: {
    backgroundColor: Colors.lightGray,
    width: '100%',
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 10
  },
  btnNovaSolicitacao: {
    backgroundColor: Colors.lightYellow
  },
  legend: {
    fontSize: 16,
    paddingTop: 10,
    paddingLeft: 5,
    borderBottomWidth: 1
  }
})