<template>
  <div class="login" v-if="!loggedIn">
    <h4>{{$t('login.login')}}</h4>
    <form v-on:submit.prevent="submit(user)" class="login-form">
      <div class="form-group">
        <input v-model="user.username" class="form-control" id="username" :placeholder="$t('login.username')">
      </div>
      <div class="form-group">
        <input v-model="user.password" class="form-control" id="password" :placeholder="$t('login.password')" type="password">
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-default">{{$t('login.login')}}</button>
      </div>
    </form>
  </div>
</template>

<script>
import APIService from '../services/api'

export default {
  name: 'LoginForm',
  data: () => ({
    user: {},
    authError: null,
    loggedIn: false
  }),
  methods: {
    submit () {
      APIService.login(this.user.username, this.user.password).then(() => {
        console.log('login successful')
        this.loggedIn = true
      }).catch((err) => {
        console.log('login error', err)
        this.authError = err
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
