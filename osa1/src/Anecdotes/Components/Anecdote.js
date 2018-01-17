import React from 'react'

const Anecdote = props => (
  <div>
    <p>{props.anecdote.content}</p>
    <p>has {props.anecdote.votes} votes</p>
  </div>
)

export default Anecdote
