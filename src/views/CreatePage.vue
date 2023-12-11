<template>
    <div class="">
        <div class="w-100 px-10">
            <div class="flex flex-col my-4">
                <label for="title" class="mb-2">Notes Title</label>
                <input id="title" name="title" type="text" class="p-2 border-[1px] bg-transparent rounded">
            </div>

            <div class="flex gap-4">
                <div class="flex flex-col my-4 flex-grow">
                    <label for="priority" class="mb-2">Add to an existing Group</label>
                    <div class="relative inline-block text-left">
                        <span id="priority" @click="toggleDropdown" type="button"
                            class="flex items-center justify-between border-[1px] bg-transparent rounded p-2 w-full h-full cursor-pointer">
                            Select Notes Group
                            <span :class="{ 'rotate-180': isOpen, 'transition transform': true }">
                                <i id="priority" class="bi bi-chevron-up"></i>
                            </span>
                        </span>
    
                        <div v-if="isOpen"
                            class="origin-top-right absolute mt-2 w-full shadow-lg bg-black border border-gray-100 ring-white ring-opacity-5">
                            <button
                                class="flex justify-between items-center py-1 hover:bg-gray-800 hover:text-gray-900 w-full text-start">
                                <a href="#" class="block px-4 py-2 text-sm text-white">
                                    <i class="bi bi-circle-fill text-red-800 ms-4 me-2"></i>
                                    School Stuff
                                </a>
                                <span class="text-white">
                                    <i class="bi bi-check-lg text-lg me-4"></i>
                                </span>
                            </button>
                            <button
                                class="flex justify-between items-center py-1 hover:bg-gray-800 hover:text-gray-900 w-full text-start">
                                <a href="#" class="block px-4 py-2 text-sm text-white ">
                                    <i class="bi bi-circle-fill text-orange-600 ms-4 me-2"></i>
                                    Personal Stuff
                                </a>
                                <span class="text-white">
                                    <i class="bi bi-check-lg text-lg me-4"></i>
                                </span>
                            </button>
                            <button
                                class="flex justify-between items-center py-1 hover:bg-gray-800 hover:text-gray-900 w-full text-start">
                                <a href="#" class="block px-4 py-2 text-sm text-white ">
                                    <i class="bi bi-circle-fill text-green-800 ms-4 me-2"></i>
                                    K-Pop Stuff
                                </a>
                                <span class="text-white">
                                    <i class="bi bi-check-lg text-lg me-4"></i>
                                </span>
                            </button>
                            <button
                                class="flex justify-between items-center py-1 hover:bg-gray-800 hover:text-gray-900 w-full text-start">
                                <a href="#" class="block px-4 py-2 text-sm text-white">
                                    <i class="bi bi-circle-fill text-blue-800 ms-4 me-2"></i>
                                    Others
                                </a>
                                <span class="text-white">
                                    <i class="bi bi-check-lg text-lg me-4"></i>
                                </span>
                            </button>
                        </div>
                    </div>
    
                </div>
    
                <div class="flex flex-col my-4 flex-grow">
                    <label for="title" class="mb-2">Create a New Group</label>
                    <input id="title" name="title" type="text" placeholder="Enter new group name" class="p-2 border-[1px] bg-transparent rounded">
                </div>
            </div>



            <div class="flex flex-col my-4">
                <label for="content" class="mb-2">Notes Content</label>
                <textarea for="content" name="" id="content"
                    class="p-3 border-[1px] bg-transparent rounded min-h-[250px]"></textarea>
            </div>

            <button class="bg-slate-800 hover:bg-slate-700 p-3 px-5 rounded-full w-full">Create</button>
        </div>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

const isOpen = ref(false);
const dropdownRef = ref(null);

const toggleDropdown = () => {
    isOpen.value = !isOpen.value
    dropdownRef.value = 'priority'
}

const closeDropdownOnOutsideClick = (event) => {
    if (isOpen.value &&
        dropdownRef.value !== event.target.id) {
        isOpen.value = false;
        dropdownRef.value = null;
    }
};

onMounted(() => {
    document.addEventListener('click', closeDropdownOnOutsideClick);
});

onUnmounted(() => {
    document.removeEventListener('click', closeDropdownOnOutsideClick);
});

</script>
