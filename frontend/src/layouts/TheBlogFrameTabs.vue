<template>
  <div id="tabs">
    <ul>
      <li
        @click="toggleSidebarShown"
        class="sidebar"
        :class="{ disabled: !isSidebarShown }"
      >
        ☰<transition
          ><template v-if="!isSidebarShown"> Davut KARA</template></transition
        >
      </li>
      <router-link
        v-for="({ path, title }, pI) in tabList"
        custom
        :key="pI"
        :to="path"
        v-slot="{}"
      >
        <li
          draggable="true"
          :class="{
            active: path === $route.path,
          }"
          @drop.prevent="moveTabDrop(path, $event)"
          @dragstart="moveTabDrag(path, $event)"
          @dragover.prevent
          @click="$router.push(path)"
          @contextmenu.stop.prevent="() => routeHistoryRemoveRouteByPath(path)"
        >
          {{ title }}
          <div
            class="tab-close"
            v-show="tabList.length > 1"
            @click.stop.prevent="() => routeHistoryRemoveRouteByPath(path)"
          ></div>
        </li>
      </router-link>
    </ul>
    <p v-if="activePageTags">{{ activePageTags }}</p>
  </div>
</template>

<script>
import { RouteHistorySetup } from "@/composables/RouteHistory.js";
import { LayoutBlogSetup } from "@/composables/LayoutBlog.js";
import { MapSplice, getIndexOfMapKey } from "@/utils/Map-splice.js";
export default {
  setup() {
    const { isSidebarShown, toggleSidebarShown } = LayoutBlogSetup();
    const {
      router,
      routeHistory,
      routeHistoryAddCurrentRoute,
      routeHistoryRemoveRouteByPath,
    } = RouteHistorySetup();

    // for first time.
    routeHistoryAddCurrentRoute();

    router.beforeEach(async (to, from) => {
      await routeHistoryAddCurrentRoute(to, from);
      return true;
    });

    return {
      routeHistory,
      routeHistoryRemoveRouteByPath,
      isSidebarShown,
      toggleSidebarShown,
    };
  },
  computed: {
    activePageTags() {
      if (this.activePageMeta && this.activePageMeta.tags) {
        return this.activePageMeta.tags
          .split(",")
          .map((value) => "#" + value)
          .join(", ");
      } else return "";
    },
    activePageMeta() {
      return this.routeHistory.get(this.$route.path);
    },
    tabList() {
      return Array.from(this.routeHistory.keys()).map((path) => ({
        path,
        ...this.routeHistory.get(path),
      }));
    },
  },
  methods: {
    moveTabDrop(basePath, e) {
      var path = e.dataTransfer.getData("path");

      var pathIndex = getIndexOfMapKey(this.routeHistory, path);
      var baseOb = this.routeHistory.get(basePath);

      MapSplice(this.routeHistory, basePath, 1, [
        [path, this.routeHistory.get(path)],
      ]);

      // this.routeHistory.delete(path);

      MapSplice(this.routeHistory, pathIndex, 0, [[basePath, baseOb]]);
    },
    moveTabDrag(path, e) {
      this.$router.push(path);
      e.dataTransfer.setData("path", path);
    },
  },
};
</script>

<style lang="scss" scoped>
#tabs {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  background: var(--color-bg-deep);
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.25);
  width: 100%;
  height: 3.5em;

  ul {
    background-color: var(--color-bg-deep-changed-3o5);

    li {
      margin: 0;
      padding: 0.5em 1em;
      display: inline-block;
      border-right: 2px solid var(--color-bg-deep-changed-3o5);
      background-color: var(--color-bg-deep-changed-15);
      //background-color: rgb(45, 45, 45);
      color: var(--color-bg-textp50);
      cursor: pointer;
      font-style: italic;
      font-size: 0.9em;
      height: 100%;
      &.active {
        background: var(--color-bg-deep);
        color: var(--color-bg-text);
        font-style: normal;
        font-size: 0.9em;
        & div.tab-close {
          background-color: var(--color-bg-text);
        }
      }

      &:not(.active):hover {
        div.tab-close {
          background-color: var(--color-bg-text);
        }
      }

      div.tab-close {
        display: inline-block;
        cursor: pointer;
        width: 0.75em;
        height: 0.75em;
        mask-image: url("~@/assets/images/svg/close.svg");
        background-repeat: no-repeat;
        background-size: auto;
        padding: 0;
        margin: 0 0.5em 0;
        text-align: center;
        border: 0;
        border-radius: 50%;
        &:hover {
          color: white;
        }
      }
    }

    li.sidebar {
      cursor: pointer;
      display: inline-block;
      &.disabled {
        background: #ffff0050;
        color: white;
        &:hover {
          background: #ffff0075;
        }
      }
      &:not(.disabled) {
        background: #333;
        &:hover {
          background: #ffff0050;
          color: white;
        }
      }
    }
  }

  p {
    margin: 0.6em 1.5em;
    padding: 1px;
    font-size: 12px;
    color: var(--color-bg-textp50);
  }
}
</style>