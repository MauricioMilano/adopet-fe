export const isAuthenticated = (state) => { if(JSON.stringify(state.payload)=="{}") { return false } else { return true;}}
export const getRole = (state) => { 
    if(!state || !state.payload || !state.payload.roles) return null
    if (state.payload.roles.indexOf("ROLE_ADMIN")>-1){
        return "admin"
    }
    if(state.payload.roles.indexOf("ROLE_USER")>-1){
        return "user"
    }
    return null
}
export const getToken = (state) => {
    state.payload = JSON.parse(localStorage.getItem("payload")) || {}
    if(state.payload){
        state.token = state.payload.accessToken;
      return state.token
    }
    state.token = ""
    return state.token
}
