<template>
  <aside class="child-activity">
    <div class="avatar">
      <a :href="activity.account.url"><img :src="activity.account.avatar"></a>
    </div>

    <div class="view">
      <a :href="activity.account.url">{{ activity.account.display_name }}</a><small> &mdash; @{{ activity.account.acct }}</small>

      <div class="media-attachments" v-if="activity.media_attachments">
        <MediaAttachment v-for="attachment in activity.media_attachments" v-bind:key="attachment.id" v-bind:attachment="attachment" />
      </div>

      <div class="activity-content" v-html="activity.content"></div>
    </div>
  </aside>
</template>

<script>
import MediaAttachment from './media-attachment'

export default {
  props: ['activity'],
  components: { MediaAttachment }
}
</script>

<style scoped>
aside {
  display: flex;
  flex-direction: row;
  margin-bottom: 0.5em;
  width: 100%;
}

small {
  color: #999;
}
</style>
