<template>
  <aside>
    <div class="avatar">
      <a :href="apActor.url"><img :src="apActor.icon.url"></a>
    </div>
    <form v-on:submit.prevent="submit(message)">
      <div>
        <textarea :placeholder="$t('timeline.compose.placeholder')" v-model="message"></textarea>
      </div>
      <div>
        &nbsp;<!-- XXX: placeholder -->
        <button type="submit" class="btn btn-small pull-right">{{ $t('timeline.compose.submit') }}</button>
      </div>
    </form>
  </aside>
</template>

<style scoped>
aside {
  max-width: 75em;
  display: flex;
  flex-direction: row;
}

form {
  flex: 1;
  margin-bottom: 2em;
  border-radius: 0.5em;
  border: 1px solid #ddd;
  padding: 0.5em;
}

textarea {
  border: none;
  width: 100%;
  resize: none;
}
</style>

<script>
import APIService from '../services/api'

export default {
  props: ['activity'],
  name: 'ReplyComposer',
  data () {
    return {
      message: '',
      visibility: 'public',
      media_ids: {},
      sensitive: false,
      spoiler_text: '',
      apActor: APIService.getAPActor()
    }
  },
  methods: {
    submit () {
      APIService.postMessage({
        status: this.message,
        visibility: this.visibility,
        media_ids: this.media_ids,
        sensitive: this.sensitive,
        spoiler_text: this.spoiler_text,
        in_reply_to_id: Number.parseInt(this.activity.id)
      })
    },
    postedMessage () {
      this.message = ''
    }
  },
  mounted () {
    /* XXX: something more sane for replies is needed */
    this.$bus.$on('api.posted-message', this.postedMessage)
  }
}
</script>
