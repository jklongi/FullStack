import React from 'react'
import ReactDOM from 'react-dom'

import Anecdote from './Components/Anecdote'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      anecdotes: this.props.anecdotes.map(anectode => ({ content: anectode, votes: 0 }))
    }
  }

  onNextAnectode = () => {
    return () => {
      this.setState({ selected: Math.floor(Math.random() * this.state.anecdotes.length) })
    }
  }

  onVote = () => {
    return () => {
      this.setState({
        anecdotes: this.state.anecdotes.map((anecdote, i) => {
          if(i === this.state.selected){
            anecdote.votes = anecdote.votes + 1
          }
          return anecdote
        })
      })
    }
  }

  render() {
    return (
      <div>
        <Anecdote anecdote={this.state.anecdotes[this.state.selected]} />
        <button onClick={this.onVote()}>Vote</button>
        <button onClick={this.onNextAnectode()}>Next anectode</button>
        <div>
          <h3>Anecdote with most votes:</h3>
          <Anecdote anecdote={this.state.anecdotes.reduce((a,b) => (a.votes > b.votes) ? a : b )} />
        </div>
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
