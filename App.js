import { StyleSheet, Text, View, FlatList } from 'react-native';
import * as React from 'react';
import { Component } from 'react';
import api from './src/services/api';
import Games from './src/Games';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

class Home extends Component {
  render(){
    return(
      <View style={styles.container}>
        <Text>Bem vindo à Íris</Text>
      </View>
    )
  }
}

const jogos = [
  {
    nome: "Sonic Unleashed",
    metascore: 60,
    userscore: 81
  },
  {
    nome: "Metal Slug 3",
    metascore: 80,
    userscore: 91
  }
] 

class Jogos extends Component {
  
  render(){
    return(
      <View style={styles.container}>
        <Text>Jogos</Text>
        <FlatList
          data={jogos}
          keyExtractor={(item) => item.nome}
          renderItem={ ({item}) => <Games data={item} /> }
        />
      </View>
    )
  }
}

const Stack = createNativeStackNavigator();

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      games: []
    }
  }

  

  async componentDidMount(){
    const response = await api.get('/GabrielEvaristo432');
    this.setState({
      games: response.data
    });
  }

  

  render(){
    return(
      <NavigationContainer>
        <Stack.Navigator>
          {/* <Stack.Screen name="Home" component={Home} /> */}
          <Stack.Screen name="Jogos" component={Jogos} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App
