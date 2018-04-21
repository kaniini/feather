<template>
  <div id="topbar">
    <div id="topbar-inside">
      <div id="site-name">{{ site_name }}</div>
    </div>
  </div>
</template>

<style scoped>
#topbar-inside {
  margin: 1em;
  display: flex;
  flex-direction: row;
}

#site-name {
  flex: 1;
}
</style>

<script>
export default {
  name: 'Topbar',
  data: () => ({
    site_name: 'Feather'
  }),
  methods: {
    learnedSiteInfo (info) {
      this.site_name = info.site.name
    }
  },
  mounted () {
    this.$bus.$on('api.learned-site-info', this.learnedSiteInfo)
  }
}
</script>
