import { onBeforeMount, onBeforeUnmount } from "vue";
import { onBeforeRouteLeave } from "vue-router";

export const usePreventNavigation = ($v) => {
  const preventNav = (event) => {
    if ($v.value.$anyDirty) {
      event.preventDefault();
      event.returnValue = "";
    }
  };

  onBeforeMount(() => {
    window.addEventListener("beforeunload", preventNav);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("beforeunload", preventNav);
  });

  onBeforeRouteLeave((to, from, next) => {
    if ($v.value.$anyDirty) {
      const x = window.confirm(
        "Unsaved changes may not be saved. Do you want to leave page?"
      );
      if (x) return next();
      else return;
    }
    return next();
  });

  return {
    preventNav,
  };
};
