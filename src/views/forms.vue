<template lang="pug">
  div
    div
      v-card(flat v-if="!isEditingForm")
        v-list(two-line subheader)
          v-list-tile(v-for="form in forms" :key="form._id" @click="selectFormToEdit(form)")
            v-list-tile-content
              v-list-tile-title {{ form.name }}
              v-list-tile-sub-title {{ form.kind }}
      v-card(flat v-else-if="isEditingForm")
        v-container.pa-4(grid-list-sm)
          formbuilder(v-bind:form="localEditForm" v-bind:options="{}")
          v-divider

    v-btn(fab, bottom, right, dark, fixed,
      color="pink",
      @click.stop="showEditingFormDefinitionDialog"
      v-if="!isEditingForm")
      v-icon add

    v-speed-dial(bottom, right, fixed
      v-model="fab"
      transition="scale-transition"
      :open-on-hover="true"
      v-if="isEditingForm")
      v-btn(fab, dark,
        slot="activator"
        v-model="fab"
        color="blue darken-2")
        v-icon check
        v-icon close

      v-btn(fab, dark, small,
        color="green",
        @click.stop="saveForm")
        v-icon check

      v-btn(fab, dark, small,
        color="red",
        @click.stop="deleteForm")
        v-icon delete

    v-dialog(:fullscreen="$vuetify.breakpoint.mdAndDown", v-model="isEditingFormDefinition", width="800px")
      v-card
        v-card-title.grey.lighten-4.py-4.title
          | Create Form
        v-container.pa-4(grid-list-sm)
          form
            v-text-field(v-model="name", label="Form Name")
            v-select(:items="kindItems" v-model="kind" label="Kind of form")

        v-card-actions
          v-spacer
          v-btn(flat, @click="hideEditingFormDefinitionDialog")
            | Cancel
          v-btn(flat, @click="postForm", color="primary")
            | Save
</template>


<script>
  import {FormBuilder} from 'vue-formio'
  import { mapState, mapActions, mapMutations } from 'vuex'
  import { createHelpers } from 'vuex-map-fields'

  const { mapFields } = createHelpers({
    getterType: 'forms/getField',
    mutationType: 'forms/updateField'
  })

  export default {
    name: 'forms',
    created () {
      this.$store.dispatch('forms/getForms')
    },

    data () {
      return {
        fab: false,
        localEditForm: null,
        kindItems: [
          {text: 'Person', value: 'person'},
          {text: 'Household', value: 'household'},
          {text: 'Other', value: 'other'}
        ]
      }
    },
    components: {formbuilder: FormBuilder},
    computed: {
      ...mapState('forms', [
        'forms',
        'isEditingFormDefinition',
        'editForm',
        'isEditingForm'
      ]),
      ...mapFields([
        'editForm.kind',
        'editForm.name'
      ])
    },
    methods: {
      saveForm () {
        this.$store.dispatch('forms/putForm', this.localEditForm)
      },

      ...mapActions('forms', [
        'postForm',
        'deleteForm'
      ]),
      ...mapMutations('forms', [
        'selectFormToEdit',
        'showEditingFormDefinitionDialog',
        'hideEditingFormDefinitionDialog'
      ])
    },
    watch: {
      editForm (newValue) {
        let formCopy = JSON.parse(JSON.stringify(newValue))
        this.localEditForm = formCopy
      }
    }
  }
</script>


<style>

</style>
