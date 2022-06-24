import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { Component } from 'react';
import api from './src/services/api';
import Games from './src/Games';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native';
import md5 from 'md5'

class Home extends Component {
  render(){
    return(
      <View style={styles.container}>
        <Text>Bem vindo à Íris</Text>
        <button
          style={{
            fontFamily: "Roboto, sans-serif",
            color: 'white',
            backgroundColor: 'rgb(33, 150, 243)',
            padding: '8px',
            borderRadius: '4px',
            borderColor: 'rgb(33, 150, 243)',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
          onClick={() => {
            this.props.navigation.navigate('Entrar')
          }}
        >
          Entrar
        </button>

        <button
          style={{
            fontFamily: "Roboto, sans-serif",
            color: 'white',
            backgroundColor: 'rgb(33, 150, 243)',
            padding: '8px',
            borderRadius: '4px',
            borderColor: 'rgb(33, 150, 243)',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
          onClick={() => {
            this.props.navigation.navigate('Criar conta')
          }}
        >
          Criar conta
        </button>
      </View>
    )
  }
}

class Entrar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      login: "",
      senha: "",
      erro: ""
    }
  }

  async componentDidMount() {
    const response = await api.get('users');
    this.setState({
      users: response.data
    });
  }

  async login () {
    const hash = md5(this.state.senha)
    const user = {
      login_: this.state.login,
      senha_: hash
    }
    
    const verify = this.state.users.map((u) => {
      if (user.login_ === u.login && user.senha_ === u.senha) {
        this.props.navigation.navigate('Lista de jogos')
      } else {
        this.setState({erro: "E-mail ou senha inválidas, tente novamente"})
      }
    })
    return verify
  }

  render(){
    return(
      <View>
        <Text>Fazer login</Text>
        <form
          // onSubmit={(e) => login(e)}
          
        >
          <div>
          </div>
          <label>
            E-mail
          </label>
          <input
            placeholder="Digite seu e-mail"
            type="email"
            required
            onChange={(e) => this.setState({login: e.target.value})}
          />

          <label>
            Senha
          </label>
          <input
            placeholder="Digite sua senha"
            type="password"
            required
            onChange={(e) => this.setState({ senha: e.target.value })}
          />
        </form>
        <button
          onClick={() => this.login()}
        >
          Entrar
        </button>
        
      </View>
    )
  }
}

class CriarConta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      senha: ""
    }
  }

  async criarConta (){
    const hash = md5(this.state.senha)
    await api.post('users', {
      login: this.state.login,
      senha: hash
    })
    this.props.navigation.navigate('Entrar')
  }
  
  render(){
    return(
      <View>
        <form>
          <label>
            E-mail
          </label>
          <input
            placeholder="Digite seu melhor e-mail"
            required
            type="email"
            onChange={(e) => this.setState({ login: e.target.value })}
          />

          <label>
            Senha
          </label>
          <input
            placeholder="Crie uma senha"
            required
            type="password"
            onChange={(e) => this.setState({ senha: e.target.value })}
          />
        </form>

        <button
          onClick={() => this.criarConta()}
        >
          Criar conta
        </button>
      </View>
    )
  }
}

class ListaDeJogos extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      games: []
    }
  }

  async componentDidMount() {
    const response = await api.get('games');
    this.setState({
      games: response.data
    });
  }

  async excluir (_id) {
    const response = await api.delete(`games/${_id}`)
    return response
  }

  

  render(){
    return(
      <View style={styles.container}>
        <table
          style={{
            backgroundColor: '#F5F5F5',
            padding: '20px',
            borderRadius: '.4em',
            marginBottom: '.5em',
            width: '60%'
          }}
        >
          <thead
            style={{
              fontFamily: 'Roboto, sans-serif',
              textAlign: 'left'
            }}
          >
            <tr>
              <th>Nome</th>
              <th>Metascore</th>
              <th>Userscore</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody
            style={{
              fontFamily: 'Roboto, sans-serif',
              textAlign: 'left'
            }}
          >
            {this.state.games.map((g) => (
              <tr key={g._id}>
                <td style={{ paddingTop: '15px' }} >{g.nome}</td>
                <td style={{ paddingTop: '15px' }}>{g.metascore}</td>
                <td style={{ paddingTop: '15px' }}>{g.userscore}</td>
                <td style={{ paddingTop: '15px' }}>
                  <button
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      color: 'white',
                      backgroundColor: 'rgb(33, 150, 243)',
                      padding: '8px',
                      borderRadius: '4px',
                      borderColor: 'rgb(33, 150, 243)',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      this.excluir(g._id)
                    }} 
                  >
                    Excluir
                  </button>
                </td>
                <td style={{ paddingTop: '15px' }} >
                  <button
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      color: 'white',
                      backgroundColor: 'rgb(33, 150, 243)',
                      padding: '8px',
                      borderRadius: '4px',
                      borderColor: 'rgb(33, 150, 243)',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                    onClick={() => this.props.navigation.navigate('Atualize o jogo', {
                      _id: g._id,
                      nome: g.nome,
                      metascore: g.metascore,
                      userscore: g.userscore
                    })
                    }
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          style={{
            fontFamily: "Roboto, sans-serif",
            color: 'white',
            backgroundColor: 'rgb(33, 150, 243)',
            padding: '8px',
            borderRadius: '4px',
            borderColor: 'rgb(33, 150, 243)',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
          onClick={() => this.props.navigation.navigate('Adicione um novo jogo')}
        >
          Adicionar jogo
        </button>
      </View>
    )
  }
}

class AdicionarJogo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: "",
      metascore: "",
      userscore: ""
    }
  }
  
  async adicionar() {
    const response = await api.post('games', {
      nome: this.state.nome,
      metascore: this.state.metascore,
      userscore: this.state.userscore
    })
    return response
  }
  
  render(){
    return(
      <View style={styles.container}>
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '300px',
            fontFamily: 'Roboto, sans-serif',
            
          }}
          onSubmit={() => this.adicionar()}
        >
          <label
          >
            Nome
          </label>
          <input
            type="text"
            placeholder='Nome do jogo'
            style={{
              padding: '6px',
              borderColor: 'black',
              borderRadius: '.4em',
              borderWidth: '1px',
              marginTop: '4px',
            }}
            onChange={(e) => {
              this.setState({ nome: e.target.value })
            }}
          />

          <label
            style={{
              marginTop: '15px',
            }}
          >
            Metascore
          </label>
          <input
            type="number"
            placeholder='Nota Metascore'
            style={{
              padding: '6px',
              borderColor: 'black',
              borderRadius: '.4em',
              borderWidth: '1px',
              marginTop: '4px',
            }}
            onChange={(e) => {
              this.setState({ metascore: e.target.value })
            }}
          />

          <label
            style={{
              marginTop: '15px',
            }}
          >
            Userscore
          </label>
          <input
            type="number"
            placeholder='Nota Userscore'
            style={{
              padding: '6px',
              borderColor: 'black',
              borderRadius: '.4em',
              borderWidth: '1px',
              marginTop: '4px',
              marginBottom: '20px'
            }}
            onChange={(e) => {
              this.setState({ userscore: e.target.value })
            }}
          />

          <button
            type="submit"
            style={{
              fontFamily: "Roboto, sans-serif",
              color: 'white',
              backgroundColor: 'rgb(33, 150, 243)',
              padding: '8px',
              borderRadius: '4px',
              borderColor: 'rgb(33, 150, 243)',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Adicionar
          </button>
        </form>
      </View>
    )
  }
}

class AtualizarJogo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: this.props.route.params.nome,
      metascore: this.props.route.params.metascore,
      userscore: this.props.route.params.userscore
    }
  }



  async atualizar(id) {

    const response = await api.put(`games/${id}`, {
      nome: this.state.nome,
      metascore: this.state.metascore,
      userscore: this.state.userscore
    })
    return response
  }
  
  render(){
    return(
      <View style={styles.container}>
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '300px',
            fontFamily: 'Roboto, sans-serif',

          }}
          onSubmit={() => this.atualizar(this.props.route.params._id)}
        >
          <label>
            Nome
          </label>
          <input
            type="text"
            placeholder={this.props.route.params.nome}
            style={{
              padding: '6px',
              borderColor: 'black',
              borderRadius: '.4em',
              borderWidth: '1px',
              marginTop: '4px',
            }}
            onChange={(e) => {
              this.setState({ nome: e.target.value })
            }}
          />
          <label
            style={{
              marginTop: '15px',
            }}
          >
            Metascore
          </label>
          <input
            type="number"
            placeholder={this.props.route.params.metascore}
            style={{
              padding: '6px',
              borderColor: 'black',
              borderRadius: '.4em',
              borderWidth: '1px',
              marginTop: '4px',
            }}
            onChange={(e) => {
              this.setState({ metascore: e.target.value })
            }}
          />

          <label
            style={{
              marginTop: '15px',
            }}
          >
            Userscore
          </label>
          <input
            type="number"
            placeholder={this.props.route.params.userscore}
            style={{
              padding: '6px',
              borderColor: 'black',
              borderRadius: '.4em',
              borderWidth: '1px',
              marginTop: '4px',
              marginBottom: '20px'
            }}
            onChange={(e) => {
              this.setState({ userscore: e.target.value })
            }}
          />

          <button
            type="submit"
            style={{
              fontFamily: "Roboto, sans-serif",
              color: 'white',
              backgroundColor: 'rgb(33, 150, 243)',
              padding: '8px',
              borderRadius: '4px',
              borderColor: 'rgb(33, 150, 243)',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Atualizar
          </button>
        </form>
        
      </View>
      
    )
  }
}

const Stack = createNativeStackNavigator();

class App extends Component {
  render(){
    return(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Entrar" component={Entrar} />
          <Stack.Screen name="Criar conta" component={CriarConta} />
          <Stack.Screen name="Lista de jogos" component={ListaDeJogos} />
          <Stack.Screen name="Adicione um novo jogo" component={AdicionarJogo} />
          <Stack.Screen name="Atualize o jogo" component={AtualizarJogo} />
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
  tableHeader: {

  },
  tableCell: {
    margin: '3px'
  }
});

export default App

// const Stack = createNativeStackNavigator();

// function Jogos () {
//   return(
//     <View style={styles.container}>
//       <Text>Jogos</Text>
      
//     </View>
//   )
// }

// function App () {
  
//   const[games, setGames] = useState()

//   useEffect(() => {
//     async function ListarGames() {
//       const response = await axios.get('http://localhost:3012/games');
//       const jogo = await response.data;
//       return jogo;
//     }
//     ListarGames();
//   }, [])
  
  

//   return(
//     <NavigationContainer>
//       <Stack.Navigator>
//         {/* <Stack.Screen name="Home" component={Home} /> */}
//         {console.log(games)}
//         <Stack.Screen name="Jogos" component={Jogos} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   )
// }
