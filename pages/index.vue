<template>
  <div>
    <header-cmp/>
    <section class="section main-icerik" v-if="context !== null">
      <div class="container is-narrow">
        <div class="columns is-centered">
          <div class="column is-one-third">
            <div class="box">
              <div class="content">
                <h2>{{context[lang].education.title}}</h2>
                <h3>{{context[lang].education.university}}</h3>
                <b>{{context[lang].education.department}}</b>
                <span v-for="(line,i) in context[lang].education.lines" v-bind:key="i">
                  {{line}}
                  <br>
                </span>
                <h2>{{context[lang].linksTitle}}</h2>
                <p>
                  <b>Github://</b>
                  <a href="https://github.com/davutkara" target="_blank">davutkara</a>
                  <br>
                  <b>LinkedIn://</b>
                  <a href="https://www.linkedin.com/in/davutkara" target="_blank">davutkara</a>
                  <br>
                  <b>Youtube://</b>
                  <a href="http://www.youtube.com/c/DavutKARA95" target="_blank">DavutKARA95</a>
                  <br>
                </p>
                <h2>{{context[lang].communication.title}}</h2>
                <p>
                  <b>{{context[lang].communication.motherLangTitle}}</b>
                  <br>
                  {{context[lang].communication.motherLang}}
                  <br>
                  <b>{{context[lang].communication.foreignLangTitle}}</b>
                  <br>
                  <span
                    v-for="(lang,i) in  context[lang].communication.foreignLangs"
                    v-bind:key="i"
                  >{{lang}}</span>
                </p>
              </div>
            </div>
            <div class="box">
              <div class="content">
                <h2>{{context[lang].skills.title}}</h2>
                <div v-for="(skill,i) in context[lang].skills.lines" v-bind:key="i">
                  <b>{{skill.title}} :</b>
                  <progress
                    class="progress is-small"
                    :value="skill.progress"
                    max="100"
                  >{{skill.progress}}%</progress>
                </div>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="box">
              <div class="content">
                <a
                  :class="{
                    button:true, 
                    'is-danger': true,
                    'is-outlined': lang !== 'en'
                }"
                  @click="getContext('en')"
                >English</a>
                <a
                  :class="{
                    button:true, 
                    'is-danger': true,
                    'is-outlined': lang !== 'tr'
                }"
                  @click="getContext('tr')"
                >Türkçe</a>
              </div>
            </div>
            <div class="box">
              <div class="content">
                <h2>{{context[lang].experience.title}}</h2>
                <div v-for="(exp,i) in context[lang].experience.list" v-bind:key="i">
                  <h3>{{exp.company}}</h3>
                  <b>{{exp.title}}</b>
                  <p>{{exp.info}}</p>

                  <div v-if="i===0" v-html="printList(exp.description)"></div>
                  <div v-else>
                    <read-more :content="printList(exp.description)"></read-more>
                  </div>
                  <hr>
                </div>
              </div>
            </div>
            <div class="box">
              <div class="content">
                <h2>{{context[lang].awards.title}}</h2>
                <p v-for="(award,i) in context[lang].awards.list" v-bind:key="i">
                  <b>{{award.year}}</b>
                  | {{award.description}}
                </p>
              </div>
            </div>
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
import readMore from '~/components/readMore.vue'
import contextEn from '~/static/api/pages/index.en.json'
export default {
  layout: 'resume',
  head() {
    return {
      title: 'Davut KARA'
    }
  },
  components: { headerCmp, footerCmp, readMore },
  mounted: function() {
    this.sendWarning('Under construction.')
  },
  asyncData(context) {
    return {
      isStatic: context.isStatic,
      lang: 'en',
      context: {
        en: contextEn
      }
    }
  },
  filters: {},

  methods: {
    getContext: async function(lang) {
      if (this.context[lang] !== undefined) {
        this.lang = lang
        return
      }
      const data = await this.$axios.$get(
        `${window.location.origin}/api/pages/index.${lang}.json`
      )
      this.$set(this.context, lang, data)
      this.lang = lang
    },
    sendWarning: function(text) {
      this.$toast.open({
        duration: 3000,
        message: text,
        position: 'is-bottom-right',
        type: 'is-info'
      })
    },
    printList: function(data) {
      let list = ``

      data.forEach(text => {
        list += `<li>${text}</li>`
      })

      return `<ul>${list}</ul>`
    }
  }
}
</script>
