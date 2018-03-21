import Vue from 'vue'
import Router from 'vue-router'

import Home from './routes/Home'
// import Mapping from './routes/Mapping'
// import TableEntities from './routes/TableEntities'
// import TableLinksType from './routes/TableLinksType'
import Trapp from './routes/Trapp'

import PageNotFound from './routes/PageNotFound'

Vue.use(Router)

const routes = [
  // {
  //   path: '/mapping',
  //   name: 'Mapping',
  //   component: Mapping,
  //   icon: 'bubble_chart'
  // },
  // {
  //   path: '/table/entities',
  //   name: 'Table des entités',
  //   component: TableEntities,
  //   icon: 'list'
  // },
  // {
  //   path: '/table/links_type',
  //   name: 'Table des types de liens',
  //   component: TableLinksType,
  //   icon: 'format_list_numbered'
  // },
  {
    path: '/trapp',
    name: 'Mapping TRAPP',
    component: Trapp,
    icon: 'view_list'
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
