<template lang="pug">

  v-list(dense)

    template(v-for="item in navItems")

      v-layout(row, align-center, v-if="item.heading", :key="item.heading")
        v-flex(xs6)
          v-subheader(v-if="item.heading")
            | {{ item.heading }}

      v-divider(v-else-if="item.divider")

      v-list-group(
        v-else-if="item.children",
        v-model="item.model",
        :key="item.text",
        :prepend-icon="item.model ? item.icon : item['icon-alt']",
        append-icon="")
        v-list-tile(slot="activator")
          v-list-tile-content
            v-list-tile-title {{ item.text }}
        v-list-tile(
          v-for="(child, i) in item.children",
          :key="i",
          @click="")
          v-list-tile-action(v-if="child.icon")
            v-icon {{ child.icon }}
          v-list-tile-content
            v-list-tile-title {{ child.text }}

      v-list-tile(v-else, :key="item.text" :to="item.path === '#' ? '' : item.path" )
        v-list-tile-action
          v-icon {{ item.icon }}
        v-list-tile-content
          v-list-tile-title {{ item.text }}

</template>


<script>
export default {
  data () {
    return {
      navItems: [
        // { heading: '' },
        { icon: 'contacts', text: 'Register', path: '/persons' },
        { icon: 'fas fa-id-card', text: 'IDs', path: '/' },
        { icon: 'fas fa-qrcode', text: 'Reader' },
        { icon: 'fas fa-form', text: 'Forms', path: '/forms' },
        { divider: true },
        // {
        //   icon: 'keyboard_arrow_up',
        //   'icon-alt': 'keyboard_arrow_down',
        //   text: 'More',
        //   model: false,
        //   children: [
        //     { text: 'Import' },
        //     { text: 'Export' },
        //     { text: 'Print' },
        //     { text: 'Undo changes' },
        //     { text: 'Other contacts' }
        //   ]
        // },
        { icon: 'settings', text: 'Settings' }
      ]
    }
  }
}
</script>


<style>

</style>
