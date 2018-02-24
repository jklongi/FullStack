import axios from 'axios'

const getId = () => (100000*Math.random()).toFixed(0)

const path = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(path)
  return response.data
}

const createNew = async content => {
  const response = await axios.post(path, {
    content,
    votes: 0,
    id: getId()
  })
  return response.data
}

const voteAnecdote = async anecdote => {
  const response = await axios.patch(path + '/' + anecdote.id, {
    votes: anecdote.votes + 1
  })
  return response.data
}

export default { getAll, createNew, voteAnecdote }
