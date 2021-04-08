
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'teleapp', component: () => import('src/pages/PageUsers.vue') },
      { path: '/chat/:otherUserId', name: 'chat', component: () => import('src/pages/PageChat.vue') },
      { path: '/auth', name: 'auth', component: () => import('src/pages/PageAuth.vue') },
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
