<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        {{ title }}
      </p>
    </header>
    <div class="card-content">
      <div class="content" v-html="description">
        <time :datetime="date" class="is-pulled-right">{{ timeAgo(date) }}</time>
      </div>
      <div class="is-clearfix" />
    </div>
    <footer class="card-footer">
      <p v-for="({name,url},index) in links" :key="index" class="card-footer-item">
        <span>
          <a :href="url" target="_blank">{{ name }}</a>
        </span>
      </p>
    </footer>
  </div>
</template>

<script>
import timeAgo from '@/mixins/timeAgo'
export default {
  mixins: [timeAgo],
  props: ['title', 'description', 'author', 'links', 'slug', 'date']
}
</script>
