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
        <MediaAttachment v-for="attachment in activity.media_attachments" v-bind:key="attachment.id" v-bind:attachment="attachment" />
      </div>

      <div class="activity-content" v-html="activity.content"></div>

      <div class="children" v-if="children">
        <ChildActivity v-for="child in children" v-bind:key="child.id" v-bind:activity="child" />
      </div>
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

      <div class="media-attachments" v-if="activity.media_attachments">
        <MediaAttachment v-for="attachment in activity.media_attachments" v-bind:key="attachment.id" v-bind:attachment="attachment" />
      </div>

      <div class="activity-content" v-html="activity.reblog.content"></div>

      <div class="children" v-if="children">
        <ChildActivity v-for="child in children" v-bind:key="child.id" v-bind:activity="child" />
      </div>
    </div>
  </article>
</template>

<script>
import MediaAttachment from './media-attachment'
import ChildActivity from './activity-child'
import APIService from '../services/api'

export default {
  name: 'Activity',
  components: { MediaAttachment, ChildActivity },
  props: ['activity'],
  data () {
    return {
      children: []
    }
  },
  methods: {
    receiveChildren (children) {
      this.children = children.descendants
    }
  },
  mounted () {
    APIService.fetchChildren(this.activity.reblog ? this.activity.reblog.id : this.activity.id, this.receiveChildren)
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
