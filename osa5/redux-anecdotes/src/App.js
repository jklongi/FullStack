import React from 'react';


class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      anecdote: ''
    }
  }
  dispatch = (type, payload) => () => {
    this.props.store.dispatch({ type, payload })
  }
  handleChange = () => e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleSubmit = () => e => {
    e.preventDefault()
    this.dispatch('CREATE', this.state.anecdote)()
    this.setState({ anecdote: '' })
  }
  render() {
    const anecdotes = this.props.store.getState()
    anecdotes.sort((a,b) => a.votes - b.votes).reverse()
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.dispatch('VOTE', anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit()}>
          <div><input name="anecdote" value={this.state.anecdote} onChange={this.handleChange()} /></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

export default App
