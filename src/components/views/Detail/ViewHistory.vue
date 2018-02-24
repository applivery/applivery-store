<template>
  <v-container grid-list-lg>
    <transition appear mode="out-in">
      <v-layout wrap v-if="builds">
        <v-flex xs12 v-for="(build,index) in builds" :key="build._id" >
          <Install class="install-button" :build="build" :small="true"/>
          <div class="title">{{ build.versionName }} <span class="body-1">({{ build.version }})</span></div>
          <p class="caption">{{ build.created|date }}</p>
          <p v-html="build.notes"/>
          <v-divider v-if="index<builds.length-1"/>
        </v-flex>
      </v-layout>

      <Loading v-else :error="error"/>
    </transition>

  </v-container>
</template>


<script>
import { mapActions, mapState } from 'vuex'
import Loading from '@/components/ui/Loading'
import Install from '@/components/ui/Install'

export default {
  components: { Loading, Install },
  props: ['app'],
  data: () => ({
    builds: null,
    error: null,
  }),
  computed: {
    ...mapState('main', ['so']),
  },
  async created() {
    try {
      const allBuilds = await this.getBuilds(this.app._id)
      this.builds = allBuilds.filter(build => build.so == this.so)
    } catch (err) {
      this.error = err
    }
  },
  methods: {
    ...mapActions({
      getBuilds: 'fetch/GET_BUILDS',
    }),
  },
}
</script>

<style scoped>
.install-button {
  float: right;
}
</style>
