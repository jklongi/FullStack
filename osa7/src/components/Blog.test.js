import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'MyBlog',
    author: 'Mocker',
    likes: 5,
    url: 'myUrl'
  }
  it('renders only title and author by default', () => {
    const blogComponent = shallow(<Blog blog={blog} />)
    const contentDiv = blogComponent.find('.content')

    expect(contentDiv.text()).toContain(blog.title)
    expect(contentDiv.text()).toContain(blog.author)

    const informationDiv = blogComponent.find('.information')

    expect(informationDiv.length).toBe(0)

  })

  it('renders url and likes when clicked', () => {
    const blogComponent = shallow(<Blog blog={blog} />)
    const contentDiv = blogComponent.find('.content')

    contentDiv.simulate('click')

    const informationDiv = blogComponent.find('.information')

    expect(informationDiv.text()).toContain(blog.likes)
    expect(informationDiv.text()).toContain(blog.url)
  })
})
