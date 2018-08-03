<template lang="pug">

  v-container
    
    v-layout(v-bind="binding", wrap, justify-center)

      v-flex(xs12)
        h1.display-3.text-xs-center.grey--text.text--darken-2.mb-5
          | {{ title }}
      
      v-flex.register.mb-5(xs12, md6)
        h5.subheading.text-xs-center.orange--text.text--darken-1
          | Register
        v-layout(row, justify-center)
          v-flex: v-layout(column, align-center)
            v-btn.fab-btn-xl(fab, flat, icon
              to="/person")
              v-icon.icon-has-plus(size="90")
                | person
            span.text-xs-center.grey--text.text--darken-1
              | Person
          v-flex: v-layout(column, align-center)
            v-btn.fab-btn-xl(fab, flat, icon,
              to="/household")
              v-icon.icon-has-plus(size="90")
                | home
            span.text-xs-center.grey--text.text--darken-1
              | Household
      
      v-flex.find.mb-5(xs12, md6)
        h5.subheading.text-xs-center.orange--text.text--darken-1
          | Find
        v-layout(row, justify-center)
          v-flex: v-layout(column, align-center)
            v-btn.fab-btn-xl(fab, flat, icon,
              to="/search")
              v-icon(size="90")
                | search
            span.text-xs-center.grey--text.text--darken-1
              | Search
          v-flex: v-layout(column, align-center)
            v-btn.fab-btn-xl(fab, flat, icon,
              to="/scan")
              v-icon(size="90")
                | fas fa-qrcode
            span.text-xs-center.grey--text.text--darken-1
              | Scan

</template>


<script>
export default {

  data () {
    return {
      title: 'IDPASS'
    }
  },

  computed: {
    binding () {
      return {
        row: this.$vuetify.breakpoint.mdAndUp,
        column: this.$vuetify.breakpoint.smAndDown
      }
    }
  }
}
</script>


<style>
  .register h5,
  .find h5 {
    text-transform: uppercase;
    font-weight: bold;
  }

  .fab-btn-xl {
    width: 120px;
    height: 120px;
  }

  .icon-has-plus:after {
    content: "add";
    font-family: "Material Icons";
    font-weight: bold;
    font-size: 0.5em;
    position: relative;
    top: 0;
    right: 0.1em;
  }
</style>
