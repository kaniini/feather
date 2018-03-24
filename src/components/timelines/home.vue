<template>
  <div>
    <h2>{{$t('timeline.home')}}</h2>
    <Timeline tid="home" />
  </div>
</template>

<script>
import Timeline from './timeline'

export default {
  name: 'Home',
  components: {
    Timeline
  }
}
</script>
