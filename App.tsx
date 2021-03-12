import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DefaultTheme, Button, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDiT8YtegjnnksnNLhMIOPATE2A9r2EOaA",
  databaseURL: "https://procurase-bc443.firebaseio.com",
  authDomain: "procurase-bc443.firebaseapp.com",
  projectId: "procurase-bc443",
  storageBucket: "procurase-bc443.appspot.com",
  messagingSenderId: "34580308812",
  appId: "1:34580308812:web:c3f32d6733edea727225e9",
  measurementId: "G-7G14DVM0DV"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.disableYellowBox = true;

// Navigation
import Login from './screens/Login';
import Cadastro from './screens/Cadastro/Cadastro'
import Main from './screens/Main/Main'
import Config from './screens/Config';
import Profissional from './screens/Servico/Profissional';
import Trabalho from './screens/Servico/Trabalho';
import NovaSolicitacao from './screens/Servico/NovaSolicitacao';
import DetalhesSolicitacao from './screens/Servico/DetalhesSolicitacao';
import Colors from './constants/Colors';
import EditarSolicitacao from './screens/Servico/EditarSolicitacao';
import FazerProposta from './screens/Servico/FazerProposta';
import Propostas from './screens/Servico/Propostas';
import DetalhesProposta from './screens/Servico/DetalhesProposta';


const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.yellow,
    accent: '#f1c40f',
  },
};

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{
            headerShown: false
          }} />
          <Stack.Screen name="Cadastro" component={Cadastro} options={{}}/>
          <Stack.Screen name="Main" component={Main} options={{ 
            headerShown: false
          }}/>
          <Stack.Screen name="Config" component={Config} options={{ 
            headerShown: false
          }}/>
          <Stack.Screen name="Profissional" component={Profissional} options={{ 
            headerShown: false
          }}/>
          <Stack.Screen name="Trabalho" component={Trabalho} options={{ 
            headerShown: false
          }}/>
          <Stack.Screen name="NovaSolicitacao" component={NovaSolicitacao} options={{ 
            headerShown: false
          }}/>
          <Stack.Screen name="EditarSolicitacao" component={EditarSolicitacao} options={{ 
            headerShown: false
          }}/>
          <Stack.Screen name="DetalhesSolicitacao" component={DetalhesSolicitacao} options={{ 
            headerShown: false
          }}/>
          <Stack.Screen name="FazerProposta" component={FazerProposta} options={{ 
            headerShown: false
          }}/>
          <Stack.Screen name="Propostas" component={Propostas} options={{ 
            headerShown: false
          }}/>
          <Stack.Screen name="DetalhesProposta" component={DetalhesProposta} options={{ 
            headerShown: false
          }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
});
