<template>
    <div class="p-4">
        <NotesContainer v-for="note in favoriteNotes" :key="note.id" :note="note" @handleFavorite="handleFavorite">
        </NotesContainer>
        <Toast :shouldShow="toast.show" :message="toast.message"></Toast>
    </div>
</template>

<script setup>
import NotesContainer from '@/components/NotesContainer.vue';
import Toast from "@/components/ToastComponent.vue";
import { toast, resetToast } from "@/lib/toast";
import { ref } from 'vue';

const favoriteNotes = ref(JSON.parse(localStorage.getItem('notes', []))
    .filter(note => note.favorite))


const handleFavorite = (id) => {

    const allNotes = JSON.parse(localStorage.getItem('notes', []));
    const updatedAllNotes = allNotes.map(note => {
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

    favoriteNotes.value = updatedAllNotes.filter(note => note.favorite)
    localStorage.setItem('notes', JSON.stringify(updatedAllNotes));

    toast.value.show = true;
    resetToast();
}


</script>