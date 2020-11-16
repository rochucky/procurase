import React  from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Text, TextInput } from 'react-native-paper';

import * as firebase from 'firebase';
import 'firebase/firestore';

import Header from '../../components/Header';
import Loading from '../../components/Loading';
import Colors from '../../constants/Colors';
import CustomImage from '../../components/Image';

type MyProps = any;
type MyState = any;

export default class DetalhesProposta extends React.Component<MyProps, MyState> {
  
  jobId: any;
  offer: any;
  
  constructor(props: Readonly<MyProps>) {
    super(props)

    this.state = {
       offers: [],
       loading: false
    };

    this.jobId = this.props.route.params.jobId;
    this.offer = this.props.route.params.offer;


  };

  componentDidMount = () => {
    
  }

  render() {

    const { job } = this.props.route.params

    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation} label="Propostas" back={true}/>
        <Loading visible={this.state.loading || false} label={this.state.loadingText || ''}/>
        <ScrollView>
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
            <Text style={styles.sectionLabel}>Proposta</Text>
            <View style={styles.line}>
              <View style={styles.job}>
                <Text style={styles.label}>Valor Oferecido:</Text>
              </View>
              <View style={styles.job}>
                <Text style={styles.jobValue}>R$ {this.offer.value}</Text>
              </View>
            </View>
            <View style={styles.line}>
              <View style={styles.job}>
                <Text style={styles.label}>Descrição:</Text>
              </View>
              <View style={styles.job}>
                <Text style={styles.jobValue}>{this.offer.description}</Text>
              </View>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Dados do profissional:</Text>
            <View style={styles.avatar}>
              <CustomImage style={styles.avatarImage} uri={this.offer.offerUserData.image}/>
            </View>
            <View style={styles.line}>
              <View style={styles.job}>
                <Text style={styles.label}>Nome:</Text>
              </View>
              <View style={styles.job}>
                <Text style={styles.jobValue}>{this.offer.offerUserData.name}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

    )
  };

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
  line: {
    marginBottom: 5
  },
  avatar: {
    flex: 1,
    flexDirection: 'row',
    height: 100,
    justifyContent: "center",
    alignContent: "center"
  },
  avatarImage: {
    height: 100,
    width: 100,
    borderRadius: 50
  }
})