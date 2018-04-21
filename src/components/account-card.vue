<template>
  <div id="account-card-base">
    <div class="avatar">
      <a :href="account.url"><img :src="account.avatar"></a>
    </div>
    <div class="view">
      <a :href="account.url" v-html="$twemoji.parse(account.display_name)"></a><br>
      <small>@{{ account.acct }}</small>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccountCard',
  props: ['account']
}
</script>

<style scoped>
#account-card-base {
  display: flex;
  flex-direction: row;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}

.avatar {
  height: 48px;
}

.view {
  font-size: 75%;
  margin-top: 0.6em;
}
</style>
