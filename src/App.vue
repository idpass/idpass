<template lang="pug">

  v-app(id="inspire")

    v-navigation-drawer(fixed, app,
      :clipped="$vuetify.breakpoint.lgAndUp",
      v-model="drawer")

      navigation-menu

    v-toolbar(fixed, app, dark,
      :clipped-left="$vuetify.breakpoint.lgAndUp",
      color="blue darken-3")

      v-toolbar-title.ml-0.pl-3(style="width: 300px")
        v-toolbar-side-icon(@click.stop="drawer = !drawer")
        span.hidden-sm-and-down
          | {{ title }}

      <!--v-text-field(flat, solo-inverted, prepend-icon="search",-->
        <!--label="Search")-->

      v-spacer.hidden-sm-and-down

    v-content
      router-view

    <!--v-btn(fab, bottom, right, dark, fixed,-->
      <!--color="pink",-->
      <!--@click.stop="showContactDialog")-->
      <!--v-icon add-->

    v-dialog(:fullscreen="$vuetify.breakpoint.mdAndDown", v-model="isEditingContact", width="800px")
      v-card
        v-card-title.grey.lighten-4.py-4.title
          | Create Contact
        contact-form
        v-card-actions
          v-spacer
          v-btn(flat, @click="hideContactDialog")
            | Cancel
          v-btn(flat, @click="postContact", color="primary")
            | Save

</template>


<script>
import Vue from 'vue'
import { mapMutations, mapState, mapActions } from 'vuex'

import contactForm from './components/contact-form.vue'
import navigationMenu from './components/navigation-menu.vue'

export default {

  components: {
    contactForm,
    navigationMenu
  },

  data () {
    return {
      title: 'ID Pass',
      cordova: Vue.cordova,
      drawer: null
    }
  },

  created () {
    var self = this
    this.cordova.on('deviceready', () => {
      self.onDeviceReady()
    })
  },

  computed: {

    ...mapState('contacts', [
      'isEditingContact'
    ])
  },

  methods: {

    ...mapMutations('contacts', [
      'showContactDialog',
      'hideContactDialog'
    ]),

    ...mapActions('contacts', [
      'postContact'
    ]),

    onDeviceReady: function () {
      // Handle the device ready event.
      this.cordova.on('pause', this.onPause, false)
      this.cordova.on('resume', this.onResume, false)
      if (this.cordova.device.platform === 'Android') {
        document.addEventListener('backbutton', this.onBackKeyDown, false)
      }
    },

    onPause () {
      // Handle the pause lifecycle event.
      console.log('pause')
    },

    onResume () {
      // Handle the resume lifecycle event.
      // SetTimeout required for iOS.
      setTimeout(function () {
        console.log('resume')
      }, 0)
    },

    onBackKeyDown () {
      // Handle the back-button event on Android. By default it will exit the app.
      navigator.app.exitApp()
    }
  }
}
</script>


<style>
body {
  padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-top);
}
.footer{ /* Apply this to v-bottom-nav if necessary. */
  margin-bottom: constant(safe-area-inset-bottom);
  margin-bottom: env(safe-area-inset-bottom);
}
</style>
