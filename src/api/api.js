import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8085/api/bff'
})

export default api