<template>
  <section class="loading">
    <content-placeholder v-if="!error" :rows="rows"/>
    <template v-else>
      <v-container>
        <v-alert 
          :value="true"
          outline 
          color="error" 
          icon="warning" 
        >
          {{ $t('Loading.problem') }}
          <div class="caption grey--text">
            <template v-if="error.data">
              {{ error.data.code }}
              {{ error.data.msg }}
            </template>
            <template v-else>
              {{ $t(error.message) }}
            </template>
          </div>
        </v-alert>
      </v-container>
    </template>
  </section>
</template>

<script>
import ContentPlaceholder from 'vue-content-placeholder'
import * as contentPlaceholders from '@/lib/contentPlaceholders'

export default {
  components: { ContentPlaceholder },
  props: {
    error: { type: null, default: null },
    placeholders: { type: String, default: '' },
  },
  computed: {
    rows() {
      return contentPlaceholders[this.placeholders] ? contentPlaceholders[this.placeholders]() : []
    },
  },
}
</script>

<style lang="scss">
section.loading {
  .loading-spinner {
    width: 60px;
    height: 60px;
    background-color: none;

    position: relative;
    margin: 40px auto;

    .double-bounce1,
    .double-bounce2 {
      background-color: #1d70b7;
    }
  }
}
</style>
