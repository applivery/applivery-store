<template>
  <v-navigation-drawer
    v-if="member"
    v-model="visible"
    fixed
    right
    app
  >
    <v-list dense>
      <v-container>
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img :src="memberAvatar">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-html="member.fullname"/>
            <v-list-tile-sub-title v-html="member.email"/>
          </v-list-tile-content>
        </v-list-tile>
      </v-container>
      <v-divider/>

      <!-- <v-list-tile href="https://dashboard.applivery.com/" target="_blank">
        <v-list-tile-action>
          <v-icon>dashboard</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Open desktop version</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile> -->
      <v-list-tile @click="changeLanguage">
        <v-list-tile-action>
          <v-icon>language</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title >
            {{ $t('Sidebar.changeLanguage') }} <b>{{ $i18n.locale.toUpperCase() }}</b>
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click="logout">
        <v-list-tile-action>
          <v-icon>exit_to_app</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            {{ $t('Sidebar.logout') }}
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'

export default {
  data: () => ({
    visible: false,
  }),
  computed: {
    ...mapState('main', ['sidebarVisible']),
    ...mapState('auth', ['member']),
    memberAvatar() {
      return `https://s3-eu-west-1.amazonaws.com/static.applivery.com/members/${
        this.member._id
      }.jpg`
    },
  },
  watch: {
    sidebarVisible(status) {
      this.visible = status
    },
    visible(status) {
      if (!status) this.closeSidebar()
    },
  },
  methods: {
    ...mapActions('auth', ['logout']),
    ...mapMutations({
      closeSidebar: 'main/CLOSE_SIDEBAR',
    }),
    changeLanguage() {
      const locales = Object.keys(this.$i18n.messages)
      let idx = locales.indexOf(this.$i18n.locale) + 1
      if (idx > locales.length - 1) idx = 0
      this.$i18n.locale = locales[idx]
      window.localStorage.setItem('locale', locales[idx])
    },
  },
}
</script>