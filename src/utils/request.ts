import axios from 'axios'
import store from '@/store'
import createMessage from '@/components/createMessage'

const httpRequest = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:8080/api' : 'http://zhihu.visionwu.top/api',
  timeout: 5000
})

httpRequest.interceptors.request.use(config => {
  if (store.state.token) {
    config.headers.Authorization = `Bearer ${store.state.token}`
  }
  store.commit('updateLoading', true)
  return config
})

httpRequest.interceptors.response.use(response => {
  setTimeout(() => {
    store.commit('updateLoading', false)
  }, 500)
  return response
}, (error) => {
  const { data } = error.response
  createMessage({
    type: 'danger',
    message: data.error
  })
  store.commit('updateLoading', false)
  return Promise.reject(error)
})

export default httpRequest
