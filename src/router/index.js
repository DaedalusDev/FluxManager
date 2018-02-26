import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/router/routes/Home'
import Mapping from '@/router/routes/Mapping'
import TableEntities from '@/router/routes/TableEntities'
import TableLinksType from '@/router/routes/TableLinksType'

import PageNotFound from '@/router/routes/PageNotFound'

Vue.use(Router)

const routes = [
  {
    path: '/mapping',
    name: 'Mapping',
    component: Mapping,
    icon: 'bubble_chart'
  },
  {
    path: '/table/entities',
    name: 'Table des entités',
    component: TableEntities,
    icon: 'list'
  },
  {
    path: '/table/links_type',
    name: 'Table des types de liens',
    component: TableLinksType,
    icon: 'format_list_numbered'
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
