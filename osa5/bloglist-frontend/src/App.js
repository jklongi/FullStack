import React from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: []
    }
    this.logout = this.logout.bind(this)
    this.onUserLogin = this.onUserLogin.bind(this)
    this.getBlogs = this.getBlogs.bind(this)
  }

  componentDidMount() {
    this.getBlogs()
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

  logout(){
    localStorage.removeItem('blogsAppUser')
    this.setState({ user: null })
  }

  render() {
    if(!this.state.user){
      return <LoginForm onUserLogin={this.onUserLogin} />
    }
    return (
      <div>
        <h2>blogs</h2>
        {this.state.user && (
          <p>
            <span>{this.state.user.name} logged in</span>
            <button onClick={this.logout}>Logout</button>
          </p>
        )}
        <BlogForm onBlogCreated={this.getBlogs} />
        {this.state.blogs.map(blog =>
          <Blog key={blog._id} blog={blog} getBlogs={this.getBlogs} user={this.state.user}/>
        )}
      </div>
    )
  }

}

export default App;
