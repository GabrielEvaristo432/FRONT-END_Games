import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import url_api from './config'
import axios from 'axios';

export default function App() {
  
  async function Listar () {
    return await axios.get('http://localhost:3012/games')
  }
  
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      {console.log(Listar())}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
