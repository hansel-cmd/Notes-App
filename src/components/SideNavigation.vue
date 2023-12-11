<template>
    <div class="w-[250px] border">
        <div class="border-b h-[64px]">
            <router-link to="/">
                <img :src="logo" alt="logo" class="rounded-full h-full">
            </router-link>
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

const router = useRoute();

</script>

<style></style>