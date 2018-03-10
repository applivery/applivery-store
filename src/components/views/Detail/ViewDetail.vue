<template>
  <div v-if="build">
    <v-container v-if="build.notes">
      
      <p><b>{{ $t('Detail.info.new') }}</b></p>
      <div
        class="detail-content" 
        v-html="build.notes"
      />
    </v-container>
    <v-container fluid grid-list-lg>
      <v-layout row wrap>
        <v-flex 
          v-for="(value,name) in stats" 
          :key="name"
          xs6 
        > 
          <b>{{ $t(`Detail.info.${name}`) }}</b>
          <div>{{ value }}</div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
  <v-container v-else>
    <Loading 
      :error="error"
      placeholders="viewDetail" 
    />
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Loading from '@/components/ui/Loading'

import moment from 'moment'
import prettyBytes from '@/lib/pretty-bytes'

export default {
  components: { Loading },
  props: {
    app: { type: Object, required: true },
  },
  data: () => ({
    build: null,
    error: null,
  }),
  computed: {
    ...mapState('main', ['so']),
    stats() {
      return {
        developer: this.build.uploadedBy.fullname,
        updated: moment(this.build.created).format('DD MMMM YYYY'),
        version: this.build.version,
        size: prettyBytes(this.build.size),
      }
    },
  },
  async created() {
    try {
      const lastBuildId = this.app.sdk[this.so].lastBuildId
      if (!lastBuildId) throw new Error('BUILD_NOT_FOR_SO')
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
