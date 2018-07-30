import PouchDB from 'pouchdb-browser'
import { getField, updateField } from 'vuex-map-fields'

import { generateId } from '@/utils'

const db = new PouchDB('idpass')

export default {
  namespaced: true,

  state: {
    personForm: {},
    householdForm: {},
    forms: [],
    otherForms: [],
    editForm: {
      kind: 'person',
      display: 'form',
      name: '',
      components: [
        {
          type: 'textfield',
          key: 'firstName',
          label: 'First Name',
          placeholder: 'Enter your first name.',
          input: true,
          validate: {
            required: false,
            minLength: '4',
            maxLength: '',
            pattern: '',
            custom: '',
            customPrivate: false
          }
        },
        {
          type: 'textfield',
          key: 'lastName',
          label: 'Last Name',
          placeholder: 'Enter your last name',
          input: true
        }
      ]
    },
    isEditingForm: false,
    isEditingFormDefinition: false
  },

  getters: {
    getField
  },

  mutations: {
    updateField,

    setForms (state, forms) {
      updateField(state, {path: 'forms', value: forms})
    },
    setOtherForms (state, forms) {
      updateField(state, {path: 'otherForms', value: forms})
    },
    setPersonForm (state, form) {
      console.log('setPersonForm', form)
      updateField(state, {path: 'personForm', value: form})
    },

    setHouseholdForm (state, form) {
      updateField(state, {path: 'householdForm', value: form})
    },

    selectFormToEdit (state, form) {
      let formCopy = JSON.parse(JSON.stringify(form))
      updateField(state, {path: 'editForm', value: formCopy})
      state.isEditingForm = true
    },

    showEditingFormDefinitionDialog (state) {
      state.isEditingFormDefinition = true
      let editForm = {
        kind: 'person',
        display: 'form',
        name: '',
        components: [
          {
            type: 'textfield',
            key: 'firstName',
            label: 'First Name',
            placeholder: 'Enter your first name.',
            input: true,
            validate: {
              required: false,
              minLength: '4',
              maxLength: '',
              pattern: '',
              custom: '',
              customPrivate: false
            }
          },
          {
            type: 'textfield',
            key: 'lastName',
            label: 'Last Name',
            placeholder: 'Enter your last name',
            input: true
          }
        ]
      }
      let formCopy = JSON.parse(JSON.stringify(editForm))
      updateField(state, {path: 'editForm', value: formCopy})
    },

    hideEditingFormDefinitionDialog (state) {
      state.isEditingFormDefinition = false
    },

    hideEditingFormDialog (state) {
      state.isEditingForm = false
    }
  },

  actions: {

    async getForms ({commit}) {
      // let doc = await db.allDocs({include_docs: true})
      // let contacts = doc.rows.map(row => row.doc)
      let forms = await db.allDocs({
        include_docs: true,
        attachments: false,
        startkey: 'form:'
      })
      forms = forms.rows.map(row => row.doc)
      console.log('getForms', forms)
      let personForm = forms.find(function (form) {
        return form.kind === 'person'
      })
      let householdForm = forms.find(function (form) {
        return form.kind === 'household'
      })
      let otherForms = forms.filter(function (form) {
        return form.kind === 'other'
      })
      commit('setForms', forms)
      commit('setOtherForms', otherForms)
      commit('setPersonForm', personForm)
      commit('setHouseholdForm', householdForm)
    },

    async postForm ({commit, dispatch, state}, details) {
      console.log('postForm', arguments)
      let form = {
        _id: `form:${generateId()}`,
        ...state.editForm
      }
      await dispatch('putForm', form)
    },

    async putForm ({commit, dispatch}, form) {
      // TODO: Not sure we want to override it
      if (form._rev) {
        let doc = await db.get(form._id)
        form._rev = doc._rev
      }
      await db.put(form)
      await dispatch('getForms')
      commit('hideEditingFormDefinitionDialog')
      commit('hideEditingFormDialog')
    },

    async deleteForm ({state, commit, dispatch}) {
      let doc = state.editForm
      doc._deleted = true
      await db.put(doc)
      await dispatch('getForms')
      commit('hideEditingFormDialog')
    }
  }
}
