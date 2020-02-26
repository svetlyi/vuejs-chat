import Vue from 'vue'
import VueRouter from 'vue-router'
import Chat from '../chat/components/chat.vue'
import Authorization from '../user/components/authorization'
import UserSettings from '../user/components/user-settings'
import userRepository from '../user/repository/user'

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
  },
  {
    path: '/user',
    name: 'userSettings',
    component: UserSettings
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL || '/app/',
  routes
})

router.beforeEach((to, from, next) => {
  if (!userRepository.isAuthenticated() && to.path !== '/authorization') next('/authorization')
  else next()
})

export default router
