import Vue from 'vue'
function parseJwt (token) {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''))

  return JSON.parse(jsonPayload)
}

export const AUTH_SUCCESS = (state, resp) => {
  state.token = resp.data.accessToken
  localStorage.setItem('payload',JSON.stringify(resp.data))
  state.payload = resp.data
}

export const AUTH_ERROR = (state) => {
  state.status = 'error'
}

export const AUTH_LOGOUT = (state) => {
  state.token = ''
  state.payload = {}
}

export const AUTH_PAYLOAD = (state, token) => {  
  state.payload = JSON.parse(localStorage.getItem("payload")) || {}
  if(state.payload){
    state.token = state.payload.accessToken
    // Vue.prototype.$axios.defaults.headers.common.Authorization = `Bearer ${state.token}`
    
  }
  state.token = ""
}
