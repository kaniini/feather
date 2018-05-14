<template>
  <div id="topbar">
    <div id="topbar-inside">
      <div id="site-name">{{ siteName }}</div>
      <SearchBox v-if="isLoggedIn" />

      <aside id="topbar-aside">
        <router-link to="/home" v-if="isLoggedIn"><i class="icon-home"></i></router-link>
        <router-link to="/public/local"><i class="icon-users"></i></router-link>
        <router-link to="/public"><i class="icon-globe"></i></router-link>
      </aside>

      <aside id="login-or-identity-widget">
        <LoginForm v-if="!isLoggedIn" />
        <IdentityWidget v-else-if="apActor != null" v-bind:actor="apActor" />
      </aside>
    </div>
  </div>
</template>

<style scoped>
#topbar-inside {
  width: 90%;
  margin: 0.5em auto 0.5em auto;
  display: flex;
  flex-direction: row;
}

#site-name {
  flex: 1;
  margin: 0.5em;
  max-width: 15em;
}

#topbar-aside {
  flex: 1;
  text-align: right;
  margin: 0.5em;
}

#topbar-aside a {
  color: #eee;
}

#login-or-identity-widget {
  flex: 1;
  text-align: right;
  margin: 0.5em;  
  max-width: 10em;
}
</style>

<script>
import SearchBox from './search-box'
import IdentityWidget from './identity-widget'
import LoginForm from './login-form'

export default {
  name: 'Topbar',
  components: {
    SearchBox, IdentityWidget, LoginForm
  },
  data: () => ({
    siteName: 'Feather',
    isLoggedIn: false,
    apActor: null
  }),
  methods: {
    handleLoggedIn () {
      this.isLoggedIn = true
    },
    learnedSiteInfo (info) {
      this.siteName = info.site.name
    },
    handleAPActor (actor) { 
      this.apActor = actor
    }
  },
  mounted () {
    this.$bus.$on('api.login', this.handleLoggedIn)
    this.$bus.$on('api.learned-site-info', this.learnedSiteInfo)
    this.$bus.$on('api.learned-ap-actor', this.handleAPActor)
  }
}
</script>
