<template>
  <v-container grid-list-lg class="section-list">
    <v-text-field 
      v-model="query"
      :label="$t('List.search')"
      prepend-icon="search"
      clearable
    />
    <transition-group 
      v-if="apps" 
      name="list" 
      tag="div" 
      class="layout row wrap">
      <v-flex 
        v-for="app in filteredApps" 
        :key="app._id" 
        xs12>
        <ListApp 
          :app="app"
        /> 
      </v-flex>
    </transition-group>
    <Loading 
      v-else 
      :error="error" 
      placeholders="list"
    />
  </v-container>


</template>

<script>
import { mapActions, mapState } from 'vuex'
import ListApp from './List/ListApp'
import Loading from '@/components/ui/Loading'
import finder from '@/lib/finder'
import find from 'lodash/find'

export default {
  components: { ListApp, Loading },
  data: () => ({
    apps: null,
    error: null,
    query: '',
  }),
  computed: {
    ...mapState('main', ['so']),
    filteredApps() {
      if (this.query) {
        const result = finder.find(this.query)
        return result.map(id => find(this.apps, { _id: id }))
      } else {
        return this.apps
      }
    },
  },
  async created() {
    try {
      const allApps = await this.getApps()
      const soApps = allApps.filter(app => ~app.so.indexOf(this.so))
      finder.load(soApps)
      this.apps = soApps
    } catch (err) {
      this.error = err
    }
  },
  methods: {
    ...mapActions({
      getApps: 'fetch/GET_APPS',
    }),
  },
}
</script>

<style lang="scss">
.section-list {
  .loading .box {
    background-color: #fafafa;
  }
}
</style>