import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { Component } from "react";
import api from './src/services/api';
import Games from './src/Games';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      games: []
    }
  }

  async componentDidMount(){
    const response = await api.get('/games');
    this.setState({
      games: response.data
    });
  }

  render(){
    return(
      <View>
        <Text>Jogos</Text>
        <FlatList
          data={this.state.games}
          keyExtractor={this.state.games.nome}
          
        />
      </View>
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
