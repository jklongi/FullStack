import React from 'react'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'
import Menu from './components/Menu'
import blogService from './services/blogs'
import userService from './services/users'
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import {
  Container,
  ListGroup,
  ListGroupItem
} from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      users: []
    }
    this.logout = this.logout.bind(this)
    this.onUserLogin = this.onUserLogin.bind(this)
    this.getBlogs = this.getBlogs.bind(this)
  }

  componentDidMount() {
    this.getBlogs()
    this.getUsers()
    const loggedUser = localStorage.getItem('blogsAppUser')
    if(loggedUser){
      this.onUserLogin(JSON.parse(loggedUser))
    }
  }

  onUserLogin(user){
    blogService.setToken(user.token)
    this.setState({ user })
  }

  getBlogs(){
    blogService.getAll().then(blogs => {
      blogs.sort((a,b) => a.likes > b.likes).reverse()
      this.setState({ blogs })
    })
  }

  getUsers(){
    userService.getAll().then(users => this.setState({  users }))
  }

  logout(){
    localStorage.removeItem('blogsAppUser')
    this.setState({ user: null })
  }

  render() {
    return (
      <Container>
        <Router>
          <div>
            <Menu user={this.state.user} logout={this.logout} getBlogs={this.getBlogs} onUserLogin={this.onUserLogin}/>

            <Route exact path="/users" render={() =>
              <Users users={this.state.users} />
            }/>
            <Route exact path="/users/:id" render={({ match }) =>
              <User user={this.state.users.find(user => user._id === match.params.id)} />
            }/>

            <Route exact path="/blogs/:id" render={({ match }) =>
              <Blog blog={this.state.blogs.find(blog => blog._id === match.params.id)} getBlogs={this.getBlogs} user={this.state.user}/>
            }/>

            <Route exact path="/" render={() => (
              <ListGroup>
                {
                  this.state.blogs.map(blog =>
                    <ListGroupItem key={blog._id}>
                      <Link to={`/blogs/${blog._id}`}>{blog.name} {blog.author}</Link>
                    </ListGroupItem>
                  )
                }
              </ListGroup>
            )} />
          </div>
        </Router>
      </Container>
    )
  }

}

export default App
