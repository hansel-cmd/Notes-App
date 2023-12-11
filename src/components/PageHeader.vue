<template>
    <div class="border-y-[1px] p-4 h-[64px] flex justify-between">
        <h1 class="text-2xl">{{ pagetitle }}</h1>
        <router-link to="/create" class="text-3xl">
            <i class="bi bi-plus-circle-fill"></i>
        </router-link>
    </div>
</template>

<script setup>
import { PRIMARY_LINKS, SECONDARY_LINKS } from "@/router/routes"
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

const pagetitle = ref('');
const router = useRoute();

const setPageTitle = () => {
    const LINKS = [...PRIMARY_LINKS, ...SECONDARY_LINKS];
    const currentLink = LINKS.find(link => router.path === link.path);
    if (currentLink) {
        pagetitle.value = currentLink.name;
    }
}

onMounted(() => {
    setPageTitle()
})

watch(router, () => {
    setPageTitle()
})

</script> 