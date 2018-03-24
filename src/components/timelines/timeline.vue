<template>
  <div class="timeline">
    <Activity v-for="activity in timeline" v-bind:key="activity.id" v-bind:activity="activity" />
  </div>
</template>

<script>
import Activity from '../activity'
import TimelineFetcher from './timeline-fetcher'

export default {
  props: ['tid'],
  name: 'Timeline',
  components: {
    Activity
  },
  methods: {
    fetchCallback (activities) {
      this.timeline = activities
    }
  },
  data () {
    return {timeline: []}
  },
  mounted () {
    this._fetcher = new TimelineFetcher(this.tid, this.fetchCallback)
    this._fetcher.fetch(false)
  }
}
</script>
