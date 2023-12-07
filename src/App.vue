<script setup>
import SideNavigation from './components/SideNavigation.vue';
import PageHeader from './components/PageHeader.vue';
import SearchBox from './components/SearchBox.vue';
</script>

<template>
  <div class="container flex justify-center border w-[850px] mx-auto h-screen text-white">
    <SideNavigation />
    <div class="flex-grow">
      <PageHeader></PageHeader>
      <SearchBox />
      <RouterView />
    </div>
  </div>
</template>

<style></style>
