<template>
  <section class="loading">
    <template v-if="error">
      <v-container>
        <v-alert 
          :value="true"
          outline 
          color="error" 
          icon="warning" 
        >
          There was a problem
          <div class="caption grey--text">
            <template v-if="error.data">
              {{ error.data.code }}
              {{ error.data.msg }}
            </template>
            <template v-else>
              {{ error.message }}
            </template>
          </div>
        </v-alert>
      </v-container>
    </template>
    <transition appear>
      <div v-if="!error" class="loading-spinner">
        <div class="double-bounce1"/>
        <div class="double-bounce2"/>
      </div>
    </transition>
  </section>
</template>

<script>
export default {
  props: {
    error: { type: null, required: true },
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