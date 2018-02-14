import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'

jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
  let app
  describe('user is not logged in', () => {
    beforeAll(() => {
      app = mount(<App />)
    })

    it('renders no blogs by default', () => {
      app.update()
      const blogComponents = app.find(Blog)
      expect(blogComponents.length).toEqual(0)
    })

    it('renders only form by default', () => {
      app.update()
      const loginFormComponents = app.find(LoginForm)
      expect(loginFormComponents.length).toEqual(1)
    })
  })
  describe('user is logged in', () => {
    beforeAll(() => {
      const user = {
        username: 'tester',
        token: '1231231214',
        name: 'Teuvo Testaaja'
      }

      localStorage.setItem('blogsAppUser', JSON.stringify(user))

      app = mount(<App />)
    })

    it('renders all blogs by default', () => {
      app.update()
      const blogComponents = app.find(Blog)
      expect(blogComponents.length).toEqual(blogService.blogs.length)
    })
  })
})
