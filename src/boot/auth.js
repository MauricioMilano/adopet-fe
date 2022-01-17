export default async ({ app, router, Vue, store }) => {
  // const tokenRestored = localStorage.getItem('token')
  store.commit('auth/AUTH_PAYLOAD')
  router.beforeEach((to, from, next) => {
    const toRoute = to.matched.slice(-1)[0]
    if (toRoute.meta.requiresAuth) {
      if (store.getters['auth/isAuthenticated']) {
        if (toRoute.meta.roles && toRoute.meta.roles.indexOf(store.getters['auth/getRole']) === -1) {
          next({ path: '/404' })
          return
        }
        // Vue.prototype.$axios.defaults.headers.common.Authorization = `Bearer ${this.$store.getters["auth/getToken"]}`
        next()
        return
      }

      next({ path: '/login', params: { nextUrl: to.fullPath } })
    } else {
      next()
    }
  })
}
