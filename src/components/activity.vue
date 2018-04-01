<template>
  <article>
    <div class="avatar" v-if="activity.reblog === null">
      <a :href="activity.account.url"><img :src="activity.account.avatar"></a>
    </div>
    <div class="avatar" v-else-if="activity.reblog !== null">
      <div class="avatar-overlay">
        <div class="avatar-overlay-base">
          <a :href="activity.reblog.account.url"><img :src="activity.reblog.account.avatar"></a>
        </div>
        <div class="avatar-overlay-overlay">
          <a :href="activity.account.url"><img :src="activity.account.avatar"></a>
        </div>
      </div>
    </div>

    <ActivityContainer v-bind:activity="activity.reblog || activity" v-bind:reblog="activity.reblog !== null" />
  </article>
</template>

<script>
import ActivityContainer from './activity-container'

export default {
  name: 'Activity',
  components: { ActivityContainer },
  props: ['activity']
}
</script>

<style scoped>
article {
  margin-bottom: 1em;
  display: flex;
  flex-direction: row;
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
</style>
