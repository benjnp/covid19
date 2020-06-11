import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Philippines from '../views/Philippines'
import Global from '../views/Global'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/ph',
    name: 'ph',
    component: Philippines
  },
  {
    path: '/global',
    name: 'global',
    component: Global
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
