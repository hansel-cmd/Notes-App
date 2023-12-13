<template>
    <div class="p-4">
        <div :class="['border-t-8 bg-[#222] pt-1 mb-4', combinedNote.bgValue]">
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
                                <i class="bi bi-star-fill me-3"></i>Mark as {{ combinedNote.favorite ? 'Unfavorite' :
                                    'Favorite'
                                }}</a>
                        </button>
                    </div>
                </div>

                <span>
                    {{ combinedNote.date }}
                </span>
            </div>
            <div class="py-2 px-10">
                <router-link :to="{ name: 'details', params: { id: combinedNote.id } }">
                    <h1 class="text-3xl mb-3 font-semibold">{{ combinedNote.title }}</h1>
                </router-link>
                <textarea v-model="combinedNote.content"
                    class="w-full bg-transparent min-h-[500px] resize-none outline-none disabled:bg-transparent"
                    disabled="true">
                </textarea>
            </div>
            <Toast :shouldShow="toast.show" :message="toast.message"></Toast>
        </div>
    </div>
</template>

<script setup>
import { AVAILABLE_BANNERS } from '@/lib/banners';
import { useNotesStore } from '@/stores/notes';
import Toast from "@/components/ToastComponent.vue";
import { toast, resetToast } from "@/lib/toast";
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const notesStore = useNotesStore();
notesStore.getNote();

watch(() => notesStore, () => { })

const mapNoteBanner = () => {
    const banner = AVAILABLE_BANNERS.value.find(banner => banner.name === notesStore.currentNote.banner)
    if (banner) {
        return { ...notesStore.currentNote, textValue: banner.textValue, bgValue: banner.bgValue }
    }
    return notesStore.currentNote;
}

const combinedNote = ref({ ...mapNoteBanner() });

const handleDelete = (id) => {
    const msg = 'Do you really want to delete this note? This process cannot be undone.'
    const confirm = window.confirm(msg);
    if (!confirm) return;

    notesStore.handleDelete(id);
    router.push({
        name: 'home',
        replace: true
    });

    toast.value.show = true;
    toast.value.message = 'Deleted Successfully!';
    resetToast();

}

const handleFavorite = (id) => {
    const msg = notesStore.handleFavorite(id);

    // update own view
    combinedNote.value = { ...combinedNote.value, favorite: !combinedNote.value.favorite }

    toast.value.show = true;
    toast.value.message = msg;
    resetToast();
}

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