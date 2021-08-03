<template>
<!-- v-swipe.left="closeSidebarIfNotDesktop" -->
  <aside id="file-bar"  :class="{ disabled: !isSidebarShown }">
    <div id="profile">
      <img
        src="https://avatars.githubusercontent.com/u/10008440?v=4"
        width="64"
        height="64"
      />
      <div>
        <em>Davut KARA</em>
        <em>Information Systems Engineer</em>
      </div>
    </div>
    <nav @click="navClicked">
      <ul>
        <router-link
          :to="path"
          custom
          v-slot="{ navigate }"
          v-for="({ path, title }, menuIndex) in menu"
          :key="menuIndex"
        >
          <li
            @click.stop.prevent="
              () => {
                navigate();
                closeSidebarIfNotDesktop();
              }
            "
          >
            {{ title }}
          </li>
        </router-link>
      </ul>
    </nav>
  </aside>
</template>
<script>
import { LayoutBlogSetup } from "@/composables/LayoutBlog.js";
import { LanguageAlternateSetup } from "@/composables/LanguageAlternate.js";
import { RouteHistorySetup } from "@/composables/RouteHistory";
import { useI18n } from "vue-i18n";
import { computed, watchEffect } from "vue";
export default {
  setup() {
    const { route } = RouteHistorySetup();
    const { getAlternatesOfUrl } = LanguageAlternateSetup();
    const { t, locale } = useI18n({
      useScope: "global",
      locale: "en",
      messages: {
        en: {
          home: "Home",
          blog: "Blog",
          contact: "Contact",
        },
        tr: {
          home: "Ansayfa",
          blog: "Blog",
          contact: "Iletisim",
        },
      },
    });

    const { isSidebarShown, toggleSidebarShown } = LayoutBlogSetup();

    const closeSidebarIfNotDesktop = function() {
      if (window.innerWidth > 800) return;
      isSidebarShown.value = false;
    };

    watchEffect(() => {
      if (!route.path) return;
      closeSidebarIfNotDesktop();
    });

    const menu = computed(() => {
      return [
        ["home", "/home"],
        ["blog", "/blog"],
        ["contact", "/contact"],
      ].map(([langKey, path]) => ({
        path: getAlternatesOfUrl(path)[locale.value],
        title: t(langKey),
      }));
    });

    const navClicked = () => {
      closeSidebarIfNotDesktop();
    };
    
    return {
      isSidebarShown,
      toggleSidebarShown,
      navClicked,
      menu,
      closeSidebarIfNotDesktop
    };
  },
};
</script>
<style lang="scss" scoped>
aside#file-bar {
  border-left: 5px solid #333333;
  background: var(--color-bg-middle);
  height: 100vh;
  width: 250px;
  float: left;
  transition: all 0.4s ease;
  transition-timing-function: cubic-bezier(0.785, 0.135, 0.15, 0.86);

  // flexbox
  flex-shrink: 0;

  #profile,
  nav {
    transition: visibility 50ms step-end;
    transition: opacity 0.4s ease;
    transition-delay: 0.4s;
  }
  &.disabled {
    cursor: pointer;
    width: 0;
    border-left: 2px solid yellow;
    #profile,
    nav,
    * {
      opacity: 0;
      visibility: hidden;
    }
  }
  &:not(.disabled) {
    #profile {
      padding: 1em;
      position: relative;
      border-bottom: 2px solid #1f1f20;

      img {
        border-radius: 10%;
        filter: contrast(0.75);
      }

      div {
        position: absolute;
        top: 1.25em;
        left: calc(64px + 1.8em);
        color: var(--color-bg-text);

        & > em:nth-child(1) {
          display: block;
          font-weight: 700;
          color: #cacaca;
        }

        & > em:nth-child(2) {
          font-size: 0.8rem;
          color: #cacaca;
        }
      }
    }

    nav {
      padding-bottom: 1em;
      position: relative;
      color: rgb(190, 190, 190);
      font-weight: 500;
      font-weight: 400;

      ul {
        height: 80vh;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        li {
          user-select: none;
          ul {
            padding: 1em 2em 0 1em;
            overflow: scroll;
            overflow-x: hidden;
            overflow-x: hidden;
            scrollbar-color: #79797c7c var(--color-bg-middle);
            scrollbar-width: thin;
          }
          &.folder {
            overflow: auto;
            /* KEEP THIS, for FF & Edge (see link below) */
            display: flex;
            /* NEW */
            flex-direction: column;

            ul {
              margin-top: 0.5em;
            }

            ul li {
              padding: 0.35em 0;
            }

            /* :nth-child(1) */
            &::before {
              content: " ";
              background-repeat: no-repeat;
              width: 1em;
              height: 1em;
              position: absolute;
              top: 1.4em;
              left: 1em;
              font-size: 0.75em;
            }

            &.folder-close {
              ul {
                display: none;
              }
              &::before {
                background-image: url("data:image/svg+xml,%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 66.91 122.88' style='enable-background:new 0 0 66.91 122.88' xml:space='preserve'%3E%3Cg%3E%3Cpath d='M1.95,111.2c-2.65,2.72-2.59,7.08,0.14,9.73c2.72,2.65,7.08,2.59,9.73-0.14L64.94,66l-4.93-4.79l4.95,4.8 c2.65-2.74,2.59-7.11-0.15-9.76c-0.08-0.08-0.16-0.15-0.24-0.22L11.81,2.09c-2.65-2.73-7-2.79-9.73-0.14 C-0.64,4.6-0.7,8.95,1.95,11.68l48.46,49.55L1.95,111.2L1.95,111.2L1.95,111.2z'/%3E%3C/g%3E%3C/svg%3E");
                top: 1.7em;
                left: 0.1em;
              }

              &::before {
                background-image: url("data:image/svg+xml,%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 122.88 66.91' style='enable-background:new 0 0 122.88 66.91' xml:space='preserve'%3E%3Cg%3E%3Cpath d='M11.68,1.95C8.95-0.7,4.6-0.64,1.95,2.08c-2.65,2.72-2.59,7.08,0.13,9.73l54.79,53.13l4.8-4.93l-4.8,4.95 c2.74,2.65,7.1,2.58,9.75-0.15c0.08-0.08,0.15-0.16,0.22-0.24l53.95-52.76c2.73-2.65,2.79-7.01,0.14-9.73 c-2.65-2.72-7.01-2.79-9.73-0.13L61.65,50.41L11.68,1.95L11.68,1.95z'/%3E%3C/g%3E%3C/svg%3E");
                top: 1.7em;
                left: 0.1em;
              }
            }
          }
        }
      }

      & > ul > li {
        position: relative;
        padding: 1em 1em;
        padding-right: 1em;
        cursor: pointer;
      }

      li:hover {
        background-color: rgba(45, 45, 45, 0.5);
        color: white;
      }
    }
  }
}
</style>
