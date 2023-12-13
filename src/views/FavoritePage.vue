<template>
    <div class="p-4">
        <div v-if="favoriteNotes.length > 0">
            <NotesContainer v-for="note in favoriteNotes" :key="note.id" :note="note" @handleDelete="handleDelete"
                @handleFavorite="handleFavorite">
            </NotesContainer>
        </div>
        <div v-else class="flex items-center justify">
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
import { watch, ref } from 'vue';
import { useNotesStore } from '@/stores/notes';

const props = defineProps(['qs']);
const notesStore = useNotesStore();

watch(props, () => favoriteNotes.value = notesStore.searchNotes(props.qs, true))

const favoriteNotes =  ref(notesStore.searchNotes(props.qs, true));


const handleFavorite = (id) => {
    const msg = notesStore.handleFavorite(id);
    favoriteNotes.value = notesStore.searchNotes(props.qs, true);
    toast.value.show = true;
    toast.value.message = msg;
    resetToast();
}

const handleDelete = (id) => {
    const msg = 'Do you really want to delete this note? This process cannot be undone.'
    const confirm = window.confirm(msg);
    if (!confirm) return;

    notesStore.handleDelete(id);
    favoriteNotes.value = notesStore.searchNotes(props.qs, true);

    toast.value.show = true;
    toast.value.message = 'Deleted Successfully!';
    resetToast();
}


</script>