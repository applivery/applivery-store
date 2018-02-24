import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/components/views/Login'
import List from '@/components/views/List'
import Detail from '@/components/views/Detail'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login,
      meta: { requiredAuth: false },
    },
    {
      name: 'list',
      path: '/list',
      component: List,
      meta: { requiredAuth: true },
    },
    {
      name: 'detail',
      path: '/detail/:appId',
      component: Detail,
      meta: { requiredAuth: true },
      children: [
        {
          path: 'history',
          name: 'history',
        },
      ],
    },
    {
      path: '*',
      redirect: { name: 'login' },
    },
  ],
  async scrollBehavior(to, from, savedPosition) {
    await new Promise(resolve => setTimeout(resolve, 400))
    if (from.name == 'detail' && to.name == 'history') return
    if (from.name == 'history' && to.name == 'detail') return
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
})

export default router
