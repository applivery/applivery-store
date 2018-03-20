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
        <div class="subheading">
          <v-icon
            :color="pinColor"
            class="bookmark-button"
            @click="togglePin(app._id)"
          >bookmark</v-icon>
          {{ app.name }}
        </div>
        <div class="grey--text">{{ app.owner.fullname }}</div>
        <Install :app="app" class="install-button"/>
      </v-flex>
    </v-layout>
    <div v-html="app.description"/>
  </v-container>
</template>

<script>
import Install from '@/components/ui/Install'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: { Install },
  props: {
    app: { type: Object, required: true },
  },
  computed: {
    ...mapGetters('pin', ['isPinned']),
    image() {
      return `https://dashboard.applivery.com/img/apps/${this.app._id}.png`
    },
    pinColor() {
      return this.isPinned(this.app._id) ? 'amber' : 'grey lighten-2'
    },
  },
  methods: {
    ...mapActions('pin', ['togglePin']),
  },
}
</script>

<style scoped>
.install-button {
  margin: 12px 0 0 0;
  float: right;
}
.bookmark-button {
  float: right;
}
</style>
