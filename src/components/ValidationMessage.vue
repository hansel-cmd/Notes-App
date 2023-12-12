<template>
    <span class="text-red-700 text-sm py-1" v-if="model.$invalid && model.$dirty">{{
        model.$silentErrors[0]?.$message }}</span>
</template>

<script setup>
const { model } = defineProps(['model'])
</script>

<style lang="scss" scoped></style>