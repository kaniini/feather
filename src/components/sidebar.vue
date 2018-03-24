<template>
  <nav id="sidebar">
    <login-form />

    <div class="module">
      <router-link to="/home" v-if="isLoggedIn">{{$t("timeline.home")}}</router-link>
      <router-link to="/public">{{$t("timeline.public")}}</router-link>
    </div>
  </nav>
</template>

<script>
import LoginForm from './login-form'

const Sidebar = {
  name: 'Sidebar',
  data () {
    return {isLoggedIn: false}
  },
  components: {
    LoginForm
  },
  methods: {
    handleLoggedIn () { this.isLoggedIn = true }
  },
  mounted () {
    this.$bus.$on('api.login', this.handleLoggedIn)
  }
}

export default Sidebar
</script>

<style scoped>
.module {
  margin-top: 1em;
  font-size: 75%;
}

.module a {
  color: #000;
  display: block;
}

.module a:hover {
  border-right: 2px #000 solid;
}
</style>
