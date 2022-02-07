

export const SAVE_PROFILE = (state, resp) => {
  state.name = resp.data.username
  localStorage.setItem('profile',JSON.stringify(resp.data))
  state.role = resp.data.role
}

