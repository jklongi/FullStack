import React from 'react'
import { anecdoteVote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes'

class AnecdoteList extends React.Component {
  handleClick = async (anecdote) => {
    const voted = await anecdoteService.voteAnecdote(anecdote)
    this.props.anecdoteVote(voted)
    this.props.notify(`You voted '${anecdote.content}'`, 5)
  }
  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        {this.props.visibleAnecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => this.handleClick(anecdote)}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const anecdotesToShow = (anecdotes, filter) => anecdotes.filter(anecdote => anecdote.content.includes(filter))

const mapStateToProps = state => ({
  visibleAnecdotes: anecdotesToShow(state.anecdotes, state.filter.rule)
})

export default connect(mapStateToProps, { notify, anecdoteVote })(AnecdoteList)
