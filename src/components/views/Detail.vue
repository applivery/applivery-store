<template>
  <div>
    <transition appear mode="out-in">
      <v-layout v-if="app">
        <v-flex xs12>
          <v-card>
            <DetailInfo :app="app"/>
            <v-tabs
              v-model="active"
              fixed-tabs
              height="40px"
            >
              <v-tab ripple href="#detail">Details </v-tab>
              <v-tab ripple href="#history">History </v-tab>
            </v-tabs>
            <v-tabs-items v-model="active">
              <v-tab-item id="detail" lazy>
                <ViewDetail :app="app"/>
              </v-tab-item>
              <v-tab-item id="history" lazy>
                <ViewHistory :app="app"/>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-flex>
      </v-layout>
      <Loading v-else :error="error"/>
    </transition>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ViewDetail from './Detail/ViewDetail'
import ViewHistory from './Detail/ViewHistory'
import DetailInfo from './Detail/DetailInfo'
import Loading from '@/components/ui/Loading'

export default {
  components: { ViewDetail, ViewHistory, DetailInfo, Loading },
  data: () => ({
    app: null,
    error: null,
    active: 'detail',
  }),
  computed: {
    appId() {
      return this.$route.params.appId
    },
  },
  watch: {
    $route() {
      this.syncView()
    },
    active(name) {
      this.$router.replace({ name })
    },
  },
  async created() {
    this.syncView()
    try {
      this.app = await this.getApp(this.appId)
    } catch (err) {
      this.error = err
    }
  },
  methods: {
    syncView() {
      this.active = this.$route.name
    },
    ...mapActions({
      getApp: 'fetch/GET_APP',
    }),
  },
}
</script>