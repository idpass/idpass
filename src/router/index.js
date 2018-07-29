import Vue from 'vue'
import Router from 'vue-router'

import Contacts from '@/views/contacts'
import Person from '@/views/person'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'contacts',
      component: Contacts
    }, {
      path: '/persons',
      name: 'person',
      component: Person
    }
  ]
})
