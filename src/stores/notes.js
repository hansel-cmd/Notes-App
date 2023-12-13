import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

export const STORE_NOTES = "notes";

export const useNotesStore = defineStore(STORE_NOTES, () => {
  const route = useRoute();
  const initialData = computed(() => ({
    banner: "",
    title: "",
    group: "",
    newGroup: "",
    content: "",
    favorite: false,
  }));
  const currentNote = ref({ ...initialData.value });
  const newNote = ref({ ...initialData.value });
  const parsed = JSON.parse(localStorage.getItem("notes")) || [];
  const notes = ref([...parsed]);

  const addNote = (payload) => {
    let data;
    if (notes.value.length <= 0) {
      data = { ...payload, id: 1 };
    } else {
      const maxId = Math.max(...notes.value.map((note) => note.id)) + 1;
      data = { ...payload, id: maxId };
    }
    notes.value.push(data);
    localStorage.setItem("notes", JSON.stringify(notes.value));
  };

  const resetNote = () => {
    newNote.value = { ...initialData.value };
  };

  const getNote = () => {
    const note = notes.value.find(
      (note) => note.id === Number(route.params?.id)
    );
    if (!note) return;
    currentNote.value = {
      ...note,
      newGrup: "",
    };
  };

  const updateNote = (payload) => {
    currentNote.value = payload;
    const index = notes.value.findIndex((note) => note.id === payload.id);
    if (index < 0) return;
    notes.value[index] = payload;
    console.log(currentNote.value)
    localStorage.setItem("notes", JSON.stringify(notes.value));
  };

  return {
    initialData,
    currentNote,
    newNote,
    notes,
    addNote,
    resetNote,
    getNote,
    updateNote,
  };
});
