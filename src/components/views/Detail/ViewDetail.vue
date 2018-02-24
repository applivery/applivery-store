<template>
  <transition appear mode="out-in">
    <div v-if="build">
      <v-container v-if="build.notes">
      
        <p><b>What's new</b></p>
        <div
          class="detail-content" 
          v-html="build.notes"
        />
      </v-container>
      <v-container fluid grid-list-lg>
        <v-layout row wrap>
          <v-flex xs6 v-for="(value,name) in stats" :key="name"> 
            <b>{{ name }}</b>
            <div>{{ value }}</div>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
    <Loading v-else :error="error"/>
  </transition>


</template>

<script>
import { mapActions, mapState } from 'vuex'
import Loading from '@/components/ui/Loading'

import moment from 'moment'
import prettyBytes from '@/lib/pretty-bytes'

export default {
  components: { Loading },
  props: ['app'],
  data: () => ({
    build: null,
    error: null,
  }),
  computed: {
    ...mapState('main', ['so']),
    stats() {
      return {
        Developer: this.build.uploadedBy.fullname,
        Updated: moment(this.build.created).format('DD MMMM YYYY'),
        Version: this.build.version,
        Size: prettyBytes(this.build.size),
      }
    },
  },
  async created() {
    try {
      const lastBuildId = this.app.sdk[this.so].lastBuildId
      if (!lastBuildId) throw new Error(`Build not present for ${this.so}`)
      this.build = await this.getBuild(lastBuildId)
    } catch (err) {
      this.error = err
    }
  },
  methods: {
    ...mapActions({
      getBuild: 'fetch/GET_BUILD',
    }),
  },
}
</script>

<style>
.detail-content {
  word-break: break-all;
}
</style>
