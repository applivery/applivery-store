<template>
  <v-toolbar 
    :style="{backgroundColor:enterprise.color}"
    :color="enterprise.color ? '' : 'primary'"
    fixed
    app
    dark
  >
    <template v-if="isLogged">
      <v-btn 
        :to="{name:'list'}"
        :disabled="!canGoBack"
        icon 
        class="back-button"
      >
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title>
        <template v-if="enterprise.logo">
          <img :src="enterprise.logo" class="logo">
        </template>
        <template v-else>
          {{ $t('Toolbar.genericTitle') }}
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
