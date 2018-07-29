<template lang="pug">
  v-tabs(v-model="currentItem" fixed-tabs)
    v-tab(:key="'details'") Details
    v-tab(:key="'household'") Household
    v-tab(:key="'claims'") Claims
    v-tab-item(:key="'details'")
      v-card(flat)
        v-card-text
          formio(:form="form" :submission="submission" :options="{}" v-on:submit="onSubmit"  v-on:change="onChange")
          v-btn(color="error" @click="onCancel(submission)") Cancel
          v-btn(color="success" @click="postContact(submission.data)" :disabled="!isValid") Save
    v-tab-item(:key="'household'")
      v-card(flat)
        v-card-text HouseHold
    v-tab-item(:key="'claims'")
      v-card(flat)
        v-card-text Youpi Claims
</template>


<script>
  import {Form} from 'vue-formio'
  import {mapActions} from 'vuex'

  export default {
    name: 'person',

    data () {
      return {
        menu: false,
        isValid: false,
        currentItem: 'details',
        form: {
          name: 'details-person',
          _id: 'details-person',
          'components': [
            {
              'input': true,
              'tableView': true,
              'inputType': 'text',
              'inputMask': '',
              'label': 'Last Name',
              'key': 'lastName',
              'placeholder': 'Enter your last name',
              'prefix': '',
              'suffix': '',
              'multiple': false,
              'defaultValue': '',
              'protected': false,
              'unique': false,
              'persistent': true,
              'validate': {
                'required': true,
                'minLength': 3,
                'maxLength': '',
                'pattern': '',
                'custom': '',
                'customPrivate': false
              },
              'conditional': {
                'show': '',
                'when': null,
                'eq': ''
              },
              'type': 'textfield',
              'autofocus': false,
              'hidden': false,
              'clearOnHide': true,
              'spellcheck': true,
              'labelPosition': 'top',
              'inputFormat': 'plain',
              'tags': [],
              'properties': {}
            },
            {
              'input': true,
              'tableView': true,
              'inputType': 'text',
              'inputMask': '',
              'label': 'First Name',
              'key': 'firstName',
              'placeholder': 'Enter your first name',
              'prefix': '',
              'suffix': '',
              'multiple': false,
              'defaultValue': '',
              'protected': false,
              'unique': false,
              'persistent': true,
              'validate': {
                'required': true,
                'minLength': '',
                'maxLength': '',
                'pattern': '',
                'custom': '',
                'customPrivate': false
              },
              'conditional': {
                'show': '',
                'when': null,
                'eq': ''
              },
              'type': 'textfield',

              'autofocus': true,
              'hidden': false,
              'clearOnHide': true,
              'spellcheck': true,
              'labelPosition': 'top',
              'inputFormat': 'plain',
              'tags': [],
              'properties': {},
              'calculateValue': ''
            },
            {
              'input': true,
              'tableView': true,
              'label': 'Message',
              'key': 'message',
              'placeholder': 'What do you think?',
              'prefix': '',
              'suffix': '',
              'rows': 3,
              'multiple': false,
              'defaultValue': '',
              'protected': false,
              'persistent': true,
              'validate': {
                'required': false,
                'minLength': '',
                'maxLength': '',
                'pattern': '',
                'custom': ''
              },
              'type': 'textarea',
              'conditional': {
                'show': false,
                'when': null,
                'eq': ''
              },

              'autofocus': false,
              'hidden': false,
              'wysiwyg': false,
              'clearOnHide': true,
              'spellcheck': true
            },
            {
              'input': true,
              'tableView': true,
              'label': 'Signature',
              'key': 'signature',
              'placeholder': '',
              'footer': 'Sign above',
              'width': '100%',
              'height': '150px',
              'penColor': 'black',
              'backgroundColor': 'rgb(245,245,235)',
              'minWidth': '0.5',
              'maxWidth': '2.5',
              'protected': false,
              'persistent': true,
              'hidden': false,
              'clearOnHide': true,
              'validate': {
                'required': false
              },
              'type': 'signature',
              'hideLabel': true,
              'tags': [],
              'conditional': {
                'show': '',
                'when': null,
                'eq': ''
              },
              'properties': {}
            }
          ],
          'display': 'form'
        },
        // form: {
        //   name: 'details-person',
        //   _id: 'details-person',
        //   components: [
        //     {
        //       type: 'textfield',
        //       key: 'firstName',
        //       label: 'First Name',
        //       placeholder: 'Enter your first name.',
        //       input: true,
        //       validate: {
        //         required: false,
        //         minLength: '4',
        //         maxLength: '',
        //         pattern: '',
        //         custom: '',
        //         customPrivate: false
        //       }
        //     },
        //     {
        //       type: 'textfield',
        //       key: 'lastName',
        //       label: 'Last Name',
        //       placeholder: 'Enter your last name',
        //       input: true
        //     }
        //   ]
        // },
        submission: {
          data: {
            firstName: 'Jeremi',
            lastName: 'Joslin'
          }
        }
      }
    },
    components: {formio: Form},
    computed: {},
    methods: {
      onSubmit () {
        let form = getForm('details-person')
        this.isValid = form.isValid()
        console.log(this.isValid)
        if (!this.isValid) {
          return
        }
        console.log(this.submission.data)
        // postContact(this.submission.data)
      },
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
