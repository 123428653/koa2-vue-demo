import axios from 'axios'

const http = axios.create({
  // timeout: 10000 // request timeout
})

http.interceptors.request.use(
  config => {
    // config.headers['Authorization'] = token
    return config
  },
  error => {
    console.log(error) // for debug
    Promise.reject(error)
  }
)

http.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default http
