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
    if(state.payload){
      return state.payload.accessToken
    }
    let hasPayload = JSON.parse(localStorage.getItem("payload")) || {}
    if(hasPayload) return hasPayload.token
    return null
}
