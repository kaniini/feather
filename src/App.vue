<template>
  <div id="app">
    <Sidebar/>
    <div id="view">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Sidebar from './components/sidebar'

export default {
  name: 'App',
  components: {
    Sidebar
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

#sidebar {
  flex: 1;
  max-width: 15em;
  border-right: 1px #999 solid;
  padding-top: 1em;
  padding-left: 1em;
}

#view {
  padding: 1em;
  flex: 1;
  overflow-y: scroll;
}

a {
  text-decoration: none;
}

a:hover {
  text-decoraiton: underline;
}
</style>
