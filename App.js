import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import * as React from 'react';
import { Component } from 'react';
import api from './src/services/api';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import md5 from 'md5'

class Home extends Component {
  render(){
    return(
      <View style={styles.home}>
        <Text
          style={{
            fontSize: '24px',
            fontFamily: 'Roboto, sans-serif'
          }}
        >
          Bem vindo à Íris
        </Text>
        <Text
          style={{
            fontSize: '16px',
            fontFamily: 'Roboto, sans-serif'
          }}
        >
          Veja críticas de seus jogos favoritos
        </Text>

        <button
          style={{
            fontFamily: "Roboto, sans-serif",
            color: 'white',
            backgroundColor: 'rgb(33, 150, 243)',
            padding: '8px',
            margin: '20px',
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
        this.setState({erro: "E-mail ou senha inválidos, tente novamente"})
      }
    })
    return verify
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
        >
          {this.state.erro}
          <label>
            E-mail
          </label>
          <input
            placeholder="Digite seu e-mail"
            type="email"
            required
            style={{
              padding: '6px',
              borderColor: 'black',
              borderRadius: '.4em',
              borderWidth: '1px',
              marginTop: '4px',
            }}
            onChange={(e) => this.setState({login: e.target.value})}
          />

          <label
            style={{
              marginTop: '15px',
            }}
          >
            Senha
          </label>
          <input
            placeholder="Digite sua senha"
            type="password"
            required
            style={{
              padding: '6px',
              borderColor: 'black',
              borderRadius: '.4em',
              borderWidth: '1px',
              marginTop: '4px',
              marginBottom: '20px'
            }}
            onChange={(e) => this.setState({ senha: e.target.value })}
          />
        </form>
        <button
          onClick={() => this.login()}
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
      <View style={styles.container}>
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '300px',
            fontFamily: 'Roboto, sans-serif'
          }}
        >
          <label>
            E-mail
          </label>
          <input
            placeholder="Digite seu melhor e-mail"
            required
            type="email"
            style={{
              padding: '6px',
              borderColor: 'black',
              borderRadius: '.4em',
              borderWidth: '1px',
              marginTop: '4px',
            }}
            onChange={(e) => this.setState({ login: e.target.value })}
          />

          <label
            style={{
              marginTop: '15px',
            }}
          >
            Senha
          </label>
          <input
            placeholder="Crie uma senha"
            required
            type="password"
            style={{
              padding: '6px',
              borderColor: 'black',
              borderRadius: '.4em',
              borderWidth: '1px',
              marginTop: '4px',
              marginBottom: '20px'
            }}
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
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this)
    this.state = {
      games: []
    }
  }

  forceUpdateHandler(){
    this.forceUpdate();
  }

  async componentDidMount() {
    const response = await api.get('games');
    this.setState({
      games: response.data
    });
  }

  async excluir (_id) {
    await api.delete(`games/${_id}`).then(this.componentDidMount())
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
              textAlign: 'left',
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
              textAlign: 'left',
              fontSize: '14px'
            }}
          >
            {this.state.games.map((g) => (
              <tr key={g._id}>
                <td style={{ paddingTop: '15px'}} >{g.nome}</td>
                <td style={{ paddingTop: '15px' }}>{g.metascore}</td>
                <td style={{ paddingTop: '15px' }}>{g.userscore}</td>
                <td style={{ 
                  paddingTop: '15px'
                }}>
                  <button
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      color: 'white',
                      backgroundColor: 'rgb(33, 150, 243)',
                      padding: '8px',
                      borderRadius: '4px',
                      borderColor: 'rgb(33, 150, 243)',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      marginRight: '8px'
                    }}
                    onClick={() => {
                      this.excluir(g._id)
                    }} 
                  >
                    Excluir
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

        <button
          style={{
            fontFamily: "Roboto, sans-serif",
            color: 'white',
            backgroundColor: 'rgb(33, 150, 243)',
            padding: '8px',
            borderRadius: '4px',
            borderColor: 'rgb(33, 150, 243)',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginTop: '20px'
          }}
          onClick={() => this.componentDidMount()}
        >
          Atualizar lista
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
        </form>

        <button
          onClick={() => this.adicionar().then(this.props.navigation.navigate('Lista de jogos'))}
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
    await api.put(`games/${id}`, {
      nome: this.state.nome,
      metascore: this.state.metascore,
      userscore: this.state.userscore
    }).then(this.props.navigation.navigate('Lista de jogos'))
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
        </form>

        <button
          onClick={() => this.atualizar(this.props.route.params._id)}
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
  home: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default App
