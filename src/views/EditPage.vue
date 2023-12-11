<template>
    <div class="">
        <div class="w-100 px-10">
            <form @submit.prevent="handleSubmit">
                <div class="flex flex-col my-4">
                    <label class="mb-2">Notes Banner</label>
                    <div class="relative inline-block text-left z-20">
                        <span id="banner" @click="toggleDropdown('banner', 'banner')" type="button"
                            class="flex items-center justify-between border-[1px] bg-transparent rounded p-2 w-full h-full cursor-pointer">
                            {{ data.banner || 'Select Notes Banner' }}
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
                                <span v-if="data.banner === banner.name" class="text-white">
                                    <i class="bi bi-check-lg text-lg me-4"></i>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col my-4">
                    <label for="title" class="mb-2">Notes Title</label>
                    <input id="title" v-model="data.title" name="title" type="text"
                        class="p-2 border-[1px] bg-transparent rounded">
                </div>

                <div class="flex gap-4">
                    <div class="flex flex-col my-4 flex-grow">
                        <label class="mb-2">Add to an existing Group</label>
                        <div class="relative inline-block text-left">
                            <span id="groupNotes" @click="toggleDropdown('groupNotes', 'groupNotes')" type="button"
                                class="flex items-center justify-between border-[1px] bg-transparent rounded p-2 w-full h-full cursor-pointer">

                                {{ data.group || 'Select Notes Group' }}
                                <span :class="{ 'rotate-180': isGroupOptionOpen, 'transition transform': true }">
                                    <i id="groupNotes" class="bi bi-chevron-up"></i>
                                </span>
                            </span>

                            <div v-if="isGroupOptionOpen"
                                class="origin-top-right absolute mt-2 w-full shadow-lg bg-black border border-gray-100 ring-white ring-opacity-5">
                                <button @click="handleSelectGroup(group.name)" v-for="group in AVAILABLE_GROUPS"
                                    :key="group.id"
                                    class="flex justify-between items-center py-1 hover:bg-gray-800 hover:text-gray-900 w-full text-start">
                                    <a href="#" class="block px-4 py-2 text-sm text-white">
                                        {{ group.name }}
                                    </a>
                                    <span v-if="data.group === group.name" class="text-white">
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
                        <input id="newGroup" v-model="data.newGroup" name="newGroup" type="text"
                            placeholder="Enter new group name"
                            class="p-2 border-[1px] bg-transparent rounded disabled:bg-gray-700 disabled:cursor-not-allowed"
                            :disabled="!enableNewGroupInput">
                    </div>
                </div>

                <div class="flex flex-col my-4">
                    <label for="content" class="mb-2">Notes Content</label>
                    <textarea v-model="data.content" name="content" id="content"
                        class="p-3 border-[1px] bg-transparent rounded min-h-[250px]"></textarea>
                </div>

                <button type="submit" class="bg-slate-800 hover:bg-slate-700 p-3 px-5 rounded-full w-full">Update
                    Notes</button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { AVAILABLE_BANNERS } from "@/lib/banners";
import { AVAILABLE_GROUPS } from "@/lib/groups";
import { onMounted, onUnmounted, ref } from "vue";
import { onBeforeRouteLeave } from "vue-router";

const data = ref({
    banner: '',
    title: '',
    group: '',
    newGroup: '',
    content: '',
});

const enableNewGroupInput = ref(false);
const isGroupOptionOpen = ref(false);
const isBannerOptionOpen = ref(false);
const dropdownRef = ref(null);

const toggleDropdown = (_ref = 'select', value) => {
    if (_ref === 'groupNotes') {
        isGroupOptionOpen.value = !isGroupOptionOpen.value
    }
    else if (_ref === 'banner') {
        isBannerOptionOpen.value = !isBannerOptionOpen.value
    }
    dropdownRef.value = value
}

const handleSelectNewGroup = () => {
    enableNewGroupInput.value = true;
    data.value.group = '';
    setTimeout(() => {
        document.querySelector('#newGroup').focus();
    }, 0);
}

const handleSelectGroup = (value) => {
    data.value.group = value;

    // reset the other
    data.value.newGroup = '';
    enableNewGroupInput.value = false;
}

const handleSelectBanner = (value) => {
    data.value.banner = value;
}

const closeDropdownOnOutsideClick = (event) => {
    if ((isBannerOptionOpen.value || isGroupOptionOpen.value) &&
        dropdownRef.value !== event.target.id) {
        isGroupOptionOpen.value = false;
        isBannerOptionOpen.value = false;
        dropdownRef.value = null;
    }
};

onBeforeRouteLeave((to, from, next) => {
    const x = window.confirm('Unsaved changes may not be saved. Do you want to leave page?');
    if (x) return next();
    else return;
})

onMounted(() => {
    document.addEventListener('click', closeDropdownOnOutsideClick);
});

onUnmounted(() => {
    document.removeEventListener('click', closeDropdownOnOutsideClick);
});

</script>