<template>
  <div>
    <h2>{{$t('timeline.collection')}}</h2>
    <Timeline :tid="$route.params.collection" type="collection" />
  </div>
</template>

<script>
import Timeline from './timeline'

export default {
  name: 'Collection',
  components: {
    Timeline
  }
}
</script>
