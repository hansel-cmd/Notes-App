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

const props = defineProps(['qs']);

watch(props, () => favoriteNotes.value = getNotes());

const getNotes = () => {
    const n = (JSON.parse(localStorage.getItem('notes')) || []).filter(note => note.favorite);
    return n.filter(note => {
        return note.title.toLowerCase().includes(props.qs.toLowerCase()) ||
            note.content.toLowerCase().includes(props.qs.toLowerCase()) ||
            note.group.toLowerCase().includes(props.qs.toLowerCase())
    });
}

const favoriteNotes = ref(getNotes())


const handleFavorite = (id) => {

    const allNotes = JSON.parse(localStorage.getItem('notes')) || [];
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
    
    localStorage.setItem('notes', JSON.stringify(updatedAllNotes));
    favoriteNotes.value = getNotes();

    toast.value.show = true;
    resetToast();
}

const handleDelete = (id) => {
    const msg = 'Do you really want to delete this note? This process cannot be undone.'
    const confirm = window.confirm(msg);
    if (!confirm) return;

    const allNotes = JSON.parse(localStorage.getItem('notes'));
    const updatedNotes = allNotes.filter(note => note.id !== id);

    localStorage.setItem('notes', JSON.stringify(updatedNotes));

    const updatedFilteredNotes = updatedNotes.filter(note => note.favorite === true);
    favoriteNotes.value = [...updatedFilteredNotes];

    toast.value.show = true;
    toast.value.message = 'Deleted Successfully!';
    resetToast();
}


</script>