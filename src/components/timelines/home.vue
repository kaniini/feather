<template>
  <div>
    <div id="composer-container">
      <Composer v-if="isLoggedIn" id="composer" />
    </div>

    <Timeline tid="home" type="timeline" />
  </div>
</template>

<script>
import Timeline from './timeline'
import Composer from './composer'
import APIService from '../../services/api'

export default {
  name: 'Home',
  data () {
    return {isLoggedIn: APIService.isLoggedIn()}
  },
  components: {
    Timeline, Composer
  },
  methods: {
    handleLoggedIn () { this.isLoggedIn = true }
  },
  mounted () {
    this.$bus.$on('api.login', this.handleLoggedIn)
  }
}
</script>

<style scoped>
#composer-container {
  max-width: 90%;
  margin: auto;
}

#composer {
  max-width: 65%;
  margin: auto;
}
</style>
