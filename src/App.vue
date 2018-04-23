<template>
  <div id="app">
    <Topbar/>
    <Sidebar/>
    <div id="view">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Sidebar from './components/sidebar'
import Topbar from './components/topbar'

export default {
  name: 'App',
  components: {
    Sidebar,
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
  display: flex;
  flex-direction: row;
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
  border-right: 1px #999 solid;
  padding-top: 64px;
  padding-left: 1em;
}

#view {
  padding: 64px 1em;
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
