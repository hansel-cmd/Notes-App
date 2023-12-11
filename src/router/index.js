import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import * as routes from "./routes"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: routes.ALL,
      name: "home",
      component: HomePage,
    },
    {
      path: routes.CREATE,
      name: "create",
      component: () => import("../views/CreatePage.vue"),
    },
    {
      path: routes.SETTINGS,
      name: "settings",
      component: () => import("../views/SettingsPage.vue"),
    },
    {
      path: routes.FAVORITES,
      name: "favorites",
      component: () => import("../views/FavoritePage.vue"),
    },
    {
      path: routes.TRASH,
      name: "trash",
      component: () => import("../views/TrashPage.vue"),
    },
    {
      path: routes.GROUPS,
      name: "goups",
      component: () => import("../views/GroupPage.vue"),
    },
    {
      path: "/details/:id",
      name: "details",
      component: () => import("../views/DetailPage.vue"),
    },
  ],
});

export default router;
