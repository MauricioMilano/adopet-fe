
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'login', component: () => import('pages/Login.vue') },
      { path: 'logout', component: () => import('pages/Logout.vue') },
      { path: 'cadastro', component:()=> import('pages/Cadastro.vue')},
      {
        path: 'feed',
        component: () => import(/* webpackChunkName: "Private." */ 'pages/Feed.vue'),
        meta: { requiresAuth: true, roles: ['admin', 'user'] }
      },
      {
        path: 'post',
        component: () => import(/* webpackChunkName: "Publicacao." */ 'pages/Publicacao.vue'),
        meta: { requiresAuth: true, roles: ['admin', 'user'] }
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
