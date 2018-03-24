<template>
  <form v-on:submit.prevent="submit(message)">
    <div>
      <textarea :placeholder="$t('timeline.compose.placeholder')" v-model="message"></textarea>
    </div>
    <div>
      &nbsp;<!-- XXX: placeholder -->
      <button type="submit" class="btn btn-small pull-right">{{ $t('timeline.compose.submit') }}</button>
    </div>
  </form>
</template>

<style scoped>
form {
  max-width: 75em;
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
import APIService from '../../services/api'

export default {
  name: 'Composer',
  data () {
    return {
      message: '',
      visibility: 'public',
      media_ids: {},
      sensitive: false,
      spoiler_text: ''
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
        in_reply_to_id: null
      })
    },
    postedMessage () {
      this.message = ''
    }
  },
  mounted () {
    this.$bus.$on('api.posted-message', this.postedMessage)
  }
}
</script>
