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
                            <a class="block px-4 py-2 text-sm text-gray-700 ">
                                <i class="bi bi-pencil-fill me-3"></i>Edit Note
                            </a>
                        </button>
                    </router-link>

                    <button @click="handleDelete(combinedNote.id)"
                        class="py-1 hover:bg-gray-100 hover:text-gray-900 w-full text-start">
                        <a class="block px-4 py-2 text-sm text-gray-700 ">
                            <i class="bi bi-trash3-fill me-3"></i>Delete Note</a>
                    </button>

                    <button @click="handleFavorite(combinedNote.id)"
                        class="py-1 hover:bg-gray-100 hover:text-gray-900 w-full text-start">
                        <a class="block px-4 py-2 text-sm text-gray-700 ">
                            <i class="bi bi-star-fill me-3"></i>Mark as {{ combinedNote.favorite ? 'Unfavorite' : 'Favorite'
                            }}</a>
                    </button>
                </div>
            </div>

            <span>
                {{ combinedNote.date }}
            </span>
        </div>
        <div class="py-2 px-10 h-[80px] overflow-clip">
            <router-link :to="{ name: 'details', params: { id: combinedNote.id } }">
                <h1 class="text-3xl mb-3 font-semibold">{{ combinedNote.title }}</h1>
            </router-link>
            <p>{{ combinedNote.content }}</p>
        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue';
import { AVAILABLE_BANNERS } from '@/lib/banners';
import { useNoteContainerToggle } from "@/common/noteContainerToggle";

const {
    isOpen,
    toggleDropdown,
} = useNoteContainerToggle();
const { note } = defineProps(['note']);
const emit = defineEmits(['handleFavorite', 'handleDelete']);

const mapNoteBanner = () => {
    const banner = AVAILABLE_BANNERS.value.find(banner => banner.name === note.banner)
    if (banner) {
        return { ...note, textValue: banner.textValue, bgValue: banner.bgValue }
    }
    return note;
}
const combinedNote = ref({ ...mapNoteBanner() });

const handleFavorite = (id) => {

    // update own view
    combinedNote.value = { ...combinedNote.value, favorite: !combinedNote.value.favorite }

    // let parent know something changed
    emit('handleFavorite', id);
}

const handleDelete = (id) => {
    emit('handleDelete', id);
}

</script>