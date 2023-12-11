<script setup>
import SideNavigation from './components/SideNavigation.vue';
import PageHeader from './components/PageHeader.vue';
import SearchBox from './components/SearchBox.vue';
</script>

<template>
  <div class="container flex border-x-[1px] w-[850px] mx-auto min-h-screen text-white">
    <div class="w-[250px] border-e-[1px]">
      <SideNavigation />
    </div>
    <div class="w-[600px]">
      <div class="sticky top-0 bg-black z-10">
        <PageHeader></PageHeader>
        <SearchBox />
      </div>
      <RouterView />
    </div>
  </div>
</template>

<style></style>
