<template>
    <div class="p-4">
        <NotesContainer v-for="item in AVAILABLE_NOTES" :key="item" :note="item"></NotesContainer>
    </div>
</template>

<script setup>
import NotesContainer from '@/components/NotesContainer.vue';
import { AVAILABLE_NOTES } from "@/lib/notes";


</script>