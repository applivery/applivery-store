<template>
  <v-card 
    :to="{name:'detail',params:{appId:app._id}}"
    ripple
  >
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
export default {
  props: ['app'],
  computed: {
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
