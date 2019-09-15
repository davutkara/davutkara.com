<template>
  <div>
    <header-cmp />
    <section class="section main-icerik">
      <div class="container is-narrowed">
        <div v-for="(project,link) in context.data" :key="link" class="box">
          <div class="columns">
            <div class="column is-one-fifth">
              <figure class="image">
                <img :src="project.thumbnail">
              </figure>
            </div>
            <router-link :to="link" title="Click for details">
              <div class="column">
                <p class="title">
                  {{ project.title }}
                </p>
                <p class="subtitle">
                  {{ project.subTitle }}
                </p>
                <div class="tags has-addons">
                  <span class="tag is-dark">{{ project.date.year }}</span>
                  <span class="tag is-link">{{ project.date.month | monthName }}</span>
                  <span v-for="(tag,i) in project.tags" :key="i" class="tag is-light">{{ tag }}</span>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </section>
    <footer-cmp />
  </div>
</template>


<script>
import matter from 'gray-matter'
import headerCmp from '~/components/header.vue'
import footerCmp from '~/components/footerCmp.vue'
import list from '~/static/api/pages/portfolio/list'

export default {
  layout: 'resume',
  components: { headerCmp, footerCmp },
  filters: {
    monthName: function(month) {
      if (month === 1) return 'January'
      else if (month === 2) return 'February'
      else if (month === 3) return 'March'
      else if (month === 4) return 'April'
      else if (month === 5) return 'May'
      else if (month === 6) return 'June'
      else if (month === 7) return 'July'
      else if (month === 8) return 'August'
      else if (month === 9) return 'September'
      else if (month === 10) return 'October'
      else if (month === 11) return 'November'
      else if (month === 12) return 'December'
    }
  },
  data() {
    return {
      context: matter(list)
    }
  },
  mounted() {
    // eslint-disable-next-line no-console
    console.log(this.context)
  }
}
</script>
