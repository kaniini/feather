<template>
  <div>
    <img :src="actor.icon.url"><span id="actor-username">@{{ actor.preferredUsername }}</span>
  </div>
</template>

<script>
export default {
  props: ['actor'],
  name: 'IdentityWidget'
}
</script>

<style scoped>
div {
  height: 48px;
  margin-top: auto;
  margin-bottom: auto;
}

img {
  width: 48px;
  border-radius: 0.5em;
  float: left;
}

#actor-username {
  margin-top: 10px;
  margin-left: 5px;
  display: inline-block;
}
</style>
