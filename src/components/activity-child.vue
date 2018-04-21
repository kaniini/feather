<template>
  <aside class="child-activity">
    <div class="avatar">
      <a :href="activity.account.url"><img :src="activity.account.avatar"></a>
    </div>

    <ActivityContainer v-bind:activity="activity" v-bind:reblog="false" v-bind:show-children="showChildren" />
  </aside>
</template>

<script>
export default {
  name: 'ChildActivity',
  props: ['activity', 'showChildren'],
  components: { ActivityContainer: () => import('./activity-container.vue') }
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
