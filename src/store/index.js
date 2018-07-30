import Vue from 'vue'
import Vuex from 'vuex'
import { getField, updateField } from 'vuex-map-fields'

import contacts from './modules/contacts'
import forms from './modules/forms'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',

  modules: {
    contacts,
    forms
  },

  state: {

  },

  getters: {
    getField
  },

  mutations: {
    updateField
  },

  actions: {

  }
})
