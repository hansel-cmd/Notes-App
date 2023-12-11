<template>
    <div class="border-t-8 bg-[#222] border-t-blue-500 h-[150px] pt-1 mb-4 overflow-clip">
        <div class="text-sm flex justify-between items-center px-6">
            <div class="relative inline-block text-left">
                <span :id="`kebab-${item}`" @click="toggleDropdown(`kebab-${item}`)" type="button"
                    class="hover:bg-gray-600 rounded p-2 w-full h-full cursor-pointer">
                    <i :id="`kebab-${item}`" class="bi bi-three-dots-vertical"></i>
                </span>

                <div v-if="isOpen"
                    class="origin-top-right absolute mt-2 w-44 shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <button class="py-1 hover:bg-gray-100 hover:text-gray-900 w-full text-start">
                        <a href="#" class="block px-4 py-2 text-sm text-gray-700 ">Edit Note</a>
                    </button>

                    <button class="py-1 hover:bg-gray-100 hover:text-gray-900 w-full text-start">
                        <a href="#" class="block px-4 py-2 text-sm text-gray-700 ">Delete Note</a>
                    </button>
                </div>
            </div>

            <span>
                August 2, 2023
            </span>
        </div>
        <div class="py-2 px-10">
            <h1 class="text-3xl mb-4">Client Meeting Options</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae atque numquam ipsam quisquam ut vitae quasi
                qui
                exercitationem tempore fugit, itaque ab cum ea ullam fugiat provident nulla velit hic minus deleniti eveniet
                quo
                blanditiis! Consequatur modi dolor reiciendis fuga qui ea illo, ipsa quis culpa in fugiat! Perspiciatis eius
                alias praesentium vitae voluptatibus magnam enim delectus blanditiis facilis repudiandae. Perspiciatis
                earum,
                nobis, enim beatae atque ullam asperiores eum magnam inventore commodi velit? Suscipit totam fuga repellat
                deleniti ducimus. Quos tempore doloremque quisquam tenetur illo esse quis explicabo velit fuga commodi.
                Earum
                quaerat, tenetur harum explicabo delectus qui aperiam illum.</p>

        </div>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
const item = defineProps('item')

const isOpen = ref(false);
const dropdownRef = ref(null);

const toggleDropdown = (id) => {
    isOpen.value = !isOpen.value;
    dropdownRef.value = id
};

const closeDropdownOnOutsideClick = (event) => {
    if (isOpen.value &&
        dropdownRef.value !== event.target.id) {
        isOpen.value = false;
        dropdownRef.value = null;
    }
};

onMounted(() => {
    document.addEventListener('click', closeDropdownOnOutsideClick);
});

onUnmounted(() => {
    document.removeEventListener('click', closeDropdownOnOutsideClick);
});

</script>