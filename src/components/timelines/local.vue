<template>
  <div>
    <Timeline tid="public" local="true" type="timeline" />
  </div>
</template>

<script>
import Timeline from './timeline'

export default {
  name: 'Local',
  components: {
    Timeline
  }
}
</script>
