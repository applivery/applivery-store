<template>
  <v-layout>
    <v-flex 
      xs12 
      sm6 
      offset-sm3>
      <v-card>
        <form class="login-form" @submit.prevent="submit">
          <v-card-text>

            <v-text-field
              ref="email"
              v-model.trim="email"
              :disabled="loading"
              :label="$t('Login.email')"
              autofocus
              prepend-icon="email"
              type="email"
            />
            <v-text-field
              v-model.trim="password"
              :disabled="loading"
              :label="$t('Login.password')"
              type="password"
              prepend-icon="lock"
            />
          </v-card-text>
        
          <v-card-actions>
            <v-btn 
              :loading="loading"
              block
              color="primary"
              type="submit"
            >
              {{ $t('Login.submit') }}
            </v-btn>

          </v-card-actions>
          <p v-if="error" class="red--text caption text-xs-center">
            {{ $t(error && error.message) }}
          </p>
        </form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data: () => ({
    email: '',
    password: '',
    error: null,
    loading: false,
  }),
  computed: {
    fullfilled() {
      return !!this.email.length && !!this.password.length
    },
  },
  created() {
    // Fix pasword autofill with email autofocus
    const unwatch = this.$watch('password', val => {
      this.$refs.email && this.$refs.email.focus()
      unwatch()
    })
    setTimeout(unwatch, 1500)
  },
  methods: {
    ...mapActions('auth', ['login']),
    async submit() {
      if (!this.fullfilled) return

      this.loading = true
      this.error = null
      try {
        await this.login({
          email: this.email,
          password: this.password,
        })
      } catch (err) {
        this.error = err
      }
      this.loading = false
    },
  },
}
</script>

<style lang="scss">
.login-form {
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px white inset;
  }
}
</style>
