import React from 'react'
import { NavLink as RRNavLink } from 'react-router-dom'
import BlogForm from './BlogForm'
import LoginForm from './LoginForm'
import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  NavbarBrand
} from 'reactstrap'


class Menu extends React.Component {
  render(){
    const { user } = this.props
    return (
      <div>
        <Navbar color="light" light className="my-3 rounded">
          <NavbarBrand href="#">Blog App</NavbarBrand>
          <Nav>
            <NavItem>
              <NavLink tag={ RRNavLink } activeStyle={{ 'borderBottom':'2px solid #007bff' }} exact to="/">Blogs</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ RRNavLink } activeStyle={{ 'borderBottom':'2px solid #007bff' }} exact to="/users">Users</NavLink>
            </NavItem>
            {
              user ? (
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    {user.name}
                  </DropdownToggle>
                  <DropdownMenu >
                    <DropdownItem onClick={this.props.logout}>
                      Logout
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              ) : (
                <LoginForm onUserLogin={this.props.onUserLogin} />
              )
            }
          </Nav>
        </Navbar>
        <div className="my-3">
          <BlogForm onBlogCreated={this.props.getBlogs} />
        </div>
      </div>
    )
  }
}

export default Menu
