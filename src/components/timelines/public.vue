<template>
  <div>
    <h2>{{$t('timeline.public')}}</h2>
    <Timeline tid="public" />
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
