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
       jobs: []
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
    firebase.firestore().collection('jobs').where('status','==', 'Aberto').orderBy('date','desc').get()
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

  render() {
    return (
      <View style={styles.container}>
        <Header back={true} label="Trabalhos" navigation={this.props.navigation}/>
        <Text style={styles.legend}>Trabalhos Diponíveis</Text>
        <FlatList 
          showsVerticalScrollIndicator={false}
          data={this.state.jobs}
          renderItem={this.renderItem}
          keyExtractor={(item: any) => item.id}
          refreshControl={
            <RefreshControl 
              refreshing={this.state.loading}
              onRefresh={this.handleRefresh.bind(this)}
            />
          }
        />

      </View>
    )
  };

  renderItem = (arr: any) => {
    if(arr.item.owner != this.user?.uid){
      
          return(
            <TouchableWithoutFeedback onPress={() => {this.props.navigation.navigate('DetalhesSolicitacao', {id: arr.item.id})}}>
              <Card 
                key={arr.item.id}
                navigation={this.props.navigation} 
                item={arr.item}
                thumb={arr.item.images[0]} 
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