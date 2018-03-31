<template>
  <span v-if="activity.reblog === null">
    <MediaAttachment v-bind:attachment="attachment" />
  </span>
  <span v-else-if="activity.reblog !== null">
    <MediaAttachment v-bind:attachment="attachment" />
  </span>
</template>

<script>
import MediaAttachment from './media-attachment'
import ChildActivity from './activity-child'
import APIService from '../services/api'
import ReplyComposer from './reply-composer'
import ActionBar from './action-bar'

export default {
  name: 'MediaActivity',
  components: { MediaAttachment, ChildActivity, ReplyComposer, ActionBar },
  props: ['activity', 'attachment'],
  data () {
    return {
      children: [],
      isLoggedIn: APIService.isLoggedIn(),
      replying: false
    }
  }
}
</script>

<style scoped>
article {
  margin-bottom: 1em;
  display: flex;
  flex-direction: row;
}

small {
  color: #999;
}

.children {
  margin-top: 1em;
}
</style>

<style>
.avatar {
  flex: 1;
  min-width: 64px;
  max-width: 64px;
}

.avatar img {
  width: 48px;
  border-radius: 0.3em;
}

.avatar-overlay {
  width: 48px;
  height: 48px;
  position: relative;
}

.avatar-overlay-base img {
  width: 36px;
  height: 36px;
}

.avatar-overlay-overlay {
  z-index: 1;
  position: absolute;
  bottom: 0;
  right: 0;
}

.avatar-overlay-overlay img {
  width: 24px;
  height: 24px;
}

.activity-content {
  clear: both;
}

.activity-content p {
  margin: 0 0 1em 0;
}
</style>
