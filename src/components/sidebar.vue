<template>
  <nav id="sidebar">
    <LoginForm v-if="!isLoggedIn" />
    <IdentityWidget v-else-if="apActor != null" v-bind:actor="apActor" />

    <SearchBox v-if="isLoggedIn" />

    <div class="module">
      <router-link to="/home" v-if="isLoggedIn">{{$t("timeline.home")}}</router-link>
      <router-link to="/public">{{$t("timeline.public")}}</router-link>
    </div>
  </nav>
</template>

<script>
import LoginForm from './login-form'
import IdentityWidget from './identity-widget'
import SearchBox from './search-box'

const Sidebar = {
  name: 'Sidebar',
  data () {
    return {isLoggedIn: false, apActor: null}
  },
  components: {
    LoginForm, IdentityWidget, SearchBox
  },
  methods: {
    handleLoggedIn () { this.isLoggedIn = true },
    handleAPActor (actor) { this.apActor = actor }
  },
  mounted () {
    this.$bus.$on('api.login', this.handleLoggedIn)
    this.$bus.$on('api.learned-ap-actor', this.handleAPActor)
  }
}

export default Sidebar
</script>

<style scoped>
.module {
  margin-top: 1em;
  font-size: 75%;
  clear: both;
}

.module a {
  color: #000;
  display: block;
}

.module a:hover {
  border-right: 2px #000 solid;
}
</style>
