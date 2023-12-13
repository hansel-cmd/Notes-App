<template>
    <div class="sticky top-0 border-t-[1px]">
        <div class="border-b h-[64px] flex items-center justify-between">
            <router-link to="/" class="items-center flex">
                <img :src="logo" alt="logo" class="inline-block rounded-full h-[64px]">
                <span class="text-xl ms-2">
                    MY Notes App
                </span>
            </router-link>
            <span class="text-3xl px-2 md:hidden cursor-pointer" @click="showSideNav">
                <i class="bi bi-list"></i>
            </span>
        </div>
        <ul class="p-4">
            <router-link :to="link.path" v-for="link in routes.PRIMARY_LINKS" :key="link">
                <li class="py-2 px-4 flex items-center text-lg hover:bg-slate-700 group"
                    :class="{ 'bg-slate-700': router.path === link.path }">
                    <span class="text-2xl me-4">
                        <i :class="[router.path === link.path ? link.iconFilled : link.icon, 'group-hover:hidden']"></i>
                        <i :class="[link.iconFilled, 'hidden group-hover:inline-block']"></i>

                    </span>
                    {{ link.name }}
                </li>
            </router-link>
            <Collapsible>
                <template v-slot:content>
                    <router-link :to="link.path" v-for="link in routes.SECONDARY_LINKS" :key="link">
                        <li class="py-2 px-4 flex items-center text-lg hover:bg-slate-700 group"
                            :class="{ 'bg-slate-700': router.path === link.path }">
                            <span class="text-2xl me-4">
                                <i
                                    :class="[router.path === link.path ? link.iconFilled : link.icon, 'group-hover:hidden']"></i>
                                <i :class="[link.iconFilled, 'hidden group-hover:inline-block']"></i>
                            </span>
                            {{ link.name }}
                        </li>
                    </router-link>
                </template>
            </Collapsible>
        </ul>
    </div>
</template>

<script setup>
import logo from "@/assets/logo.png"
import Collapsible from "@/components/CollapsibleMenuLink.vue"
import * as routes from "@/router/routes"
import { useRoute } from "vue-router";

const emit = defineEmits(['showSideNav'])

const showSideNav = () => {
    emit('showSideNav')
}

const router = useRoute();

</script>

<style></style>