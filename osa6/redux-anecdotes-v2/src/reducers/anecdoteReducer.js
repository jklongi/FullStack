/*const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000*Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}*/

//const initialState = anecdotesAtStart.map(asObject)

import anecdoteService from '../services/anecdotes'

const reducer = (store = [], action) => {
  if (action.type==='VOTE') {
    return store.map(anecdote => {
      if(anecdote.id === action.anecdote.id){
        return action.anecdote
      }
      return anecdote
    })
  }
  if (action.type === 'CREATE') {

    return [...store, action.anecdote]
  }
  if(action.type === 'INIT_ANECDOTES'){
    return action.anecdotes
  }

  return store
}

export default reducer


export const createNew = content => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE',
      anecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      anecdotes
    })
  }
}

export const voteAnecdote = voted => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.voteAnecdote(voted)
    dispatch({
      type: 'VOTE',
      anecdote
    })
  }
}


export const anecdoteInitialization = anecdotes => ({
  type: 'INIT_ANECDOTES',
  anecdotes
})

export const anecdoteCreation = anecdote => ({
  type: 'CREATE',
  anecdote
})

export const anecdoteVote = anecdote => ({
  type: 'VOTE',
  anecdote
})
