<template>
  <span>
    <img :src="actor.icon.url"> {{ actor.preferredUsername }}
  </span>
</template>

<script>
export default {
  props: ['actor'],
  name: 'IdentityWidget'
}
</script>

<style scoped>
span {
  padding-left: 1em;
}

img {
  width: 1em;
  border-radius: 1em;
}
</style>
