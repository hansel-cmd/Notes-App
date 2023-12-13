<template>
    <div v-if="showSearchBox" class="border-b-[1px] p-2 h-[64px] relative">
        <div className="flex items-center border-[1px] px-2 py-2 grow">
            <input v-model="query" type="text" @keyup.enter="handleSearch"
                className="w-full ms-2 bg-transparent focus:outline-none dark:text-white border-0 border-transparent focus:ring-0" />
            <div className="me-2 outline-none">
                <span title="Search">
                    <i className="bi bi-search text-gray-400 text-lg block"></i>
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { EDIT, CREATE, DETAILS } from '@/router/routes';
import { computed, ref } from 'vue';

const route = useRoute();
const query = ref('')
const emit = defineEmits(['handleSearch'])


const showSearchBox = computed(() => {
    const regex = new RegExp(`^${EDIT.replace('/:id', '/\\d+')}$`);
    const regexDetails = new RegExp(`^${DETAILS.replace('/:id', '/\\d+')}$`);
    return route.path !== CREATE && !regex.test(route.path) &&  !regexDetails.test(route.path);
})

const handleSearch = (e) => {
    emit('handleSearch', e.target.value)
}

</script>