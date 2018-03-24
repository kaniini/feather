<template>
  <div>
    <h2>{{$t('timeline.public')}}</h2>
    <Timeline tid="public" type="timeline" />
  </div>
</template>

<script>
import Timeline from './timeline'

export default {
  name: 'Public',
  components: {
    Timeline
  }
}
</script>
