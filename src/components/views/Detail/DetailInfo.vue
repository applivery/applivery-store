<template>
  <v-container fluid grid-list-lg>
    <v-layout row>
      <v-flex xs3>
        <v-card-media
          :src="image"
          height="64px"
          contain
        />
      </v-flex>
      <v-flex>
        <div class="subheading">{{ app.name }}</div>
        <div class="grey--text">{{ app.owner.fullname }}</div>
        <Install :app="app" class="install-button"/>
      </v-flex>
    </v-layout>
    <div v-html="app.description"/>
  </v-container>
</template>

<script>
import Install from '@/components/ui/Install'

export default {
  components: { Install },
  props: ['app'],
  computed: {
    image() {
      return `https://dashboard.applivery.com/img/apps/${this.app._id}.png`
    },
  },
}
</script>

<style scoped>
.install-button {
  margin: 12px 0 0 0;
  float: right;
}
</style>
