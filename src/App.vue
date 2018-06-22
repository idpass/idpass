<template lang="pug">

  v-app(id="inspire")
    v-navigation-drawer(fixed, app,
      :clipped="$vuetify.breakpoint.lgAndUp",
      v-model="drawer")
    
      v-list(dense)
        template(v-for="item in items")
          v-layout(row, align-center,
            v-if="item.heading",
            :key="item.heading")
          
            v-flex(xs6)
              v-subheader(v-if="item.heading")
                | {{ item.heading }}

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

          v-list-tile(v-else, :key="item.text", @click="")
            v-list-tile-action
              v-icon {{ item.icon }}
            v-list-tile-content
              v-list-tile-title {{ item.text }}

    v-toolbar(fixed, app, dark,
      :clipped-left="$vuetify.breakpoint.lgAndUp",
      color="blue darken-3")
    
      v-toolbar-title.ml-0.pl-3(style="width: 300px")
        v-toolbar-side-icon(@click.stop="drawer = !drawer")
        span.hidden-sm-and-down 
          | ID Pass
      
      v-text-field(flat, solo-inverted,
        prepend-icon="search",
        label="Search",
        class="hidden-sm-and-down")

      v-spacer
      
      v-btn(icon)
        v-icon apps

      v-btn(icon)
        v-icon notifications

      v-btn(icon, large)
        v-avatar(size="32px", tile)
          img(
            src="https://vuetifyjs.com/static/doc-images/logo.svg",
            alt="Vuetify")

    v-content
      router-view

    v-btn(fab, bottom, right, dark, fixed,
      color="pink",
      @click.stop="dialog = !dialog")
      v-icon add

    v-dialog(fullscreen, v-model="dialog", width="800px")
      v-card
        v-card-title.grey.lighten-4.py-4.title
          | Create Contact
        v-container.pa-4(grid-list-sm)
          v-layout(row, wrap)
            v-flex(xs12, align-center, justify-space-between)
              v-layout(align-center)
                v-avatar.mr-3(size="40px")
                  img(
                    src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png",
                    alt="")
                v-text-field(placeholder="Name")
            v-flex(xs6)
              v-text-field(
                prepend-icon="business",
                placeholder="Company")
            
            v-flex(xs6)
              v-text-field(placeholder="Job title")
            
            v-flex(xs12)
              v-text-field(
                prepend-icon="mail",
                placeholder="Email")

            v-flex(xs12)
              v-text-field(type="tel",
                prepend-icon="phone",
                placeholder="(000) 000 - 0000",
                mask="phone")

            v-flex(xs12)
              v-text-field(
                prepend-icon="notes",
                placeholder="Notes")

        v-card-actions
          v-btn(flat, color="primary") 
            | More
          v-spacer
          v-btn(flat, color="primary", @click="dialog = false") 
            | Cancel
          v-btn(flat, @click="dialog = false") 
            | Save

</template>

<script>
  import Vue from 'vue'
  export default {
    data () {
      return {
        cordova: Vue.cordova,
        clipped: false,
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Vuetify.js',
        dialog: false,
        drawer: null,
        items: [
          { heading: 'Registration' },
          { icon: 'contacts', text: 'Personal Details' },
          { icon: 'fingerprint', text: 'Biometrics' },
          {
            icon: 'keyboard_arrow_up',
            'icon-alt': 'keyboard_arrow_down',
            text: 'Relations',
            model: true,
            children: [
              { icon: 'add', text: 'Create relation' }
            ]
          },
          {
            icon: 'keyboard_arrow_up',
            'icon-alt': 'keyboard_arrow_down',
            text: 'More',
            model: false,
            children: [
              { text: 'Import' },
              { text: 'Export' },
              { text: 'Print' },
              { text: 'Undo changes' },
              { text: 'Other contacts' }
            ]
          },
          { icon: 'settings', text: 'Settings' }
        ]
      }
    },
    created () {
      var self = this
      this.cordova.on('deviceready', () => {
        self.onDeviceReady()
      })
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
