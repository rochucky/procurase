import React  from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Text, TextInput } from 'react-native-paper';

import * as firebase from 'firebase';
import 'firebase/firestore';

import Header from '../../components/Header';
import Loading from '../../components/Loading';
import Colors from '../../constants/Colors';

type MyProps = any;
type MyState = any;

export default class Propostas extends React.Component<MyProps, MyState> {
  
  jobId: any;
  
  constructor(props: Readonly<MyProps>) {
    super(props)

    this.state = {
       offers: [],
       loading: true
    };

    this.jobId = this.props.route.params.jobId;


  };

  componentDidMount = () => {

    var items: any = [];
    var response = firebase.firestore().collection('offers').where('jobId', '==', this.jobId).get()
      .then((querySnapshot) => {
        const docCount = querySnapshot.docs.length;
        querySnapshot.forEach((doc) => {
          const docData = doc.data()
          firebase.firestore().collection('users').doc(docData.offerUser).get()
            .then((userDoc) => {
              items.push({...docData, offerUserData: userDoc.data()});

            })
            .then(() => {
              if(items.length == docCount){
                this.setState({offers: items, loading: false});
              }
            })
        })
      })
  }

  render() {

    const { job } = this.props.route.params

    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation} label="Propostas" back={true}/>
        <Loading visible={this.state.loading || false} label={this.state.loadingText || ''}/>
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Solicitação</Text>
          <View style={styles.job}>
            <Text style={styles.label}>Profissional:</Text>
            <Text style={styles.label}>Valor:</Text>
          </View>
          <View style={styles.job}>
            <Text style={styles.jobValue}>{job.profession}</Text>
            <Text style={styles.jobValue}>R$ {job.value}</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Propostas</Text>
        </View>
        <ScrollView>
        {this.state.offers.map((item: any, index: number) => {

          var description: any;

          if(item.description.length > 60){
            description = item.description.substring(0, 60) + '...';
          }
          else{
            description = item.description;
          }

          return(
            <TouchableOpacity onPress={this.handleOfferClick.bind(this, item)} style={styles.item}>
              <View style={styles.job}>
                <Text style={styles.label}>Nome:</Text>
                <Text style={styles.label}>Valor:</Text>
              </View>
              <View style={styles.job}>
                <Text style={styles.jobValue}>{item.offerUserData.name}</Text>
                <Text style={styles.jobValue}>R$ {item.value}</Text>
              </View>
              <View>
                <Text style={styles.label}>Descrição:</Text>
                <Text style={styles.description}>{description}</Text>
              </View>
            </TouchableOpacity>
          )
        })}
        </ScrollView>
      </View>
    )
  };

  handleOfferClick = (offer: any) => {
    this.props.navigation.navigate('DetalhesProposta', {...this.props.route.params, offer: offer});
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
  section: {
    marginTop: 10,
  },
  sectionLabel: {
    fontSize: 18,
    borderBottomWidth: 2,
    marginBottom: 10
  },
  label: {
    fontSize: 16
  },
  job: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  jobValue: {
    fontSize: 24,
    marginBottom: 5
  },
  description: {
    fontSize: 20
  },
  item: {
    backgroundColor: '#eee',
    padding: 5,
    borderRadius: 4,
    elevation: 5,
    marginBottom: 10,
    marginRight: 5,
    marginLeft: 5
  }
})