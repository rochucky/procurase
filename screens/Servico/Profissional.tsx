import React  from 'react';
import { RefreshControl, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import Header from '../../components/Header';

import * as firebase from 'firebase';
import 'firebase/firestore';
import Colors from '../../constants/Colors';
import Button from '../../components/Button';
import { FlatList, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Card from '../../components/Card';

type MyProps = any;
type MyState = any;

export default class Profissional extends React.Component<MyProps, MyState> {

  jobs: any;
  _unsubscribe: any;

  constructor(props: Readonly<MyProps>) {
    super(props)

    this.state = {
       jobs: [],
       filter: 'Aberto'
    };

  };

  componentDidMount(){
    this._unsubscribe = this.props.navigation.addListener('focus', this.handleRefresh.bind(this, this.state.filter))
  }

  componentWillUnmount(){
    this._unsubscribe();
  }

  handleRefresh(status: string){
    this.setState({loading: true});
    var user = firebase.auth().currentUser;
    var that = this;
    firebase.firestore().collection('jobs').where('owner','==', user?.uid).where('status', '==', status).orderBy('date','desc').get()
    .then(function(querySnapshot) {
      var items: any = [];
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        items.push({id: doc.id ,...doc.data()});
      });
      that.setState({jobs: items, loading: false});
    })
  }

  

  render() {
    return (
      <View style={styles.container}>
        <Header back={true} label="Solicitar Profissional" navigation={this.props.navigation}/>
        <Text style={styles.legend}>Filtrar</Text>
        <View style={styles.filters}>
          <Button style={this.state.filter == 'Aberto' ? styles.filterButtonSelected : styles.filterButton} label="Abertos" onPress={this.filterReload.bind(this, 'Aberto')}/>
          <Button style={this.state.filter == 'Em Andamento' ? styles.filterButtonSelected : styles.filterButton} label="Em Andamento" onPress={this.filterReload.bind(this, 'Em Andamento')}/>
        </View>
        <Text style={styles.legend}>Minhas solicitações</Text>
        <FlatList 
          data={this.state.jobs}
          renderItem={this.renderItem}
          keyExtractor={(item: any) => item.id}
          extraData={this.state.loading}
          refreshControl={
            <RefreshControl 
              refreshing={this.state.loading}
              onRefresh={this.handleRefresh.bind(this, this.state.filter)}
            />
          }
        />
        <View style={styles.btnContainer}>
          <Button style={styles.btnNovaSolicitacao} label="Nova Solicitação" onPress={() => {
            this.props.navigation.navigate('NovaSolicitacao');
          }}/>
        </View>

      </View>
    )
    
  };
  filterReload = (status: string) => {
    this.setState({filter: status, loading: true}, () => {
      var user = firebase.auth().currentUser;
      var that = this;
      firebase.firestore().collection('jobs').where('owner','==', user?.uid).where('status', '==', this.state.filter).orderBy('date','desc').get()
      .then(function(querySnapshot) {
        var items: any = [];
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          items.push({id: doc.id ,...doc.data()});
        });
        that.setState({jobs: items, loading: false});
      })
    })
  }

  renderItem = (arr: any) => {
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
        />

      </TouchableWithoutFeedback>
    )
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
    borderRadius: 20
  },
  filterButtonSelected:{
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 20,
    backgroundColor: Colors.yellow
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