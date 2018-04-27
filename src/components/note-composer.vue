<template>
  <form v-on:submit.prevent="submit(message)">
    <div v-if="contentAdvisory">
      <input type="text" :placeholder="$t('timeline.compose.content_advisory_text')" v-model="contentAdvisoryText">
    </div>
    <div>
      <textarea :placeholder="$t('timeline.compose.placeholder')" v-model="message" @paste="processPaste"></textarea>
    </div>
    <div v-if="mediaObjects">
      <img :src="o.preview_url" v-for="o in mediaObjects" v-bind:key="o.id" class="media-preview">
    </div>
    <div>
      <button v-on:click.prevent="contentAdvisory ^= true" class="btn btn-small">{{ $t('timeline.compose.content_advisory') }}</button>
      <input :id="fileElemId" type="file" style="display: none" v-on:change="processFile($event)">
      <label :for="fileElemId" class="btn btn-small" style="padding: 0.1em;">
        <i v-bind:class="uploading || 'icon-upload'"></i>
      </label>
      <button type="submit" class="btn btn-small pull-right">{{ $t('timeline.compose.submit') }}</button>
    </div>
  </form>
</template>

<style scoped>
form {
  max-width: 100%;
  min-width: 30em;
  margin-bottom: 2em;
  border-radius: 0.5em;
  border: 1px solid #ddd;
  padding: 0.5em;
}

.media-preview {
  height: 64px;
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
import APIService from '../services/api'

export default {
  props: ['reply_to_id', 'initialContentAdvisory'],
  name: 'NoteComposer',
  data () {
    return {
      message: '',
      visibility: 'public',
      mediaObjects: [],
      mediaIDs: [],
      fileElemId: this.reply_to_id ? `${this.reply_to_id}-upload` : `default-upload`,
      contentAdvisory: Boolean(this.initialContentAdvisory),
      contentAdvisoryText: this.initialContentAdvisory || '',
      uploading: false
    }
  },
  methods: {
    submit () {
      if (!this.contentAdvisory) {
        this.contentAdvisoryText = ''
        this.contentAdvisory = false
      }

      APIService.postMessage({
        status: this.message,
        visibility: this.visibility,
        media_ids: this.mediaIDs,
        sensitive: Boolean(this.contentAdvisory),
        spoiler_text: this.contentAdvisoryText,
        in_reply_to_id: this.reply_to_id
      })
    },
    postedMessage () {
      this.contentAdvisoryText = this.message = ''
      this.contentAdvisory = false
      this.mediaIDs = []
      this.mediaObjects = []
    },
    processFile (event) {
      let file = event.target.files[0]
      APIService.uploadMedia(file)
        .then((resp) => {
          event.target.files = null
          this.mediaIDs.push(resp.id)
          this.mediaObjects.push(resp)
        })
    },
    processPaste (event) {
      for (let i = 0; i < event.clipboardData.items.length; i++) {
        let item = event.clipboardData.items[i]
        if (item.kind === 'file' && item.type.startsWith('image/')) {
          event.preventDefault()

          let file = item.getAsFile()
          APIService.uploadMedia(file)
            .then((resp) => {
              event.target.files = null
              this.mediaIDs.push(resp.id)
              this.mediaObjects.push(resp)
            })
        }
      }
    }
  },
  mounted () {
    this.$bus.$on('api.posted-message', this.postedMessage)
  }
}
</script>
