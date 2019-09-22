<template>
  <div class="card">
    <div class="card-content">
      <p
        class="title"
      >
        {{ title }}
      </p>
      <p class="subtitle">
        {{ author }}
      </p>
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
export default {
  props: ['title', 'author', 'links', 'slug']
}
</script>
