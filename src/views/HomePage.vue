<template>
    <div class="p-4">
        <div v-if="notes.length > 0">
            <NotesContainer v-for="note in notes" :key="note.id" :note="note" @handleDelete="handleDelete"
                @handleFavorite="handleFavorite"></NotesContainer>
        </div>
        <div v-else>
            <NothingHere />
        </div>
        <Toast :shouldShow="toast.show" :message="toast.message"></Toast>
    </div>
</template>

<script setup>
import NotesContainer from '@/components/NotesContainer.vue';
import Toast from "@/components/ToastComponent.vue";
import NothingHere from '@/components/NothingHere.vue';
import { toast, resetToast } from "@/lib/toast";
import { ref, watch } from 'vue';
import { useNotesStore } from '@/stores/notes';

const props = defineProps(['qs']);
const notesStore = useNotesStore();

watch(props, () => notes.value = notesStore.searchNotes(props.qs))

const notes = ref(notesStore.searchNotes(props.qs));

const handleFavorite = (id) => {

    const msg = notesStore.handleFavorite(id);
    notes.value = notesStore.searchNotes(props.qs);

    toast.value.show = true;
    toast.value.message = msg;
    resetToast();
}

const handleDelete = (id) => {
    const msg = 'Do you really want to delete this note? This process cannot be undone.'
    const confirm = window.confirm(msg);
    if (!confirm) return;

    notesStore.handleDelete(id);
    notes.value = notesStore.searchNotes(props.qs);

    toast.value.show = true;
    toast.value.message = 'Deleted Successfully!';
    resetToast();
}


</script>