<template>
  <div class="attachment">
    <img v-if="attachment.type == 'image'" :src="attachment.preview_url" :alt="attachment.alt">
  </div>
</template>

<script>
export default {
  props: ['attachment']
}
</script>

<style scoped>
.attachment {
  display: inline-block;
  width: 50%;
}

.media-attachments {
  display: inline-block;
  max-width: 50%;
}

img {
  min-height: 300px;
  width: 98%;
}
</style>
