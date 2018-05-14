<template>
  <div class="login" v-if="!loggedIn">
    <button v-on:click.prevent="toggleLogin" class="btn btn-topbar">{{$t('login.login')}}</button>

    <form v-on:submit.prevent="submit(user)" id="login-form" v-if="shouldLogIn">
      <h4>{{$t('login.login')}}</h4>

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
    loggedIn: false,
    shouldLogIn: false
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
    },
    toggleLogin () {
      this.shouldLogIn ^= true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn-topbar {
  padding: 0.5em;
}

#login-form {
  position: absolute;
  top: 3em;
  background: #fff;
  color: #333;
  width: 9em;
  border: 1px solid #333;
  padding: 0.5em;
}

.form-group {
  margin-bottom: 0.25em;
}
</style>
