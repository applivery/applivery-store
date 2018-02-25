<template>
  <v-btn 
    :loading="loading"
    :small="small" 
    color="success" 
    @click="start" 
  >
    INSTALL
  </v-btn>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: {
    app: { type: Object, required: true },
    build: { type: Object, required: true },
    small: { type: Boolean, default: false },
  },
  data: () => ({
    loading: false,
  }),
  computed: {
    ...mapState('main', ['so']),
    buildId() {
      if (this.app) {
        return this.app.sdk[this.so].lastBuildId
      }
      if (this.build) {
        return this.build._id
      }
    },
  },
  methods: {
    ...mapActions({
      getBuildLink: 'fetch/GET_BUILD_LINK',
    }),
    async start() {
      this.loading = true
      try {
        const link = await this.getBuildLink(this.buildId)
        window.location.assign(link)
      } catch (err) {
        alert(err.message)
      }
      this.loading = false
    },
  },
}
</script>

<style lang="scss">

</style>
