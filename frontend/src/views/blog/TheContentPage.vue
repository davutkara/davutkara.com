<template>
  <article>
    <header>
      <h1>{{ title }}</h1>
      <p>
        {{ t("postDetails", { date: datePretty(date), author }) }}
        <!-- - <a href="#comments">6 comments</a> -->
      </p>
    </header>
    <nav v-if="tableOfContents && tableOfContents.length">
      <h2>İçindekiler</h2>
      <ul>
        <li v-for="([title, id], tI) in tableOfContents" :key="tI">
          <a @click.prevent="scrollToId" :href="'#' + id" v-text="title"></a>
        </li>
      </ul>
      <!-- 
      <button
        style="display: block; margin-top: 1em"
        class="float-left"
        @click="() => $router.push('././comments')"
      >
        (17) Comments
      </button>
      <button
        style="display: block; margin-top: 1em; margin-left: 0.9em"
        class="float-left"
      >
        (5) Revisions
      </button>
      <br />
      <button style="display: block; margin-top: 2.5em" class="w-100">
        Buy me a coffee
      </button> -->
    </nav>
    <div v-html="article" />
  </article>
  <router-view />
</template>

<script>
import { useI18n } from "vue-i18n";
const marked = require("marked");
import CodeHighlighter from "@/helpers/CodeHighlighter";
export default {
  props: {
    content: {
      required: true,
    },
  },
  setup() {
    const { t, locale } = useI18n({
      useScope: "global",
    });

    const datePretty = (e) => {
      const event = new Date(e);
      return event.toLocaleDateString(locale.value);
    };
    
    return { t, datePretty };
  },
  mounted() {
    document.querySelectorAll("pre code").forEach((block) => {
      if (block) CodeHighlighter(block);
    });
  },
  computed: {
    author() {
      if (this.content) return this.content.author;
      else return "";
    },
    title() {
      if (this.content) return this.content.title;
      else return "";
    },
    date() {
      if (this.content) return this.content.date;
      else return "";
    },
    article() {
      if (this.content && this.content.content)
        return marked(this.content.content);
      else return "";
    },
    tableOfContents() {
      const hTagsRegex = /<(h[0-9]) (id=('|")(.+)('|"))?>(.+)<\/\1>/g;

      return Array.from(this.article.matchAll(hTagsRegex)).map(
        (
          // [full, htag, idFull, end, id, end2, title]
          [, , , , id, , title]
        ) => {
          var html = title;
          var div = document.createElement("div");
          div.innerHTML = html;
          var text = div.textContent || div.innerText || "";
          return [text, id];
        }
      );
    },
  },
  methods: {
    scrollToId(el) {
      const id = el.target.getAttribute("href");
      const titleEl = document.querySelector(id);
      const tabsHight = document.getElementById("tabs").clientHeight;
      document.getElementById("text-bar").scrollTo({
        top: titleEl.offsetTop - tabsHight - 16,
        left: titleEl.offsetLeft,
        behavior: "smooth",
      });
    },
  },
};
</script>

<style lang="scss">
// hybrid
// stackoverflow-dark.

:root,
:root[data-theme="dark"] {
  @import "~highlight.js/scss/hybrid.scss";
  .hljs {
    background: var(--color-bg-deep);
  }
}
:root[data-theme="light"] {
  @import "~highlight.js/scss/github.scss";
}

article pre {
  max-width: calc(600px);
  margin: 1em 0 1em -1em;

  code {
    &::before {
      content: "Code Example:";
      font-size: 0.75em;
      display: block;
      margin-bottom: 0.75em;
    }
    border: 1px solid #ffffff20;
    border-right: none;
    border-left: none;
    width: 100%;
    padding: 1em !important;
    scrollbar-width: thin;
  }
}
</style>

<style lang="scss" scoped>
header a {
  color: var(--color-bg-text);
}
article:deep() {
  div > p {
    a {
      color: #de935f;
      text-decoration: none;
      border-left: 1px solid #ffffff20;
      padding: 0 5px;
      margin: 0.1em 0;
      display: inline-block;
      //border-left: 0;
      //border-right: 0;
      font-size: 0.75em;
      &:hover {
        background: #b5bd6850;
        color: inherit;
      }
      &:before {
        content: "Link:  ";
      }
    }
  }
  nav {
    position: -webkit-sticky;
    position: sticky;
    top: 5em;
    width: 250px;
    @media only screen and (max-width: 1000px) {
      max-width: 250px;
    }

    max-width: max-content;
    float: right;
    padding: 1em 1.5em;
    margin: 1em 0;

    @media only screen and (max-width: 1000px) {
      position: unset !important;
      top: unset;
      float: unset;
    }

    background: var(--color-bg-deep);
    border: 1px solid var(--color-bg-deep-changed-50);
    /* display: inline-block; */
    h2 {
      font-weight: 600;
      font-size: 1em;
    }
    ul {
      color: var(--color-bg-text);
      list-style-type: decimal;
      margin-top: 1em;
      margin-left: 1.5em;
      text-align: left;
      width: 100%;
    }
    li {
      margin-top: 0.25em;
      max-width: 100%;
      a {
        color: var(--color-bg-text);
        text-decoration: none;
        font-size: 0.9em;
      }
    }
  }
}

button {
  border: 0;
  padding: 5px 10px;
  color: rgba(255, 255, 255, 0.788);
  background-color: rgba(86, 86, 86, 0.438);
  cursor: pointer;
}
.float-left {
  float: left;
}
button:hover {
  color: rgb(255, 255, 255);
  background-color: rgb(86, 86, 86);
  /*
  background-color: rgb(14, 99, 156);
  */
}
.w-100 {
  width: 100%;
}
</style>
