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

      <ActionBar v-bind:activity="activity" v-if="isLoggedIn" />

      <div class="children" v-if="children">
        <ChildActivity v-for="child in children" v-bind:key="child.id" v-bind:activity="child" />
      </div>

      <ReplyComposer v-bind:activity="activity" v-if="replying" />
    </div>
  </aside>
</template>

<script>
import MediaAttachment from './media-attachment'
import ActionBar from './action-bar'
import APIService from '../services/api'
import ReplyComposer from './reply-composer'

export default {
  name: 'ChildActivity',
  props: ['activity'],
  components: { MediaAttachment, ActionBar, ReplyComposer },
  data () {
    return {
      isLoggedIn: APIService.isLoggedIn(),
      children: [],
      replying: false
    }
  },
  methods: {
    receiveChildren (children) {
      let ourId = this.activity.reblog ? this.activity.reblog.id : this.activity.id
      this.children = children.descendants.filter((child) => child.in_reply_to_id === Number.parseInt(ourId))
    },
    handleUpdate (postInfo) {
      let ourId = this.activity.reblog ? this.activity.reblog.id : this.activity.id
      if (postInfo.in_reply_to_id === Number.parseInt(ourId)) {
        APIService.fetchChildren(this.activity.reblog ? this.activity.reblog.id : this.activity.id, this.receiveChildren)
      }
      this.replying = false
    }
  },
  mounted () {
    APIService.fetchChildren(this.activity.reblog ? this.activity.reblog.id : this.activity.id, this.receiveChildren)
    this.$bus.$on('api.posted-message', this.handleUpdate)
    this.$bus.$on('activity.replying', (activity) => {
      if (activity.id !== this.activity.id) {
        return
      }
      this.replying = true
    })
  }
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

.children {
  margin-top: 1em;
}
</style>
