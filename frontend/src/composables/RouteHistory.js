import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { MapSplice } from "@/utils/Map-splice.js";

export const ROUTE_HISTORY_OVERRIDE_HASH = "#override";

export const RouteHistory = reactive(new Map());

export const RouteHistorySetup = function() {
  // Get route and router instances from vue-router.
  const route = useRoute();
  const router = useRouter();

  router.beforeResolve((to, from, next) => {
    if (
      from.hash.includes(ROUTE_HISTORY_OVERRIDE_HASH) &&
      from &&
      to.path === from.path
    ) {
      next(false);
    } else {
      next();
    }
  });

  // init new route.
  const routeHistoryAddCurrentRoute = async (to = route, from) => {
    const theOtherLangPage = to.meta.alternate
      ? Object.values(to.meta.alternate).find((path) => {
          const res = RouteHistory.has(path);
          return res;
        })
      : null;

    // override for language changing
    if (
      (to.hash.includes(ROUTE_HISTORY_OVERRIDE_HASH) || theOtherLangPage) &&
      from
    ) {
      if (to.path === from.path) return;

      const fromPath = theOtherLangPage ? theOtherLangPage : from.path;

      MapSplice(RouteHistory, fromPath, 1, [[to.path, {}]]);
      return true;
    }

    if (!RouteHistory.has(to.path)) {
      RouteHistory.set(to.path, {});
    }
    return true;
  };

  // update the route meta fn.
  const routeHistoryUpdateCurrentRouteMeta = (meta) => {
    if (!RouteHistory.has(route.path)) return;
    const oldMeta = RouteHistory.get(route.path);
    if (meta) RouteHistory.set(route.path, { ...oldMeta, ...meta });
  };

  // remove route
  const routeHistoryRemoveRouteByPath = async (path) => {
    if (RouteHistory.size === 1 && lastRoute.value === "/home") return;

    RouteHistory.delete(path);

    let lastRoute;
    if (!RouteHistory.size) lastRoute = "/home";
    lastRoute = Array.from(RouteHistory)[RouteHistory.size - 1][0];

    if (path === route.path) {
      //router.back();
      await router.replace({
        path: lastRoute,
      });
    }
  };

  // export
  return {
    routeHistoryAddCurrentRoute,
    routeHistoryUpdateCurrentRouteMeta,
    routeHistoryRemoveRouteByPath,
    routeHistory: RouteHistory,
    router,
    route,
  };
};
