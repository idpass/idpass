<template lang="pug">

  form
    v-container.pa-4(grid-list-sm)
      v-layout(row, wrap)
       
        v-flex(md8, xs12)
          v-layout(row)
            v-flex(xs6)
              v-text-field(
                v-model="legalName",
                prepend-icon="person",
                label="Full Legal Name")
            v-flex(xs6)
              v-text-field(
                v-model="shortName",
                label="Short Name")
          v-layout(row)
            v-flex(xs12, md6)
              v-select(
                prepend-icon="face",
                :items="genderItems"
                v-model="gender"
                label="Gender")
          v-layout(row)
            v-flex(xs12, md6)
              v-menu(
                ref="menu",
                :close-on-content-click="false",
                v-model="menu",
                :nudge-right="40",
                :return-value.sync="birthDate",
                lazy,
                transition="scale-transition",
                offset-y,
                full-width,
                min-width="290px")
                v-text-field(
                  slot="activator",
                  v-model="birthDate",
                  label="Birth Date",
                  prepend-icon="event",
                  readonly)
                v-date-picker(v-model="birthDate" @input="$refs.menu.save(birthDate)")
        
        v-divider
        
        v-flex(md4, xs12)
          

</template>


<script>
import { createHelpers } from 'vuex-map-fields'

const { mapFields } = createHelpers({
  getterType: 'contacts/getField',
  mutationType: 'contacts/updateField'
})

export default {
  name: 'contact-form',

  data () {
    return {
      menu: false,
      genderItems: [
        {text: 'Female', value: 'F'},
        {text: 'Male', value: 'M'},
        {text: 'Other', value: 'O'}
      ]
    }
  },

  computed: {

    // https://markus.oberlehner.net/blog/form-fields-two-way-data-binding-and-vuex/
    ...mapFields([
      'contactForm.legalName',
      'contactForm.shortName',
      'contactForm.gender',
      'contactForm.birthDate'
    ])
  }
}
</script>


<style>

</style>
