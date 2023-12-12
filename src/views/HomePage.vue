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
import { ref } from 'vue';

const notes = ref(JSON.parse(localStorage.getItem('notes')) || []);

const handleFavorite = (id) => {
    const updatedAllNotes = notes.value.map(note => {
        if (note.id === id) {
            if (note.favorite)
                toast.value.message = 'Removed from favorites!';
            else
                toast.value.message = 'Marked as favorite!';

            return {
                ...note,
                favorite: !note.favorite
            }
        }
        return note;
    })

    localStorage.setItem('notes', JSON.stringify(updatedAllNotes));

    toast.value.show = true;
    resetToast();
}

const handleDelete = (id) => {
    const msg = 'Do you really want to delete this note? This process cannot be undone.'
    const confirm = window.confirm(msg);
    if (!confirm) return;

    const updatedNotes = notes.value.filter(note => note.id !== id);
    notes.value = [...updatedNotes];
    localStorage.setItem('notes', JSON.stringify(updatedNotes));

    toast.value.show = true;
    toast.value.message = 'Deleted Successfully!';
    resetToast();
}


</script>