<template>
  <div id="app">
    <Topbar/>
    <div id="view">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Topbar from './components/topbar'

export default {
  name: 'App',
  components: {
    Topbar
  }
}
</script>

<style>
* {
  font-family: 'Open Sans', sans-serif;
}

html, body {
  margin: 0;
  height: 100%;
}

#app {
  height: 100%;
}

#topbar {
  position: fixed;
  top: 0;
  width: 100%;
  background: #34495e;
  color: #eee;
  z-index: 100000000;
}

#sidebar {
  flex: 1;
  max-width: 15em;
  padding-top: 64px;
  padding-left: 1em;
  background: #ededed;
  text-shadow: 1px 1px 0px #fff;
}

#view {
  padding: 64px 1em;
  width: 90%;
  margin: auto;
  flex: 1;
  overflow-y: scroll;
}

a {
  text-decoration: none;
}

a:hover {
  text-decoraiton: underline;
}

h1, h2, h3, h4, h5, h6 {
  margin-top: 0;
}

.btn {
  background: #eee;
  border: none;
  padding: 1em;
  border-radius: 0.5em;
  font-weight: bold;
  color: #000;
}

.btn-small {
  padding: 0.5em;
}

.pull-right {
  float: right;
}

.emoji {
  height: 1em;
}
</style>
