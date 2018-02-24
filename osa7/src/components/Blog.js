import React from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'
import { Button } from 'reactstrap'

class Blog extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      collapsed: false
    }
  }
  toggle = () => {
    this.setState({ collapsed: !this.state.collapsed })
  }
  likeBlog = () => {
    const { blog } = this.props
    blogService.update(blog._id, {
      user: blog.user ? blog.user._id : null,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }).then(() => {
      this.props.getBlogs()
    }).catch(error => {
      console.log(error)
    })
  }
  deleteBlog = () => {
    const { blog } = this.props
    if(window.confirm(`delete ${blog.title} by ${blog.author}?`)){
      blogService.remove(blog._id).then(() => {
        this.props.getBlogs()
      }).catch(error => {
        console.log(error)
      })
    }
  }
  render(){
    const { blog, user } = this.props
    if(!blog) return null

    return (
      <div>
        <div className="content">
          <h2>{blog.title} by {blog.author}</h2>
        </div>

        <div className="information">
          <a href={blog.url}>{blog.url}</a>
          <div>
            {blog.likes} likes
            <Button color="primary" onClick={this.likeBlog}>Like</Button>
          </div>
          {blog.user && <div>added by {blog.user.name}</div>}
          {(!blog.user || blog.username === user.username ) && <Button color="danger" onClick={this.deleteBlog}>Delete</Button>}
        </div>
      </div>
    )
  }
}

Blog.propTypes = {
  user: PropTypes.object,
  blog: PropTypes.object
}


export default Blog
