<template>
    <transition name="slide-in" mode="out-in">
        <div v-if="shouldShow" class="fixed bottom-4 right-4 bg-slate-900 border text-white p-4 rounded shadow">
            {{ message }}
        </div>
    </transition>
</template>
  
<script setup>
const { shouldShow, message } = defineProps(['shouldShow', 'message'])

</script>
  
<style scoped>
.slide-in-enter-active,
.slide-in-leave-active {
    transition: transform 0.5s;
}

.slide-in-enter-from,
.slide-in-leave-to {
    transform: translateX(100%);
}

.slide-in-enter-to,
.slide-in-leave-from {
    transform: translateX(0);
}
</style>