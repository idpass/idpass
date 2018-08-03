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
            v-list-tile-title
              | {{ item.text }}
        v-list-tile(
          v-for="(child, i) in item.children",
          :key="i",
          @click="")
          v-list-tile-action(v-if="child.icon")
            v-icon(:class="{'icon-has-plus': item.iconHasPlus}")
              | {{ child.icon }}
          v-list-tile-content
            v-list-tile-title
              | {{ child.text }}

      v-list-tile(v-else, :key="item.text" :to="item.path === '#' ? '' : item.path" )
        v-list-tile-action
          v-icon(:class="{'icon-has-plus': item.iconHasPlus}")
            | {{ item.icon }}
        v-list-tile-content
          v-list-tile-title
            | {{ item.text }}

</template>


<script>
export default {
  data () {
    return {
      navItems: [
        { icon: 'dashboard',
          text: 'Dashboard',
          path: '/' },

        { heading: 'Register' },

        { icon: 'person',
          iconHasPlus: true,
          text: 'Person',
          path: '/person' },

        { icon: 'home',
          iconHasPlus: true,
          text: 'Household',
          path: '/household' },

        { heading: 'Find' },

        { icon: 'fas fa-search',
          text: 'Search',
          path: '/search' },

        { icon: 'fas fa-qrcode',
          text: 'Scan',
          path: '/scan' },

        { divider: true },

        { icon: 'edit',
          text: 'Forms',
          path: '/forms' },

        { icon: 'settings',
          text: 'Settings',
          path: '/settings' }

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
      ]
    }
  }
}
</script>


<style>

</style>
