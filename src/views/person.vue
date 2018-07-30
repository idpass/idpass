<template lang="pug">
  div
    v-tabs(v-model="currentItem" fixed-tabs)
      v-tab(:key="'details'") Details
      v-tab(:key="'household'") Household
      v-tab(:key="'claims'") Claims
      v-tab-item(:key="'details'")
        v-card(flat)
          v-card-text
            v-container.pa-4(grid-list-sm)
              formio(:form="personForm" :submission="submission" :options="{}" v-on:change="onChange")
              v-btn(color="error" @click="onCancel(submission)") Cancel
              v-btn(color="success" @click="postContact(submission.data)" :disabled="!isValid") Save
      v-tab-item(:key="'household'")
        v-card(flat)
          v-card-text Not Implemented
      v-tab-item(:key="'claims'")
        v-card(flat)
          v-card-text(v-if="!otherForm") No Claims yet
          v-container.pa-4(grid-list-sm v-if="otherForm")
            formio(:form="otherForm" :submission="otherSubmission" :options="{}" v-on:change="onChange")
            v-btn(color="error" @click="") Cancel
            v-btn(color="success" @click="" :disabled="!isValid") Save


    // Menu
    v-menu(top offset-y v-if="!isEditingForm")
      v-btn(fab, dark,
          slot="activator"
          v-model="fab"
          color="blue darken-2")
          v-icon add
          v-icon close
      v-list
        v-list-tile(v-for="(item, index) in otherForms" :key="index" @click="onSelectOtherForm(item)")
          v-list-tile-title {{ item.name }}
</template>


<script>
  import {Form} from 'vue-formio'
  import {mapActions, mapState} from 'vuex'

  export default {
    name: 'person',

    data () {
      return {
        fab: false,
        menu: false,
        isValid: false,
        currentItem: null,
        submission: {
          data: {
            firstName: 'Jeremi',
            lastName: 'Joslin'
          }
        },
        otherForm: null,
        otherSubmission: {}
      }
    },
    created () {
      this.$store.dispatch('forms/getForms')
    },
    components: {formio: Form},
    computed: {
      ...mapState('forms', [
        'personForm',
        'otherForms'
      ])},
    methods: {
      onChange () {
        let form = getForm('person')
        if (form) {
          this.isValid = form.isValid()
        } else {
          this.isValid = false
        }
      },
      onCancel () {
        console.log('onCancel', arguments)
        let form = getForm('person')
        console.log(form)
        form.resetValue()
      },

      onSelectOtherForm (form) {
        this.otherSubmission = {}
        this.otherForm = form
      },

      ...mapActions('contacts', [
        'postContact'
      ])
    }
  }

  function getForm (name) {
    for (let form of Object.values(parent.Formio.forms)) {
      console.log(form, form._form, form._form.kind)
      if (form._form.kind === name) {
        return form
      }
    }
  }
</script>


<style>

</style>
