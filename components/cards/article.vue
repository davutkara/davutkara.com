<template>
  <router-link :to="slug" :title="title">
    <div class="card">
      <div class="card-image">
        <figure v-if="thumbnail" class="image is-4by3">
          <img :src="thumbnail" alt="Placeholder image">
        </figure>
      </div>
      <div :class="{'card-content': true, ontoImage: thumbnail!==undefined}">
        <p class="title">
          {{ title }}
        </p>
        <div class="content">
          <div v-html="description" />
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: ['title', 'description', 'thumbnail', 'slug']
}
</script>

<style scoped>
.ontoImage {
  position: absolute;
  bottom: 0;
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0.7) 100%
  );
}
.card-content .title {
  font-size: 1.2rem;
  margin-bottom: 0.4rem;
}
</style>
