import PouchDB from 'pouchdb-browser'
import { getField, updateField } from 'vuex-map-fields'

import { generateId } from '@/utils'

const db = new PouchDB('idpass')

export default {
  namespaced: true,

  state: {
    contacts: [],
    contactForm: {
      legalName: '',
      shortName: '',
      gender: -1, // 0 - female, 1 - male
      birthDate: ''
    },
    isEditingContact: false,
    isDeletingContact: false,
    targetContact: {}
  },

  getters: {
    getField
  },

  mutations: {
    updateField,

    setContacts (state, contacts) {
      state.contacts = contacts
    },

    showContactDialog (state) {
      state.isEditingContact = true
    },

    hideContactDialog (state) {
      state.isEditingContact = false
    },

    showDeleteDialog (state, contact) {
      state.targetContact = contact
      state.isDeletingContact = true
    },

    hideDeleteDialog (state) {
      state.isDeletingContact = false
      state.targetContact = {}
    },

    updateContact (state, contact) {
      let contactIdx = state.contacts.findIndex(({_id}) => _id === contact._id)
      if (contactIdx > -1) {
        state.contacts.splice(contactIdx, 1, contact)
      } else {
        state.contacts.push(contact)
      }
    },

    removeContact (state, id) {
      let contactIdx = state.contacts.findIndex(({_id}) => _id === id)
      state.contacts.splice(contactIdx, 1)
    },

    clearForm (state) {
      state.contactForm = {}
    }
  },

  actions: {

    async getContacts ({commit}) {
      let doc = await db.allDocs({include_docs: true})
      let contacts = doc.rows.map(row => row.doc)
      commit('setContacts', contacts)
    },

    async postContact ({commit, dispatch, state}) {
      let contact = {
        _id: `contact:${generateId()}`,
        ...state.contactForm
      }
      await dispatch('putContact', contact)
    },

    async putContact ({commit}, contact) {
      if (contact._rev) {
        let doc = await db.get(contact._id)
        contact._rev = doc._rev
      }
      await db.put(contact)
      let updatedContact = await db.get(contact._id)
      commit('updateContact', updatedContact)
      commit('hideContactDialog')
      commit('clearForm')
    },

    async deleteContact ({commit}, id) {
      let doc = await db.get(id)
      doc._deleted = true
      await db.put(doc)
      commit('hideDeleteDialog')
      commit('removeContact', id)
    },

    async syncContacts (context, server) {
      // TODO
      await Promise.resolve()
    }
  }
}
