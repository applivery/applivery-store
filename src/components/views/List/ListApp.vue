<template>
  <v-card 
    :to="{name:'detail',params:{appId:app._id}}"
    ripple
  >
    <v-icon
      v-if="isPinned(app._id)"
      color="amber"
      class="bookmark-button"
      small
    >bookmark</v-icon>
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
          <div>
            <div class="subheading">{{ app.name }}</div>
            <div class="grey--text">{{ app.owner.fullname }}</div>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    app: { type: Object, required: true },
  },
  computed: {
    ...mapGetters('pin', ['isPinned']),
    image() {
      return `https://dashboard.applivery.com/img/apps/${this.app._id}.png`
    },
  },
  methods: {
    goDetail() {
      this.$router.push({
        name: 'detail',
        params: {
          appId: this.app._id,
        },
      })
    },
  },
}
</script>

<style scoped>
.bookmark-button {
  position: absolute;
  right: 0;
}
</style>