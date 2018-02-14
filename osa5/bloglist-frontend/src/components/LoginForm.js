import React from 'react'
import loginService from '../services/login'
import Togglable from './Togglable'

class LoginForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
      visible: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(e){
    this.setState({ [e.target.name]: e.target.value })
  }
  handleSubmit(e){
    e.preventDefault()
    const { username, password } = this.state
    //long live promises
    loginService.login({ username, password }).then(user => {
      localStorage.setItem('blogsAppUser', JSON.stringify(user))
      this.props.onUserLogin(user)
    }).catch(error => {
      this.setState({ error: 'käyttäjätunnus tai salasana on virheellinen' })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    })

    this.setState({ username: '', password: '', visible: false })
  }
  render(){
    const { username, password } = this.state

    return (
      <Togglable buttonLabel="Login">
        <h2>Kirjaudu sovellukseen</h2>
        {this.state.error && <h4 style={{'color':'red'}}>{this.state.error}</h4>}
        <form onSubmit={this.handleSubmit} className="login-form">
          <div>
            käyttäjätunnus
            <input
              value={username}
              onChange={this.handleChange}
              name="username"
            />
          </div>
          <div>
            salasana
            <input
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit">kirjaudu</button>
        </form>
      </Togglable>
    )
  }
}

export default LoginForm
