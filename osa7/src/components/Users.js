import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'reactstrap'

class Users extends React.Component {
  render(){
    const users = this.props.users.map(user => (
      <tr key={user._id}>
        <td><Link to={`/users/${user._id}`}>{user.name}</Link></td>
        <td>{user.blogs.length}</td>
      </tr>
    ))

    return (
      <div>
        <h2>Users</h2>
        <Table>
          <thead>
            <tr>
              <th>User</th>
              <th>Blogs added</th>
            </tr>
          </thead>
          <tbody>
            {users}
          </tbody>
        </Table>
      </div>
    )
  }
}

export default Users
