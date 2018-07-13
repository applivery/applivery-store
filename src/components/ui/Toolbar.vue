<template>
  <v-toolbar 
    :style="{backgroundColor:custom.color}"
    :color="custom.color ? '' : 'primary'"
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
      <div 
        v-if="custom.logo"
        :style="{backgroundImage:`url(${custom.logo})`}"
        class="toolbar-logo"
      />
      <template v-else>
        <v-toolbar-title >
          <router-link :to="{name:'list'}">
            <!-- {{ $t('Toolbar.genericTitle') }} -->
          </router-link>
        </v-toolbar-title>
        <v-spacer/>
      </template>
      <v-toolbar-side-icon @click="openSidebar"/>
    </template>
    <template v-else>
      <v-toolbar-title>
        <template v-if="custom.logo">
          <img :src="custom.logo" class="logo">
        </template>
        <template v-else>
          Applivery
        </template>
      </v-toolbar-title>      
    </template>
  </v-toolbar>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('auth', ['isLogged']),
    ...mapGetters('enterprise', ['custom']),
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
.toolbar-logo {
  flex: 1;
  height: 36px;
  background-position: left center;
  background-repeat: no-repeat;
  background-size: contain;
  margin-left: 16px;
}
</style>
