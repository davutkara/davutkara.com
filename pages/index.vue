<template>
  <div @click="$windowSize.resize()">
    <section class="section main-icerik">
      <div
        :class="{container: true,'container-plr': $windowSize ? $windowSize.breakpoints.sm : true, 'is-narrow':$windowSize ? $windowSize.breakpoints.sm : true }"
      >
        <div class="columns is-centered">
          <div class="column is-one-third">
            <div class="box">
              <div class="content">
                <!-- EDUCATION -->
                <h2>{{ educations.title }}</h2>

                <div v-for="(education,eduIndex) in educations.list" :key="eduIndex">
                  <h3>{{ education.university }}</h3>
                  <b>{{ education.department }}</b>
                  <span v-for="({line},i) in education.lines" :key="i">
                    <br>
                    {{ line }}
                  </span>
                  <hr v-show="educations.list.length > 1">
                </div>
                <!-- / EDUCATION -->

                <!-- LINKS -->
                <h2>{{ links.title }}</h2>
                <p>
                  <template v-for="({name,title,url},linkIndex) in links.list">
                    <b :key="`b-${linkIndex}`">{{ title }}</b>
                    <a :key="`a-${linkIndex}`" :href="url" target="_blank">{{ name }}</a>
                    <br :key="`br-${linkIndex}`">
                  </template>
                </p>
                <!-- / LINKS -->

                <!-- COMMUNICATION -->
                <h2>{{ communication.title }}</h2>
                <p>
                  <b>{{ communication.motherLanguageTitle }}</b>
                  <br>
                  {{ communication.motherLanguage }}
                  <br>
                  <b>{{ communication.foreignLanguageTitle }}</b>
                  <br>
                  <span
                    v-for="({language},langIndex) in communication.foreignLanguages"
                    :key="langIndex"
                  >{{ language }}</span>
                </p>
                <!-- / COMMUNICATION -->
              </div>
            </div>

            <!-- SKILLS -->
            <div class="box">
              <div class="content">
                <h2>{{ skills.title }}</h2>
                <div v-for="({skill,points},skillIndex) in skills.list" :key="skillIndex">
                  <b>{{ skill }} :</b>
                  <progress class="progress is-small" :value="points" max="100">
                    {{ points }}%
                  </progress>
                </div>
              </div>
            </div>
            <!-- / SKILLS -->
          </div>

          <div class="column">
            <!-- EXPERIENCE -->
            <div class="box">
              <div class="content">
                <h2>{{ experiences.title }}</h2>
                <div
                  v-for="({startDate, finishDate, title, position, location, lines},expIndex) in experiences.list"
                  :key="expIndex"
                >
                  <h3>{{ title }}</h3>
                  <b>{{ position }}</b>
                  <p>{{ monthAndYear(startDate) }} - {{ monthAndYear(finishDate) }} | {{ location }}</p>
                  <ul>
                    <li v-for="({line},lineIndex) in lines" :key="lineIndex">
                      {{ line }}
                    </li>
                  </ul>
                  <hr>
                </div>
              </div>
            </div>
            <!-- / EXPERIENCE -->

            <!-- AWARDS -->
            <div class="box">
              <div class="content">
                <h2>{{ awards.title }}</h2>
                <p v-for="({year, description, url},listIndex) in awards.list" :key="listIndex">
                  <b>{{ year | year }}</b>
                  | {{ description }}
                  <a
                    v-if="url"
                    :href="url"
                    :title="description"
                    target="_blank"
                  >
                    <span class="icon">
                      <i class="mdi mdi-open-in-new" />
                    </span>
                  </a>
                </p>
              </div>
            </div>
            <!-- / AWARDS -->
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import moment from 'moment'
const yaml = require('js-yaml')

export default {
  layout: 'default',
  name: 'Resume',
  filters: {
    year(date) {
      return moment(date).format('YYYY')
    }
  },
  computed: {
    locale() {
      const locale = this.$i18n.locale
      moment.locale(locale)
      return locale
    },
    educations() {
      return {
        title: this.data['education-title'],
        list: this.data['educatıon-list']
      }
    },
    links() {
      return {
        title: this.data['links-title'],
        list: this.data['link-list']
      }
    },
    communication() {
      return {
        title: this.data['communication-title'],
        motherLanguageTitle: this.data['mother-language-title'],
        motherLanguage: this.data['mother-language'],
        foreignLanguageTitle: this.data['foreign-language-title'],
        foreignLanguages: this.data['foreign-language-list']
      }
    },
    skills() {
      return {
        title: this.data['skills-title'],
        list: this.data['skills-list']
      }
    },
    experiences() {
      return {
        title: this.data['experience-title'],
        list: this.data['experience-list']
      }
    },
    awards() {
      return {
        title: this.data['awards-title'],
        list: this.data['awards-list']
      }
    }
  },
  watch: {
    locale(locale) {
      //
    }
  },
  async asyncData({ app, $axios }) {
    const data = await $axios.$get(
      `/api/content/resume.${app.i18n.locale}.yaml`,
      {
        headers: {
          'Access-Control-Allow-Origin': '',
          Accept: 'application/x-yaml, text/yaml'
        }
      }
    )
    return { data: yaml.safeLoad(data) }
  },
  methods: {
    monthAndYear(date) {
      if (date) return moment(date).format('MMMM YYYY')
      else return this.$t('now')
    }
  },
  nuxtI18n: {
    paths: {
      en: '/resume',
      tr: '/ozgecmis'
    }
  },
  head() {
    return this.$nuxtI18nSeo()
  }
}
</script>
