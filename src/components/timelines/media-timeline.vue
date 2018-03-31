<template>
  <div class="timeline">
    <MediaActivity v-for="activity in timeline" v-bind:key="activity[1].id" v-bind:activity="activity[0]" v-bind:attachment="activity[1]" />
  </div>
</template>

<script>
import MediaActivity from '../activity-media'
import TimelineFetcher from './timeline-fetcher'

export default {
  props: ['tid', 'type'],
  name: 'MediaTimeline',
  components: {
    MediaActivity
  },
  methods: {
    fetchCallback (activities) {
      let timeline = activities.filter((activity) => activity.media_attachments)
      this.timeline = timeline.reduce((lst, activity) => lst.concat(activity.media_attachments.map((attachment) => [activity, attachment])), [])
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
}
</style>
