<template>
    <div class="p-4">
        <NotesContainer v-for="note in notes" :key="note.id" :note="note" @handleFavorite="handleFavorite"></NotesContainer>
        <Toast :shouldShow="toast.show" :message="toast.message"></Toast>
    </div>
</template>

<script setup>
import NotesContainer from '@/components/NotesContainer.vue';
import Toast from "@/components/ToastComponent.vue";
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


</script>