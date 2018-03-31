<template>
  <div>
    <h2>
      {{$t('timeline.collection')}}
      <span class="pull-right">
        <button v-on:click="mediaToggle()" class="btn btn-large">{{$t('timeline.media-view')}}</button>
      </span>
    </h2>
    <Timeline :tid="$route.params.collection" type="tag-collection" v-if="!mediaTimeline" />
    <MediaTimeline :tid="$route.params.collection" type="tag-collection" v-else-if="mediaTimeline" />
  </div>
</template>

<script>
import Timeline from './timeline'
import MediaTimeline from './media-timeline'

export default {
  name: 'TagCollection',
  components: {
    Timeline,
    MediaTimeline
  },
  data () {
    return {
      mediaTimeline: false
    }
  },
  methods: {
    mediaToggle () {
      this.mediaTimeline ^= true
    }
  }
}
</script>
