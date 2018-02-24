import React from 'react'
import loginService from '../services/login'
import Togglable from './Togglable'
import {
  Button,
  Form,
  FormGroup,
  Input,
} from 'reactstrap'

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
    }).catch(() => {
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
      <Togglable buttonLabel="Kirjaudu">
        { this.state.error && <h4 style={{ 'color':'red' }}>{this.state.error}</h4> }
        <Form onSubmit={this.handleSubmit} className="login-form" inline>
          <FormGroup className="px-3">
            <Input
              placeholder="käyttäjätunnus"
              value={username}
              onChange={this.handleChange}
              name="username"
            />
          </FormGroup>
          <FormGroup className="px-3">
            <Input
              placeholder="salasana"
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button color="success" type="submit">kirjaudu</Button>
        </Form>
      </Togglable>
    )
  }
}

export default LoginForm
