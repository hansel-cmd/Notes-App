import { defineStore } from "pinia";
import { ref } from "vue";

export const STORE_GROUPS = "groups";

export const useGroupsStore = defineStore(STORE_GROUPS, () => {
  const parsed = JSON.parse(localStorage.getItem("groups")) || [];
  const groups = ref([...parsed]);

  const addGroup = (payload) => {
    let group;
    if (groups.value.length <= 0) {
      group = { ...payload, id: 1 };
    } else {
      const maxId = Math.max(...groups.value.map((g) => g.id)) + 1;
      group = { ...payload, id: maxId };
    }
    groups.value.push(group);
    localStorage.setItem("groups", JSON.stringify(groups.value));
  };

  return {
    groups,
    addGroup,
  };
});
