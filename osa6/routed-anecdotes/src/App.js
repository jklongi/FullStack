import React from 'react'
import { HashRouter as Router, Route, Link, NavLink as RRNavLink } from 'react-router-dom'
import {
  Container,
  ListGroup,
  ListGroupItem,
  Col,
  Row,
  Nav,
  Navbar,
  NavItem,
  NavLink,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  NavbarBrand,
  Alert
} from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.css'

const Menu = () => (
  <div className="position-fixed" style={{'top':0, 'left': 0, 'right': 0}}>
    <Navbar color="light" light>
      <NavbarBrand>
        Software anecdotes
      </NavbarBrand>
      <Nav>
        <NavItem>
          <NavLink tag={RRNavLink} activeStyle={{'borderBottom':'2px solid #0056b3'}} exact to="/">Anecdotes</NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={RRNavLink} activeStyle={{'borderBottom':'2px solid #0056b3'}} exact to="/create">Create New</NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={RRNavLink} activeStyle={{'borderBottom':'2px solid #0056b3'}} exact to="/about">About</NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  </div>
)

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ListGroup>
      {anecdotes.map(anecdote => <ListGroupItem key={anecdote.id} ><Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link></ListGroupItem>)}
    </ListGroup>
  </div>
)

const Anecdote = ({ anecdote }) => (
  <div>
    <h1>{anecdote.content} by {anecdote.author}</h1>
    <p>has {anecdote.votes} votes</p>
    <p>For more information see {anecdote.info}</p>
  </div>
)

const About = () => (
  <Row>
    <Col>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
    </Col>
    <Col>
      <img style={{'width': '100%'}} src="https://img.purch.com/h/1000/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzAzOS85NzQvb3JpZ2luYWwvQWxhbi1UdXJpbmcuanBn" alt="Alan Turing"></img>
    </Col>
  </Row>
)

const Footer = () => (
  <div className="position-fixed bg-light p-3" style={{'bottom':0, 'left': 0, 'right': 0}}>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')
  }

  render() {
    return(
      <div>
        <h2>create a new anecdote</h2>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="content">content</Label>
            <Input id="content" name='content' value={this.state.content} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="author">author</Label>
            <Input id="author"  name='author' value={this.state.author} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="url">url for more info</Label>
            <Input id="url" name='info' value={this.state.info} onChange={this.handleChange} />
          </FormGroup>
          <Button>create</Button>
        </Form>
      </div>
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    }
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({
      anecdotes: this.state.anecdotes.concat(anecdote),
      notification: `new anecdote '${anecdote.content}' created!`
    })
    setTimeout(() => {
      this.setState({ notification: '' })
    }, 10000)
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {
    return (
      <Container style={{'paddingTop':'58px'}}>
          {this.state.notification && <Alert color="success" className="my-3">{this.state.notification}</Alert>}
          <Router>
            <div className="py-5">
              <Menu />
              <Route exact path="/" render={({ history }) => <AnecdoteList anecdotes={this.state.anecdotes} />} />
              <Route path="/about" render={() => <About />} />
              <Route path="/create" render={({ history }) => <CreateNew history={history} addNew={this.addNew}/>} />
              <Route path="/anecdotes/:id" render={({ match }) =>
                <Anecdote anecdote={this.anecdoteById(match.params.id)}/>
              }/>
            </div>
          </Router>
        <Footer />
      </Container>
    );
  }
}

export default App;
