<template>
  <article>
    <header>
      <h1 id="About" v-text-typewriter:100>Davut Kara</h1>
      <div class="locale-changer">
        <select v-model="$i18n.locale">
          <option
            v-for="locale in $i18n.availableLocales"
            :key="`locale-${locale}`"
            :value="locale"
          >
            {{ locale }}
          </option>
        </select>
      </div>
      {{ $t("message.hello") }}
    </header>
    <nav>
      <ul>
        <li v-list-state.active="true">
          <a v-scroll-anchor href="#About"> About </a>
        </li>
        <li v-list-state.active>
          <a v-scroll-anchor href="#tecrubeler"> Tecrubeler </a>
        </li>
        <li v-list-state.active>
          <a v-scroll-anchor href="#Projects">Projects</a>
        </li>
        <li v-list-state.active>
          <a v-scroll-anchor href="#cv-ozgecmis">Cv & Ozgecmis</a>
        </li>
      </ul>
    </nav>
    <h2 v-text-typewriter:750>Information Systems Engineer.</h2>
    <p>
      Merhaba burasi benim kisisel web sayfam. Burada Bilisim Teknolojilerine ve
      kisisel yazilarima yer vermekteyim.
    </p>
    <br />
    <h2 id="tecrubeler">Tecrubeler</h2>

    <div class="box-group">
      <div class="box-list square-200">
        <ul>
          <li class="js-logo head">Javascript</li>
          <li>VueJs</li>
          <li>PhaserJs</li>
          <li>TypeScript</li>
          <li>NodeJs</li>
        </ul>
      </div>

      <div class="box-list square-200">
        <ul>
          <!--  <li class="terminal-logo">Araclar</li> -->
          <li>Git</li>
          <li>Webpack</li>
          <li>Npm</li>
          <li>Linux</li>
        </ul>
      </div>

      <div class="box-list square-200">
        <ul>
          <!-- <li class="web-logo">Web</li> -->
          <li>Html</li>
          <li>Css</li>
          <li>Sass</li>
        </ul>
      </div>
    </div>

    <h2 id="Projects">Projects</h2>
    Yapim asamasinda
    <br />
    <br />
    <h2 id="cv-ozgecmis">CV & Ozgecmis</h2>
    Mail yolu ile talep edebilirsiniz.
  </article>
</template>

<script>
export default {
  mounted(){
    console.log(this.$route)
  }
}
</script>

<style lang="scss" scoped>
article {
  margin-left: 200px !important;
  nav {
    margin-left: -165px;
    margin-top: 20px;
    top: 100px;
    float: left;
    position: sticky;
    ul {
      li {
        margin-top: 1em;
        &:hover,
        &.active {
          cursor: pointer;
          border-left: 1px solid white;
          //border-bottom:1px solid white;
          padding-left: 0.5em;
          font-weight: 500;
          a {
            color: white;
          }
        }
      }
      a {
        text-decoration: none;
        color: var(--color-bg-text);
      }
    }
  }

  .m-0 {
    margin: 0 !important;
  }
}
.box-group {
  display: flex;
  flex-wrap: wrap;
}

.square-200 {
  width: 200px;
  height: 200px;
}

.b-500 {
  font-weight: 500;
}

.box-list {
  margin: 0 2em 2.5em 0;
  border: 1px solid gray;

  &.border-none {
    border: 0;
    margin-bottom: 0;
  }

  ul {
    margin: 1em;
  }
  li {
    &.head {
      font-size: 1.5em;
      margin-bottom: 0.4em;
      margin-left: 0;
      list-style-type: unset;
    }
    line-height: 22.5px;
    margin-left: 1.6em;
    margin-bottom: 5px;
    list-style-type: square;
    width: auto;
    cursor: pointer;
    &:hover {
      border-radius: 5%;
      // border-bottom: 1px solid yellow;
      text-decoration-line: line-through;
    }
  }
  .js-logo {
    &::before {
      display: inline-block;
      content: " ";
      width: 1em;
      height: 1em;
      background-image: url("~@/assets/images/svg/js.svg");
    }
  }
  .terminal-logo {
    &::before {
      display: inline-block;
      content: " ";
      width: 1em;
      height: 1em;
      background-image: url("~@/assets/images/svg/terminal.svg");
    }
  }
  .web-logo {
    &::before {
      display: inline-block;
      content: " ";
      width: 1em;
      height: 1em;
      background-image: url("~@/assets/images/svg/web.svg");
    }
  }
}
</style>