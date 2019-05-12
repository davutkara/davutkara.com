<template>
  <div>
    <header-cmp/>
    <section class="section main-icerik">
      <div class="container is-narrowed">
        <div class="box" v-for="(project,link) in context.data" :key="link">
          <div class="columns">
            <div class="column is-one-fifth">
              <figure class="image is-square">
                <img :src="project.thumbnail">
              </figure>
            </div>
            <router-link :to="link" title="Click for details">
              <div class="column">
                <p class="title">{{project.title}}</p>
                <p class="subtitle">{{project.subTitle}}</p>
                <div class="tags has-addons">
                  <span class="tag is-dark">{{project.date.year}}</span>
                  <span class="tag is-link">{{project.date.month | monthName}}</span>
                  <span class="tag is-light" v-for="(tag,i) in project.tags" :key="i">{{tag}}</span>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </section>
    <footer-cmp/>
  </div>
</template>

<style>
.main-icerik {
  margin-top: -7em;
  padding-bottom: 1em;
}
.main-icerik > .container {
  padding: 2em 2em 10em 2em;
}
</style>


<script>
import headerCmp from '~/components/header.vue'
import footerCmp from '~/components/footerCmp.vue'
import list from '~/static/api/pages/portfolio/list.md'
import matter from 'gray-matter'
export default {
  layout: 'resume',
  components: { headerCmp, footerCmp },
  data() {
    return {
      context: matter(list)
    }
  },
  filters: {
    monthName: function() {
      return 'Nisan'
    }
  }
}
</script>
