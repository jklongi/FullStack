import React from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'

class Blog extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      collapsed: true
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
    }).then(updatedBlog => {
      this.props.getBlogs()
    }).catch(error => {
      console.log(error)
    })
  }
  deleteBlog = () => {
    const { blog } = this.props
    if(window.confirm(`delete ${blog.title} by ${blog.author}?`)){
      blogService.remove(blog._id).then(res => {
        this.props.getBlogs()
      }).catch(error => {
        console.log(error)
      })
    }
  }
  render(){
    const { blog, user } = this.props

    const blogStyle = {
      'paddingTop': 10,
      'paddingLeft': 2,
      'border': 'solid',
      'borderWidth': 1,
      'marginBottom': 5
    }
    return (
      <div style={blogStyle}>
        <div onClick={this.toggle} className="content">
          {blog.title} {blog.author}
        </div>

        {!this.state.collapsed && (
          <div className="information">
            <a href={blog.url}>{blog.url}</a>
            <div>
              {blog.likes} likes
              <button onClick={this.likeBlog}>Like</button>
            </div>
            {blog.user && <div>added by {blog.user.name}</div>}
            {(!blog.user || blog.username === user.username ) && <button onClick={this.deleteBlog}>Delete</button>}
          </div>
        )}
      </div>
    )
  }
}

Blog.propTypes = {
  user: PropTypes.object,
  blog: PropTypes.object.isRequired
}


export default Blog
