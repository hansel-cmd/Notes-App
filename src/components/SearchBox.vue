<template>
    <div class="border-b-[1px] p-2 h-[64px] relative">
        <div className="flex items-center border-[1px] px-2 py-2 grow">
            <input type="text" @keyup.enter="handleSearch"
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

const handleSearch = (e) => {
    console.log(e.target.value)
}

</script>