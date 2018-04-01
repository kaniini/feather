<template>
  <article v-if="activity.reblog === null">
    <div class="avatar">
      <a :href="activity.account.url"><img :src="activity.account.avatar"></a>
    </div>

    <div class="view">
      <div class="person">
        <a :href="activity.account.url"><span class="author">{{ activity.account.display_name }}</span></a>
        <small> &mdash; @{{ activity.account.acct }}</small>
      </div>

      <div class="media-attachments" v-if="activity.media_attachments">
        <MediaAttachment v-for="attachment in activity.media_attachments" v-bind:key="attachment.id" v-bind:attachment="attachment" v-bind:sensitive="activity.sensitive" />
      </div>

      <div class="activity-content" v-html="activity.content"></div>

      <ActionBar v-bind:activity="activity" v-if="isLoggedIn" />

      <div class="children" v-if="children">
        <ChildActivity v-for="child in children" v-bind:key="child.id" v-bind:activity="child" />
      </div>

      <ReplyComposer v-bind:activity="activity" v-if="replying" />
    </div>
  </article>
  <article v-else-if="activity.reblog !== null">
    <div class="avatar">
      <div class="avatar-overlay">
        <div class="avatar-overlay-base">
          <a :href="activity.reblog.account.url"><img :src="activity.reblog.account.avatar"></a>
        </div>
        <div class="avatar-overlay-overlay">
          <a :href="activity.account.url"><img :src="activity.account.avatar"></a>
        </div>
      </div>
    </div>

    <div class="view">
      <small><i class="icon-retweet"></i>{{ activity.account.display_name }} {{$t('activity.boosted')}}</small>

      <div class="person">
        <a :href="activity.account.url"><span class="author">{{ activity.reblog.account.display_name }}</span></a>
        <small> &mdash; @{{ activity.reblog.account.acct }}</small>
      </div>

      <div class="media-attachments" v-if="activity.reblog.media_attachments">
        <MediaAttachment v-for="attachment in activity.reblog.media_attachments" v-bind:key="attachment.id" v-bind:attachment="attachment" v-bind:sensitive="activity.sensitive" />
      </div>

      <div class="activity-content" v-html="activity.reblog.content"></div>

      <ActionBar v-bind:activity="activity.reblog" v-if="isLoggedIn" />

      <div class="children" v-if="children">
        <ChildActivity v-for="child in children" v-bind:key="child.id" v-bind:activity="child" />
      </div>

      <ReplyComposer v-bind:activity="activity.reblog" v-if="replying" />
    </div>
  </article>
</template>

<script>
import MediaAttachment from './media-attachment'
import ChildActivity from './activity-child'
import APIService from '../services/api'
import ReplyComposer from './reply-composer'
import ActionBar from './action-bar'

export default {
  name: 'Activity',
  components: { MediaAttachment, ChildActivity, ReplyComposer, ActionBar },
  props: ['activity'],
  data () {
    return {
      children: [],
      isLoggedIn: APIService.isLoggedIn(),
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
      let ourId = this.activity.reblog ? this.activity.reblog.id : this.activity.id
      if (activity.id !== ourId) {
        return
      }
      this.replying = true
    })
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
