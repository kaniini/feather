<template>
  <div id="topbar">
    <div id="topbar-inside">
      <div id="site-name">{{ siteName }}</div>
      <SearchBox v-if="isLoggedIn" />
    </div>
  </div>
</template>

<style scoped>
#topbar-inside {
  margin: 0.5em;
  display: flex;
  flex-direction: row;
}

#site-name {
  flex: 1;
  margin: 0.5em;
  max-width: 15em;
}
</style>

<script>
import SearchBox from './search-box'

export default {
  name: 'Topbar',
  components: {
    SearchBox
  },
  data: () => ({
    siteName: 'Feather',
    isLoggedIn: false
  }),
  methods: {
    handleLoggedIn () {
      this.isLoggedIn = true
    },
    learnedSiteInfo (info) {
      this.siteName = info.site.name
    }
  },
  mounted () {
    this.$bus.$on('api.login', this.handleLoggedIn)
    this.$bus.$on('api.learned-site-info', this.learnedSiteInfo)
  }
}
</script>
