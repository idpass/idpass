<template lang="pug">

  v-layout(column, fill-height)
    v-toolbar.pa-2(flat, color="grey darken-1")
      v-text-field(solo,
        prepend-icon="arrow_back",
        :prepend-icon-cb="back",
        append-icon="more_vert",
        :append-icon-cb="showMenu",
        placeholder="Search")
    v-tabs(dark, centered, grow,
      color="grey darken-1", 
      slider-color="yellow",
      v-model="activeTab")
      v-tab(v-for="tab in tabs", :key="tab.key")
        | {{ tab.label }}
      v-tab-item(v-for="tab in tabs", :key="tab.key")
        v-container(fill-height) 
          h1.text-xs-center 
            | {{ tab.label }}

</template>


<script>
export default {

  data () {
    return {
      activeTab: 0,
      tabs: [
        {key: 'people', label: 'People'},
        {key: 'household', label: 'Household'},
        {key: 'location', label: 'Location'}
      ]
    }
  },

  methods: {
    back () {
      this.$router.go(-1)
    },
    showMenu () {
      // TODO
    }
  }
}
</script>


<style>

</style>
