import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DefaultTheme, Button, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCexIdHYZJtx-yEcmuUTjCANQFNixUfd94",
  authDomain: "bicos-6a1f2.firebaseapp.com",
  databaseURL: "https://bicos-6a1f2.firebaseio.com",
  projectId: "bicos-6a1f2",
  storageBucket: "gs://bicos-6a1f2.appspot.com",
  messagingSenderId: "355946700353",
  appId: "1:355946700353:web:d9c15b38e81f433f4d70c0"
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
