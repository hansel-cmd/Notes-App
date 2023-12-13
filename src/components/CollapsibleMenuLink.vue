<template>
    <div>
        <div @click="toggleCollapsible" class="cursor-pointer">
            <li class="py-2 px-4 flex items-center justify-between text-lg">
                <slot name="header">
                    <div class="flex items-center">
                        <span class="text-2xl me-4">
                            <i class="bi bi-three-dots"></i>
                        </span>
                        More
                    </div>
                </slot>
                <slot name="header">
                    <span :class="{ 'rotate-180': isOpen, 'transition transform': true }">
                        <i class="bi bi-chevron-up"></i>
                    </span>
                </slot>
            </li>
        </div>
        <div v-if="isOpen" class="ps-4">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

let isOpen = ref(false)

const toggleCollapsible = () => {
    isOpen.value = !isOpen.value;
}

</script>