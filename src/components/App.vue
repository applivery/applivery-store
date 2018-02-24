<template>
  <transition>
    <template v-if="ignition.state == 'success'">
      <v-app>
        <Sidebar/>
        <Toolbar/>
        <v-content>
          <transition mode="out-in" name="fade">
            <router-view/>
          </transition>
        </v-content>
        <v-footer>
          <v-flex xs12>
            <div class="caption grey--text text-xs-center">@{{ Date.now()|date('YYYY') }} - Applivery {{ version }}</div>
          </v-flex>
        </v-footer>
      </v-app>
    </template>

    <template v-else>

      <div class="splash">
        <img src="/splash.png">
        <div class="spinner">
          <span v-if="ignition.error" class="ignition-error">
            <!-- {{ ignition.error.code }} -->
            {{ ignition.error.message }}
          </span>
          <template v-else>
            <div class="double-bounce1"/>
            <div class="double-bounce2"/>
          </template>
        </div>
      </div>
    </template>
  </transition>
</template>

<script>
import { mapState } from 'vuex'

import Toolbar from '@/components/ui/Toolbar'
import Sidebar from '@/components/ui/Sidebar'
export default {
  components: {
    Toolbar,
    Sidebar,
  },
  data: () => ({
    version: process.env.VERSION,
  }),
  computed: {
    ...mapState('main', ['ignition']),
  },
}
</script>

<style lang="scss">
.ignition-error {
  font-family: Roboto, sans-serif;
  color: white;
  width: 200px;
  display: block;
  margin-left: -80px;
  text-align: center;
}
</style>