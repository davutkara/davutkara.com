<template>
  <div>
    <hero title="Davut KARA" subTitle="Information Systems Engineer" />
    <section class="section main-icerik">
      <div class="container has-background-white is-narrow">
       <div class="columns is-centered">
          <div class="column is-one-third">
            <div class="box">
              <div class="content">
                <h2>EDUCATION</h2>
                <h3>ATILIM UNIVERSITY</h3>
                <b>BS IN INFORMATIN SYSTEMS ENGINEERING</b>
                <p>Expected June 2019 | Ankara, Turkey <br />
                  Faculty of Engineering<br />
                  Major GPA: 2.49 / 4.0</p>
                <h2>LINKS</h2>
                <p>
                  <b>Github://</b> <a href="https://github.com/davutkara" target="_blank">davutkara</a><br/>
                  <b>LinkedIn://</b> <a href="https://www.linkedin.com/in/davutkara" target="_blank">davutkara</a><br/>
                  <b>Youtube://</b>  <a href="http://www.youtube.com/c/DavutKARA95" target="_blank">DavutKARA95</a><br/>
                </p>
                <h2>COMMUNICATION</h2>
                <p>
                  <b>Mother Language:</b><br/> Turkish<br/>
                  <b>Foreign Language:</b><br/> English-Intermediate
                </p>
              </div>
            </div>
            <div class="box">
              <div class="content">
                <h2>SKILLS</h2>

                <b>Core - PHP :</b>
                <progress class="progress is-small" value="90" max="100">90%</progress>
                <b>HTML CSS :</b>
                <progress class="progress is-small" value="85" max="100">85%</progress>
                <b>Javascript :</b>
                <progress class="progress is-small" value="80" max="100">80%</progress>
                <b>NodeJS :</b>
                <progress class="progress is-small" value="70" max="100">70%</progress>
                <b>MySql :</b>
                <progress class="progress is-small" value="65" max="100">65%</progress>
                <b>C++ :</b>
                <progress class="progress is-small" value="55" max="100">60%</progress>
                <b>C :</b>
                <progress class="progress is-small" value="45" max="100">50%</progress>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="box">
              <div class="content">
                <h2>EXPERINCE</h2>
                <h3>Portakal Yazılım</h3>
                <b>INFORMATION SYSTEMS ENGINEERING INTERN</b>
                <p>Aug 2017 - Sep 2017 | Ankara, Turkey</p>
                <ul>
                  <li>Worked on the front-end developers team in primarily Javascript,HTML and
                      CSS to plan, design and develop the full front-end implementation of a new
                      website..</li>
                  <li>Old websites reviewed and made decision for transferring all datas to
                      wordpress content management system.</li>
                  <li>Finally all code was perfected and pushed to production.</li>
                </ul>
                <h3>FREELANCE</h3>
                <b>FULL-STACK WEB DEVELOPER</b>
                <p>Aug 2012 - Now | Ankara, Turkey</p>
                <ul>
                  <li>Since 2012, made a lot of works on web.</li>
                  <li>Using html,css,php,plain and javascript framework.</li>
                  <li>Also, used wordpress as content management systems, developed a lot plugin
                      and themes.</li>
                  <li>Many bugs fixed, and desired things were made on web for customer.</li>
                  <li>Currently helping for needy developers on forums and other areas.</li>
                </ul>
              </div>
            </div>
            <div class="box">
              <div class="content">
                <h2>AWARDS</h2>
                <p>
                  <b>2016</b> | 5nd at 3th Software Project Contest on Atılım University
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
  .main-icerik{
    margin-top:-5em;
    padding-bottom:1em;
  }
  .main-icerik > .container{
    padding: 2em 2em 10em 2em;
  }
</style>


<script>
import hero from '~/components/hero.vue'
export default {
  components: {
    hero
  },
  mounted: function () {
    this.$toast.open({
      duration: 5000,
      message: `Under construction.`,
      position: 'is-bottom-right',
      type: 'is-info'
    })
  }
}
</script>
