<template>
    <div class="">
        <div class="w-100 px-10">
            <form @submit.prevent="handleSubmit">
                <div class="flex flex-col my-4">
                    <label class="mb-2">Notes Banner *</label>
                    <div class="relative inline-block text-left z-10" @click="$v.banner.$touch">
                        <span id="banner" @click="toggleDropdown('banner', 'banner')" type="button"
                            class="flex items-center justify-between border-[1px] bg-transparent rounded p-2 w-full h-full cursor-pointer">
                            {{ notesStore.newNote.banner || 'Select Notes Banner' }}
                            <span :class="{ 'rotate-180': isBannerOptionOpen, 'transition transform': true }">
                                <i id="banner" class="bi bi-chevron-up"></i>
                            </span>
                        </span>

                        <div v-if="isBannerOptionOpen"
                            class="origin-top-right absolute mt-2 w-full shadow-lg bg-black border border-gray-100 ring-white ring-opacity-5">
                            <button @click="handleSelectBanner(banner.name)" v-for="banner in AVAILABLE_BANNERS"
                                :key="banner.id"
                                class="flex justify-between items-center py-1 hover:bg-gray-800 text-white w-full text-start">
                                <a href="#" class="block px-4 py-2 text-sm ">
                                    <i :class="['bi bi-circle-fill ms-4 me-2', banner.textValue]"></i>
                                    {{ banner.name }}
                                </a>
                                <span v-if="notesStore.newNote.banner === banner.name" class="text-white">
                                    <i class="bi bi-check-lg text-lg me-4"></i>
                                </span>
                            </button>
                        </div>
                    </div>
                    <ValidationMessage :model="$v.banner"></ValidationMessage>
                </div>
                <div class="flex flex-col my-4">
                    <label for="title" class="mb-2">Notes Title *</label>
                    <input id="title" v-model="notesStore.newNote.title" @blur="$v.title.$touch" name="title" type="text"
                        class="p-2 border-[1px] bg-transparent rounded">
                    <ValidationMessage :model="$v.title"></ValidationMessage>
                </div>

                <div class="flex gap-4">
                    <div class="flex flex-col my-4 flex-grow">
                        <label class="mb-2">Add to an existing Group</label>
                        <div class="relative inline-block text-left">
                            <span id="groupNotes" @click="toggleDropdown('groupNotes', 'groupNotes')" type="button"
                                class="flex items-center justify-between border-[1px] bg-transparent rounded p-2 w-full h-full cursor-pointer">

                                {{ notesStore.newNote.group || 'Select Notes Group' }}
                                <span :class="{ 'rotate-180': isGroupOptionOpen, 'transition transform': true }">
                                    <i id="groupNotes" class="bi bi-chevron-up"></i>
                                </span>
                            </span>

                            <div v-if="isGroupOptionOpen"
                                class="origin-top-right absolute mt-2 w-full shadow-lg bg-black border border-gray-100 ring-white ring-opacity-5">
                                <button @click="handleSelectGroup(group.name)" v-for="group in groupsStore.groups"
                                    :key="group.id"
                                    class="flex justify-between items-center py-1 hover:bg-gray-800 hover:text-gray-900 w-full text-start">
                                    <a href="#" class="block px-4 py-2 text-sm text-white">
                                        {{ group.name }}
                                    </a>
                                    <span v-if="notesStore.newNote.group === group.name" class="text-white">
                                        <i class="bi bi-check-lg text-lg me-4"></i>
                                    </span>
                                </button>
                                <button @click="handleSelectNewGroup"
                                    class="flex justify-between items-center py-1 hover:bg-gray-800 hover:text-gray-900 w-full text-start">
                                    <a href="#" class="block px-4 py-2 text-sm text-white">
                                        + New Group
                                    </a>
                                </button>
                            </div>
                        </div>

                    </div>

                    <div class="flex flex-col my-4 flex-grow">
                        <label for="newGroup" class="mb-2">Create a New Group</label>
                        <input id="newGroup" v-model="notesStore.newNote.newGroup" name="newGroup" type="text"
                            placeholder="Enter new group name"
                            class="p-2 border-[1px] bg-transparent rounded disabled:bg-gray-700 disabled:cursor-not-allowed"
                            :disabled="!enableNewGroupInput">
                    </div>
                </div>

                <div class="flex flex-col my-4">
                    <label for="content" class="mb-2">Notes Content *</label>
                    <textarea v-model="notesStore.newNote.content" @blur="$v.content.$touch" name="content" id="content"
                        class="p-3 border-[1px] bg-transparent rounded min-h-[250px]"></textarea>
                    <ValidationMessage :model="$v.content"></ValidationMessage>
                </div>

                <div class="my-4">
                    <input id="favorite" v-model="notesStore.newNote.favorite" type="checkbox">
                    <label for="favorite" class="ms-4">Mark as Favorite</label>
                </div>

                <hr class="mb-4">

                <button type="submit"
                    class="bg-slate-800 hover:bg-slate-700 p-3 px-5 rounded-full w-full disabled:cursor-not-allowed disabled:bg-slate-500"
                    :disabled="$v.$invalid && $v.$anyDirty">Create
                    Note</button>
            </form>
        </div>
        <Toast :shouldShow="toast.show" :message="toast.message" />
    </div>
</template>

<script setup>
import { nextTick } from 'vue';
import { AVAILABLE_BANNERS } from "@/lib/banners";
import ValidationMessage from "@/components/ValidationMessage.vue";
import Toast from "@/components/ToastComponent.vue";
import { toast, resetToast } from "@/lib/toast";
import { useNotesStore } from '@/stores/notes';
import { useGroupsStore } from "@/stores/groups";
import { useCreateEditToggle } from "@/common/createEditToggle";
import { usePreventNavigation } from "@/common/preventNavigation";
import { useFormValidation } from "@/validation/useFormValidation";

const notesStore = useNotesStore();
const groupsStore = useGroupsStore();
const { $v } = useFormValidation(notesStore.newNote);

usePreventNavigation($v);

const {
    enableNewGroupInput,
    isGroupOptionOpen,
    isBannerOptionOpen,
    toggleDropdown,
    handleSelectNewGroup,
    handleSelectGroup,
    handleSelectBanner,
} = useCreateEditToggle(notesStore.newNote);

const handleSubmit = async () => {

    const isFormCorrect = await $v.value.$validate()
    if (!isFormCorrect) return;

    const validatedData = {
        banner: notesStore.newNote.banner,
        title: notesStore.newNote.title,
        group: notesStore.newNote.group || notesStore.newNote.newGroup,
        content: notesStore.newNote.content,
        favorite: notesStore.newNote.favorite,
        date: new Date().toLocaleDateString()
    }

    if (notesStore.newNote.newGroup && notesStore.newNote.newGroup !== '') {
        console.log('i am creating a newe group', notesStore.newNote.newGroup)
        groupsStore.addGroup({ name: notesStore.newNote.newGroup });
    }

    notesStore.addNote(validatedData);
    notesStore.resetNote();

    toast.value.show = true;
    toast.value.message = 'Notes added successfully!';

    resetToast();
    nextTick(() => {
        $v.value.$reset()
    })
}

</script>