<template>
  <div>
    <NoteComposer />
  </div>
</template>

<style scoped>
div {
  max-width: 75em;
}
</style>

<script>
import NoteComposer from '../note-composer'

export default {
  name: 'Composer',
  components: { NoteComposer }
}
</script>
