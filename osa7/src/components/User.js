import React from 'react'
import { Link } from 'react-router-dom'

class User extends React.Component {
  render(){
    const { user } = this.props
    if(!user) return null
    return (
      <div>
        <h2>{user.name}</h2>
        <h3>Added blogs</h3>
        <ul>
          {
            user.blogs.map(blog => (
              <li key={blog._id}>
                <Link to={`/blogs/${blog._id}`}>{blog.title} by {blog.author}</Link>
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}

export default User
