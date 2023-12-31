import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import CreatePageVue from "../views/CreatePage.vue";
import * as routes from "./routes";
import NotFound from "@/views/NotFound.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: routes.ALL,
      name: "home",
      props: true,
      component: HomePage,
      beforeEnter(to, from, next) {
        document.title = "My Notes App | Home";
        return next();
      },
    },
    {
      path: routes.CREATE,
      name: "create",
      component: CreatePageVue,
      beforeEnter(to, from, next) {
        document.title = "My Notes App | Create";
        return next();
      },
    },
    {
      path: routes.EDIT,
      name: "edit",
      component: () => import("../views/EditPage.vue"),
      beforeEnter(to, from, next) {
        const param = Number(to.params?.id);
        if (isNaN(param)) {
          return next({ name: "not-found" });
        }
        document.title = "My Notes App | Edit";
        return next();
      },
    },
    {
      path: routes.FAVORITES,
      name: "favorites",
      props: true,
      component: () => import("../views/FavoritePage.vue"),
      beforeEnter(to, from, next) {
        document.title = "My Notes App | Favorites";
        return next();
      },
    },
    {
      path: routes.GROUPS,
      name: "groups",
      props: true,
      component: () => import("../views/GroupPage.vue"),
      beforeEnter(to, from, next) {
        document.title = "My Notes App | Group Notes";
        return next();
      },
    },
    {
      path: routes.DETAILS,
      name: "details",
      component: () => import("../views/DetailPage.vue"),
      beforeEnter(to, from, next) {
        const param = Number(to.params?.id);
        if (isNaN(param)) {
          return next({ name: "not-found" });
        }
        document.title = "My Notes App | Note Details";
        return next();
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFound,
      beforeEnter(to, from, next) {
        document.title = "My Notes App | Not Found";
        return next();
      },
    },
  ],
});

export default router;
