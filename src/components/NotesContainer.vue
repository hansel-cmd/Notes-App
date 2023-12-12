<template>
    <div :class="['border-t-8 bg-[#222] h-[150px] pt-1 mb-4', combinedNote.bgValue]">
        <div class="text-sm flex justify-between items-center px-6">
            <div class="relative text-left">
                <span :id="`kebab-${combinedNote.id}`" @click="toggleDropdown(`kebab-${combinedNote.id}`)" type="button"
                    class="hover:bg-gray-600 rounded p-2 w-full h-full cursor-pointer">
                    <i :id="`kebab-${combinedNote.id}`" class="bi bi-three-dots-vertical"></i>
                </span>

                <div v-if="isOpen"
                    class="origin-top-right absolute mt-2 w-44 shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <router-link :to="{ name: 'edit', params: { id: combinedNote.id } }">
                        <button class="py-1 hover:bg-gray-100 hover:text-gray-900 w-full text-start">
                            <a href="#" class="block px-4 py-2 text-sm text-gray-700 ">
                                <i class="bi bi-pencil-fill me-3"></i>Edit Note
                            </a>
                        </button>
                    </router-link>

                    <button class="py-1 hover:bg-gray-100 hover:text-gray-900 w-full text-start">
                        <a href="#" class="block px-4 py-2 text-sm text-gray-700 ">
                            <i class="bi bi-trash3-fill me-3"></i>Delete Note</a>
                    </button>

                    <button class="py-1 hover:bg-gray-100 hover:text-gray-900 w-full text-start">
                        <a href="#" class="block px-4 py-2 text-sm text-gray-700 ">
                            <i class="bi bi-star-fill me-3"></i>Mark as {{ combinedNote.favorite ? 'Favorite' : 'Unfavorite'
                            }}</a>
                    </button>
                </div>
            </div>

            <span>
                {{ combinedNote.date }}
            </span>
        </div>
        <div class="py-2 px-10 h-[80px] overflow-clip">
            <h1 class="text-3xl mb-3 font-semibold">{{ combinedNote.title }}</h1>
            <p>{{ combinedNote.content }}</p>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { AVAILABLE_BANNERS } from '@/lib/banners';

const { note } = defineProps(['note'])
const combinedNote = computed(() => {
    const banner = AVAILABLE_BANNERS.value.find(banner => banner.name === note.banner)
    if (banner) {
        return { ...note, textValue: banner.textValue, bgValue: banner.bgValue }
    }
    return note;
})

const isOpen = ref(false);
const dropdownRef = ref(null);

const toggleDropdown = (id) => {
    isOpen.value = !isOpen.value;
    dropdownRef.value = id
};

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