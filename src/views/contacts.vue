<template lang="pug">

  v-container(grid-list-md)
    v-layout(row, wrap)
      v-flex(xs12, md6, lg4, v-for="(contact, i) in contacts", :key="i")
        v-card
          v-container(fluid, grid-list-lg): v-layout(row)
            v-flex(xs9)
              div
                h3.headline {{ contact.shortName }}
                div {{ contact.legalName }}
                div {{ (new Date(contact.birthDate)).toLocaleDateString() }}
            v-flex(xs3)
              v-card-media(contain, height="80px", :src=" 'http://i.pravatar.cc/80?u=' + contact._id ")
          v-divider
          v-card-actions
            v-btn(color="primary", flat, @click="showContactDialog(contact)")
              | Edit
            v-spacer
            v-btn(color="error", flat, icon, @click="showDeleteDialog(contact)")
              v-icon delete

    v-dialog(:value="isDeletingContact", @input="hideDeleteDialog", max-width="250px")
      v-card
        v-card-title.headline
          | Confirm Delete?
        v-card-text
          | Are you sure you want to delete contact: {{ targetContact.shortName }}
        v-card-actions
          v-spacer
          v-btn(flat, @click="hideDeleteDialog")
            | Cancel
          v-btn(flat, color="error", @click="deleteContact(targetContact._id)")
            | Delete

</template>


<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {

  created () {
    this.$store.dispatch('contacts/getContacts')
  },

  computed: {

    ...mapState('contacts', [
      'contacts',
      'isDeletingContact',
      'targetContact'
    ])
  },

  methods: {

    ...mapMutations('contacts', [
      'showContactDialog',
      'showDeleteDialog',
      'hideDeleteDialog'
    ]),

    ...mapActions('contacts', [
      'deleteContact',
      'confirmDelete'
    ])
  }
}
</script>


<style>

</style>
