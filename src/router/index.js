import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/router/routes/Home'
import Mapping from '@/router/routes/Mapping'
import PageNotFound from '@/router/routes/PageNotFound'

Vue.use(Router)

const routes = [
  {
    path: '/mapping',
    name: 'Mapping',
    component: Mapping,
    icon: 'bubble_chart'
  }
]

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Accueil',
      component: Home,
      icon: 'home'
    },
    ...routes,
    { path: '*', component: PageNotFound }
  ]
})
