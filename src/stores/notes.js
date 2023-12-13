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

  const searchNotes = (qs = "", withFavorite = false) => {
    let n = JSON.parse(localStorage.getItem("notes")) || [];
    if (withFavorite) {
        n = n.filter(note => note.favorite);
    }
    return n.filter(note => {
        return note.title.toLowerCase().includes(qs.toLowerCase()) ||
            note.content.toLowerCase().includes(qs.toLowerCase()) ||
            note.group.toLowerCase().includes(qs.toLowerCase())
    });
  };

  const addNote = (payload) => {
    let data;
    if (notes.value.length <= 0) {
      data = { ...payload, id: 1 };
    } else {
      const maxId = Math.max(...notes.value.map((note) => note.id)) + 1;
      data = { ...payload, id: maxId };
    }

    notes.value = [...notes.value, data];
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
    localStorage.setItem("notes", JSON.stringify(notes.value));
  };

  const handleFavorite = (id) => {
    let msg = "";
    const allNotes = JSON.parse(localStorage.getItem('notes')) || [];
    const updatedNotes = allNotes.map((note) => {
      if (note.id !== id) return note;

      if (note.favorite) msg = "Removed from favorites!";
      else msg = "Marked as favorite!";

      return {
        ...note,
        favorite: !note.favorite,
      };
    });

    localStorage.setItem("notes", JSON.stringify(updatedNotes));

    return msg;
  };

  const handleDelete = (id) => {
    const n = JSON.parse(localStorage.getItem('notes')) || [];
    const updatedNotes = n.filter(note => note.id !== id);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const mapNotesGroups = (base = null) => {
    const x = (base || notes.value).reduce((accumulate, current) => {
        const groupName = current.group;
        accumulate[groupName] = accumulate[groupName] || [];
        accumulate[groupName].push(current);
        return accumulate;
    }, {});
    return x;
}

  return {
    initialData,
    currentNote,
    newNote,
    notes,
    addNote,
    resetNote,
    getNote,
    updateNote,
    searchNotes,
    handleFavorite,
    handleDelete,
    mapNotesGroups
  };
});
