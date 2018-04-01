<template>
  <form v-on:submit.prevent="submit(message)">
    <div v-if="contentAdvisory">
      <input type="text" :placeholder="$t('timeline.compose.content_advisory_text')" v-model="contentAdvisoryText">
    </div>
    <div>
      <textarea :placeholder="$t('timeline.compose.placeholder')" v-model="message"></textarea>
    </div>
    <div>
      <button v-on:click.prevent="contentAdvisory ^= true" class="btn btn-small">{{ $t('timeline.compose.content_advisory') }}</button>
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

div {
  margin-bottom: 1em;
}

div:last-child {
  margin-bottom: 0;
}

input[type=text] {
  font-size: 100%;
  border: 0;
  border-bottom: 1px solid #ddd;
  width: 100%;
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
      mediaIDs: {},
      contentAdvisory: false,
      contentAdvisoryText: ''
    }
  },
  methods: {
    submit () {
      APIService.postMessage({
        status: this.message,
        visibility: this.visibility,
        media_ids: this.mediaIDs,
        sensitive: Boolean(this.contentAdvisory),
        spoiler_text: this.contentAdvisoryText,
        in_reply_to_id: null
      })
    },
    postedMessage () {
      this.contentAdvisoryText = this.message = ''
      this.contentAdvisory = false
      this.mediaIDs = {}
    }
  },
  mounted () {
    this.$bus.$on('api.posted-message', this.postedMessage)
  }
}
</script>
