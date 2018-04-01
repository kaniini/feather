<template>
  <div class="view">
    <span class="boosted" v-if="reblog">
      <small><i class="icon-retweet"></i>{{ activity.account.display_name }} {{$t('activity.boosted')}}</small>
    </span>

    <div class="person">
      <a :href="activity.account.url"><span class="author">{{ activity.account.display_name }}</span></a>
      <small> &mdash; @{{ activity.account.acct }}</small>
    </div>

    <div class="media-attachments" v-if="activity.media_attachments">
      <MediaAttachment v-for="attachment in activity.media_attachments" v-bind:key="attachment.id" v-bind:attachment="attachment" v-bind:sensitive="activity.sensitive" />
    </div>

    <div class="activity-content">
      <div class="content-advisory" v-if="activity.sensitive && activity.spoiler_text">
        {{ activity.spoiler_text }}
        <button v-on:click="showContent ^= true" class="btn btn-small">{{ !showContent ? $t("activity.expand") : $t("activity.close") }}</button>
      </div>
      <div v-html="activity.content" v-if="showContent"></div>
    </div>

    <ActionBar v-bind:activity="activity" v-if="isLoggedIn" />

    <div class="children" v-if="children">
      <ChildActivity v-for="child in children" v-bind:key="child.id" v-bind:activity="child" />
    </div>

    <ReplyComposer v-bind:activity="activity" v-if="replying" />
  </div>
</template>

<script>
import MediaAttachment from './media-attachment'
import ChildActivity from './activity-child'
import APIService from '../services/api'
import ReplyComposer from './reply-composer'
import ActionBar from './action-bar'

export default {
  name: 'ActivityContainer',
  components: { MediaAttachment, ChildActivity, ReplyComposer, ActionBar },
  props: ['activity', 'reblog'],
  data () {
    return {
      children: [],
      isLoggedIn: APIService.isLoggedIn(),
      replying: false,
      showContent: !this.activity.sensitive || (this.activity.sensitive && !this.activity.spoiler_text)
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
    console.log('activity sensitive:', this.activity.sensitive)
    console.log('activity content advisory text:', this.activity.spoiler_text)
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
.boosted {
  color: #999;
}

.children {
  margin-top: 1em;
}

.content-advisory {
  margin-bottom: 1.5em;
}
</style>

<style>
.activity-content {
  clear: both;
}

.activity-content p {
  margin: 0 0 1em 0;
}
</style>
