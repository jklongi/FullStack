import React from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'

class BlogForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      title: '',
      author: '',
      url: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(e){
    this.setState({ [e.target.name]: e.target.value })
  }
  handleSubmit(e){
    e.preventDefault()
    const { title, author, url } = this.state

    blogService.create({ title, author, url }).then(blog => {
      this.setState({ message: `a new blog ${blog.title} by ${blog.author} added!` })
      this.props.onBlogCreated()
    }).catch(error => {
      this.setState({ error: 'Blogin luonti ei onnistunut' })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    })

    this.setState({ title: '', author: '', url: '' })
  }
  render(){
    const { title, author, url } = this.state
    return (
      <div>
        <h2>Create new </h2>
        {this.state.error && <h4 style={{'color':'red'}}>{this.state.error}</h4>}
        {this.state.message && <h4 style={{'color':'green'}}>{this.state.message}</h4>}
        <form onSubmit={this.handleSubmit}>
          <div>
            title
            <input
              value={title}
              onChange={this.handleChange}
              name="title"
            />
          </div>
          <div>
            author
            <input
              value={author}
              onChange={this.handleChange}
              name="author"
            />
          </div>
          <div>
            url
            <input
              value={url}
              onChange={this.handleChange}
              name="url"
            />
          </div>
          <button type="submit">create</button>
        </form>
      </div>
    )
  }
}

BlogForm.propTypes = {
  onBlogCreated: PropTypes.func.isRequired
}

export default BlogForm
