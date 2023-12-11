<template>
    <div class="p-4">
        <NotesContainer v-for="item in items" :key="item" :item="item"></NotesContainer>
    </div>
</template>

<script setup>
import NotesContainer from '@/components/NotesContainer.vue';
const items = [1,2,3,4,5,6,7,8,9,10]
</script>