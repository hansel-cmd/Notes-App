<template>
  <div class="container flex border-x-[1px] w-full md:w-[850px] mx-auto min-h-screen text-white">
    <div id="side-nav" class="w-[250px] border-e-[1px] bg-black z-40 hidden min-h-screen md:block">
      <SideNavigation @showSideNav="showSideNav"/>
    </div>
    <div class="w-full md:w-[600px]">
      <div class="sticky top-0 bg-black z-20">
        <PageHeader @showSideNav="showSideNav"></PageHeader>
        <SearchBox @handleSearch="handleSearch" />
      </div>
      <RouterView :qs="queryString" />
    </div>
  </div>
</template>

<script setup>
import SideNavigation from './components/SideNavigation.vue';
import PageHeader from './components/PageHeader.vue';
import SearchBox from './components/SearchBox.vue';
import { onMounted, ref } from 'vue';

const queryString = ref('')

const handleSearch = (qs) => {
  queryString.value = qs;
}

const showSideNav = () => {
  const sideNav = document.querySelector('#side-nav');
  if (sideNav.classList.contains('hidden')) {
    sideNav.classList.remove('hidden');
    sideNav.classList.add('fixed');
  } else {
    sideNav.classList.remove('fixed');
    sideNav.classList.add('hidden');
  }
}

onMounted(() => {
  const sideNav = document.querySelector('#side-nav');
  window.addEventListener('resize', (e) => {
    console.log(e.target.innerWidth)
    if (e.target.innerWidth >= 768) {
      sideNav.classList.remove('fixed');
      sideNav.classList.add('hidden');
    }
  })
})


</script>
