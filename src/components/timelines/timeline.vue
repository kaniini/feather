<template>
  <div class="timeline">
    <Activity v-for="activity in timeline" v-bind:key="activity.id" v-bind:activity="activity" v-bind:show-children="true" />
  </div>
</template>

<script>
import Activity from '../activity'
import TimelineFetcher from './timeline-fetcher'

export default {
  props: ['tid', 'type'],
  name: 'Timeline',
  components: {
    Activity
  },
  methods: {
    fetchCallback (activities) {
      this.timeline = activities
    },
    refetchCallback () {
      this._fetcher.fetch(false)
    }
  },
  data () {
    return {timeline: []}
  },
  mounted () {
    this._fetcher = new TimelineFetcher(this.tid, this.type, this.fetchCallback)
    this._fetcher.fetch(false)

    this.$bus.$on('api.login', this.refetchCallback)
    this.$bus.$on('api.posted-message', this.refetchCallback)
  }
}
</script>

<style scoped>
.timeline {
  clear: both;
  max-width: 90%;
  margin: auto;
}
</style>
