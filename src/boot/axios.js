import Vue from 'vue'
import axios from 'axios'
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8090',
  headers: {
    'Content-Type':"application/json",
    'Access-Control-Allow-Origin':'*'
  }
})
export default ({ Vue }) => {
  Vue.prototype.$axios = axiosInstance
}
export { axiosInstance }
