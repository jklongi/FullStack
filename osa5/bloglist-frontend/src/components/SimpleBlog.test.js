import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  const blog = {
    title: 'MyBlog',
    author: 'Mocker',
    likes: 5
  }
  it('renders title', () => {
    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    const contentDiv = blogComponent.find('.content')

    expect(contentDiv.text()).toContain(blog.title)
  })

  it('renders author', () => {
    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    const contentDiv = blogComponent.find('.content')

    expect(contentDiv.text()).toContain(blog.author)
  })

  it('renders likes', () => {
    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    const contentDiv = blogComponent.find('.information')

    expect(contentDiv.text()).toContain(`blog has ${blog.likes} likes`)
  })

  it('click the button twice calls handler twice', () => {
    const mockHandler = jest.fn()
    const blogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler}/>)
    const button = blogComponent.find('button')

    button.simulate('click')
    button.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})
