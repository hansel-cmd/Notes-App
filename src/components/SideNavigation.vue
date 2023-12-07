<template>
    <div class="w-[250px] border">
        <div class="border-b h-[64px]">
            <router-link to="/">
                <img :src="logo" alt="logo" class="rounded-full h-full">
            </router-link>
        </div>
        <ul class="p-4">
            <router-link :to="link.path" v-for="link in LINKS" :key="link">
            <li class="py-2 px-4 flex items-center text-lg hover:bg-slate-700 group">
                    <span class="text-2xl me-4">
                        <i :class="[link.icon, 'group-hover:hidden']"></i>
                        <i :class="[link.iconFilled, 'hidden group-hover:inline-block']"></i>

                    </span>
                    {{ link.name }}
                </li>
            </router-link>
        </ul>
    </div>
</template>

<script setup>
import logo from "@/assets/logo.png"

const LINKS = [
    {
        path: '/',
        name: 'All',
        icon: 'bi bi-house-door',
        iconFilled: 'bi bi-house-door-fill'
    },
    {
        path: '/create',
        name: 'New Note',
        icon: 'bi bi-plus-circle',
        iconFilled: 'bi bi-plus-circle-fill'
    },
]



</script>

<style></style>