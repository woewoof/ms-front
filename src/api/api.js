// Configuración de Axios para conectar con el BFF en el puerto 8082 no 8085
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8082/api/bff',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default api