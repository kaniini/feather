<template>
  <div class="actions">
    <div class="visibility">{{ activity.visibility }}</div>
    <div class="action-buttons">
      <button class="btn btn-small" v-on:click="like"><i class="icon-star"></i>{{ like_count }}</button>
      <button class="btn btn-small" v-on:click="announce"><i class="icon-retweet"></i>{{ announce_count }}</button>
      <button class="btn btn-small" v-on:click="reply"><i class="icon-reply"></i></button>
      <router-link :to="{name: 'timeline.collection', params: {collection: activity.id}}" class="btn btn-small" v-if="!activity.in_reply_to_id">{{$t('timeline.view_collection')}}</router-link>
    </div>
  </div>
</template>

<script>
import APIService from '../services/api'

export default {
  props: ['activity'],
  data () {
    return {
      liked: this.activity.favourited,
      like_count: this.activity.favourites_count,
      announced: this.activity.reblogged,
      announce_count: this.activity.reblogs_count
    }
  },
  methods: {
    like () {
      if (this.liked) {
        return
      }

      this.like_count++
      this.liked = true

      APIService.like(this.activity.id)
    },
    announce () {
      if (this.announced) {
        return
      }

      this.announce_count++
      this.announced = true

      APIService.announce(this.activity.id)
    },
    reply () {
      this.$bus.$emit('activity.replying', this.activity)
    }
  }
}
</script>

<style scoped>
div {
  font-size: 75%;
  color: #999;
}

.actions {
  margin-top: 10px;
  font-size: 16px;
}

.action-buttons {
  float: right;
}

.visibility {
  text-transform: capitalize;
  display: inline-block;
}
</style>
