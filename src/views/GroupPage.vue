<template>
    <div class="p-4">
        <div v-if="groupsStore.groups.length > 0 && Object.entries(groupedNotes).length > 0">
            <CollapsibleMenuLink v-for="(notesInGroup, groupName) in groupedNotes" :key="groupName">
                <template v-slot:header>
                    <div class="flex items-center">
                        {{ groupName === '' ? 'No Group' : groupName }}
                    </div>
                </template>
                <template v-slot:content>
                    <NotesContainer v-for="note in notesInGroup" :key="note.id" :note="note" @handleDelete="handleDelete"
                        @handleFavorite="handleFavorite"></NotesContainer>
                </template>
            </CollapsibleMenuLink>
        </div>
        <div v-else>
            <NothingHere />
        </div>
        <Toast :shouldShow="toast.show" :message="toast.message"></Toast>
    </div>
</template>

<script setup>
import NothingHere from '@/components/NothingHere.vue';
import CollapsibleMenuLink from '@/components/CollapsibleMenuLink.vue';
import Toast from "@/components/ToastComponent.vue";
import NotesContainer from '@/components/NotesContainer.vue';
import { toast, resetToast } from "@/lib/toast";
import { useGroupsStore } from '@/stores/groups';
import { useNotesStore } from '@/stores/notes';
import { ref, watch } from 'vue';

const props = defineProps(['qs']);
const groupsStore = useGroupsStore();
const notesStore = useNotesStore();

const notes = ref(notesStore.searchNotes(props.qs));
const groupedNotes = ref(notesStore.mapNotesGroups(notes.value));

notesStore.notes = notesStore.searchNotes(props.qs);

watch(props, () => {
    notesStore.notes = notesStore.searchNotes(props.qs);
    console.log('props changered');
})

watch([() => notesStore.notes], () => {
    groupedNotes.value = notesStore.mapNotesGroups();
})


const handleDelete = (id) => {
    const msg = 'Do you really want to delete this note? This process cannot be undone.'
    const confirm = window.confirm(msg);
    if (!confirm) return;

    notesStore.handleDelete(id);
    notesStore.notes = notesStore.searchNotes(props.qs);
}

const handleFavorite = (id) => {
    const msg = notesStore.handleFavorite(id);
    toast.value.message = msg;
    toast.value.show = true;
    resetToast();
}




</script>

<style lang="scss" scoped></style>