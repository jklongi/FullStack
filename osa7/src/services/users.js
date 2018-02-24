import axios from 'axios'
const baseUrl = '/api/users'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const create = newBlog => {
  const config = {
    headers: { 'Authorization': token }
  }
  return axios.post(baseUrl, newBlog, config).then(res => res.data)
}

const update = (id, updatedBlog) => {
  const config = {
    headers: { 'Authorization': token }
  }
  return axios.put(`${baseUrl}/${id}`, updatedBlog, config).then(res => res.data)
}

const remove = id => {
  const config = {
    headers: { 'Authorization': token }
  }
  return axios.delete(`${baseUrl}/${id}`, config).then(res => res.data)
}

export default { getAll, setToken, create, update, remove }
