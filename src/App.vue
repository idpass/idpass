<template lang="pug">

  v-app(id="idpass")

    v-navigation-drawer(app, fixed, right,
      v-model="drawer")
      navigation-menu

    v-toolbar(app, fixed, flat, color="transparent",
      v-if="$route.name === 'home'")
      v-btn(icon)
        v-icon cloud_download
      v-spacer
      v-btn(icon, 
        @click.stop="drawer = !drawer")
        v-icon menu

    v-content
      router-view

    v-bottom-nav(app, fixed, color="grey darken-1",
      v-if="$route.name !== 'home'",
      style="bottom: 56px")
      
      v-btn(flat, dark, value="register")
        span Register
        v-icon.icon-has-plus person
      
      v-btn(flat, dark, value="scan")
        span Scan
        v-icon fas fa-qrcode
      
      v-btn(flat, dark, value="print")
        span Print QR
        v-icon print
      
      v-btn(flat, dark, value="reload")
        span Reload
        v-icon refresh

</template>


<script>
import Vue from 'vue'

import NavigationMenu from './components/navigation-menu.vue'

export default {

  components: {
    NavigationMenu
  },

  data () {
    return {
      cordova: Vue.cordova,
      drawer: false
    }
  },

  created () {
    var self = this
    this.cordova.on('deviceready', () => {
      self.onDeviceReady()
    })
  },

  computed: {

  },

  methods: {

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
