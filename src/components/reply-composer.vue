<template>
  <aside>
    <div class="avatar">
      <a :href="apActor.url"><img :src="apActor.icon.url"></a>
    </div>
    <div class="composer">
      <NoteComposer v-bind:reply_to_id="Number.parseInt(this.activity.id)" v-bind:initial-content-advisory="activity.spoiler_text" />
    </div>
  </aside>
</template>

<style scoped>
aside {
  max-width: 75em;
  display: flex;
  flex-direction: row;
}

div {
  flex: 1;
}

.composer {
  margin-bottom: 2em;
}
</style>

<script>
import APIService from '../services/api'
import NoteComposer from './note-composer'

export default {
  props: ['activity'],
  name: 'ReplyComposer',
  components: { NoteComposer },
  data () {
    return {
      apActor: APIService.getAPActor()
    }
  },
}
</script>
