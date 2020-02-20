import Vue from 'vue'
import VueRouter from 'vue-router'
import Chat from '../chat/components/chat.vue'
import Authorization from '../user/components/authorization'
import auth from '../user/auth'

Vue.use(VueRouter)

import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
UIkit.use(Icons);

const routes = [
  {
    path: '/',
    redirect: '/chat'
  },
  {
    path: '/chat',
    name: 'chat',
    component: Chat
  },
  {
    path: '/authorization',
    name: 'authorization',
    component: Authorization
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL || '/app/',
  routes
})

router.beforeEach((to, from, next) => {
  if (!auth.isAuthenticated() && to.path !== '/authorization') next('/authorization')
  else next()
})
export default router
