import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/home'
import Search from '@/views/search'
import Forms from '@/views/forms'
import Person from '@/views/person'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }, {
      path: '/search',
      name: 'search',
      component: Search
    }, {
      path: '/forms',
      name: 'forms',
      component: Forms
    }, {
      path: '/person',
      name: 'person',
      component: Person
    }
  ]
})
