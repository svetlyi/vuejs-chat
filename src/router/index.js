import Vue from 'vue'
import VueRouter from 'vue-router'
import Chat from '../chat/components/chat.vue'
import Authorization from '../user/components/authorization'
import UserSettings from '../user/components/user-settings'
import UserStats from '../user/components/stats'
import userRepo from '../user/repository/user'

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
  },
  {
    path: '/user/stats',
    name: 'userStats',
    component: UserStats
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/app/',
  routes
})

router.beforeEach((to, from, next) => {
  if (!userRepo.isAuthenticated() && to.path !== '/authorization') {
    next('/authorization')
  } else {
    next()
  }
})

export default router
