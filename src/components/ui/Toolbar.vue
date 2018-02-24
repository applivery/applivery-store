<template>
  <v-toolbar 
    app
    fixed
    dark
    :style="{backgroundColor:enterprise.color}"
    :color="enterprise.color ? '' : 'primary'"
  >
    <template v-if="isLogged">
      <v-btn 
        icon 
        class="back-button"
        :to="{name:'list'}"
        :disabled="!canGoBack"
      >
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title>
        <template v-if="enterprise.logo">
          <img class="logo" :src="enterprise.logo">
        </template>
        <template v-else>
          My apps
        </template>
      </v-toolbar-title>
      <v-spacer/>
      <v-toolbar-side-icon @click="openSidebar"/>
    </template>
    <template v-else>
      <v-toolbar-title>Applivery</v-toolbar-title>      
    </template>
  </v-toolbar>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('auth', ['enterprise', 'isLogged']),
    canGoBack() {
      return this.$route.name !== 'list'
    },
  },
  methods: {
    ...mapMutations({
      openSidebar: 'main/OPEN_SIDEBAR',
    }),
  },
}
</script>
<style lang="scss">
img.logo {
  height: 36px;
  vertical-align: middle;
}
</style>