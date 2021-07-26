<template>
  <article>
    <header>
      <h1 id="About" v-text-typewriter:100>{{ title }}</h1>
    </header>
    <nav>
      <ul>
        <li v-list-state.active="true">
          <a v-scroll-anchor href="#About"> {{ t("about") }} </a>
        </li>
        <li v-list-state.active>
          <a v-scroll-anchor href="#tecrubeler"> {{ t("skills") }} </a>
        </li>
        <!-- 
        <li v-list-state.active>
          <a v-scroll-anchor href="#Projects"> {{ t("projects") }}</a>
        </li>
        <li v-list-state.active>
          <a v-scroll-anchor href="#cv-ozgecmis"> {{ t("resume") }}</a>
        </li> -->
      </ul>
    </nav>
    <h2 v-text-typewriter:750>{{ subTitle }}</h2>
    <p v-text="description"></p>
    <br />
    <h2 id="tecrubeler">{{ t("skills") }}</h2>

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
    <!-- 
    <h2 id="Projects">{{ t("projects") }}</h2>
    Yapim asamasinda
    <br />
    <br />
    <h2 id="cv-ozgecmis">{{ t("resume") }}</h2>
    Mail yolu ile talep edebilirsiniz.
    -->
  </article>
</template>

<script>
import { useI18n } from "vue-i18n";
import Prerender from "@/composables/Prerender.js";
export default {
  props: {
    content: {
      required: true,
    },
  },
  setup(props) {
    Prerender();
    const { t } = useI18n({
      useScope: "global",
      messages: {
        en: {
          about: "About",
          skills: "Skills",
          projects: "Projects",
          resume: "CV & Resume",
        },
        tr: {
          about: "Hakkimda",
          skills: "Yetenekler",
          projects: "Projeler",
          resume: "CV & Ozgecmis",
        },
      },
    });

    return {
      t,
      title: props.content.title,
      subTitle: props.content.subTitle,
      description: props.content.description,
    };
  },
};
</script>

<style lang="scss" scoped>
article {
  margin-left: 200px !important;
  @media only screen and (max-width: 600px) {
    margin-left: 0 !important;
  }
  nav {
    @media only screen and (max-width: 600px) {
      display: none !important;
    }

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
  margin-bottom: 1em;
}

.square-200 {
  width: 200px;
  height: 200px;
  @media only screen and (max-width: 600px) {
    width: 100%;
    height: max-content;
    margin: 0.5em 0 !important;
  }
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
