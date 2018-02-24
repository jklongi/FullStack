import React from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'
import Togglable from './Togglable'
import {
  Button,
  Form,
  FormGroup,
  Input,
} from 'reactstrap'

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
    }).catch(() => {
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
      <Togglable buttonLabel='Create'>
        { this.state.error && <h4 style={{ 'color':'red' }}>{this.state.error}</h4> }
        { this.state.message && <h4 style={{ 'color':'green' }}>{this.state.message}</h4> }
        <Form onSubmit={this.handleSubmit} inline>
          <FormGroup className='px-3'>
            <Input
              placeholder={'Title'}
              value={title}
              onChange={this.handleChange}
              name='title'
            />
          </FormGroup>
          <FormGroup className='px-3'>
            <Input
              placeholder={'Author'}
              value={author}
              onChange={this.handleChange}
              name='author'
            />
          </FormGroup>
          <FormGroup className='px-3'>
            <Input
              placeholder={'Url'}
              value={url}
              onChange={this.handleChange}
              name='url'
            />
          </FormGroup>
          <Button color='success' type='submit' className='px-3'>create</Button>
        </Form>
      </Togglable>
    )
  }
}

BlogForm.propTypes = {
  onBlogCreated: PropTypes.func.isRequired
}

export default BlogForm
