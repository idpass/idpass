<template lang="pug">
  
  v-card
    v-card-text
      formbuilder(:form="form", :options="{}")
      v-btn(color="error", @click="onCancel(form)") 
        | Cancel
      v-btn(color="success", @click="postForm(form)") 
        | Save

</template>


<script>
  import {FormBuilder} from 'vue-formio'
  import {mapActions} from 'vuex'

  export default {
    name: 'forms',
    created () {
      this.$store.dispatch('forms/getForms')
    },

    data () {
      return {
        form: {
          name: 'details-person',
          _id: 'details-person',
          'display': 'form',
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
      }
    },
    components: {formbuilder: FormBuilder},
    computed: {},
    methods: {
      onChange () {
        console.log('onChange', arguments)
        let form = getForm('details-person')
        this.isValid = form.isValid()
      },
      onCancel () {
        let form = getForm('details-person')
        form.resetValue()
        console.log(form)
        console.log('onCancel', arguments)
      },

      ...mapActions('contacts', [
        'postContact'
      ])
    }
  }

  function getForm (name) {
    for (let form of Object.values(parent.Formio.forms)) {
      if (form.form.name === name) {
        return form
      }
    }
  }
</script>


<style>

</style>
