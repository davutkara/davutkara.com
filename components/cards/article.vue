<template>
  <router-link :to="slug" :title="title">
    <div class="card">
      <div class="card-image">
        <figure v-if="thumbnail" class="image">
          <img :src="thumbnail" alt="Placeholder image" />
        </figure>
      </div>

      <div :class="{'card-content': true, ontoImage: thumbnail!==undefined}">
        <p class="title">{{ title }}</p>
        <div class="content">
          <div v-html="description" />
          <time :datetime="date" class="is-pulled-right">{{ timeAgo(date) }}</time>
        </div>
        <div class="is-clearfix" />
      </div>
    </div>
  </router-link>
</template>

<script>
import timeAgo from '@/mixins/timeAgo'
export default {
  mixins: [timeAgo],
  props: ['title', 'description', 'thumbnail', 'slug', 'date']
}
</script>

<style scoped>
.card-content .title {
  font-size: 1.2rem;
  margin-bottom: 0.4rem;
}
</style>
