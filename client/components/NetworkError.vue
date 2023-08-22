<script setup>

const emit=defineEmits(['reload'])

const handleReload=()=>{
 emit('reload')   
}

</script>

<template>
    <!-- show the image here -->
    <div class="w-full flex items-center justify-center overflow-hidden">
        <img src="../assets/images/noInternet.png" class="w-full h-full object-cover" alt="">
    </div>
    <!-- the reload button here -->
    <div class="w-full flex flex-col items-center justify-center gap-2">
        <p class="text-gray-500 text-lg font-Roboto flex flex-col gap-1 text-center">Network Error! <span class="text-xs">Check you connection.</span></p>
        <button
        data-te-ripple-init
        data-te-ripple-color="light"
        type="button"
        @click="handleReload"
        class="px-4 py-1 text-sm font-Roboto capitalize rounded-full border-[1px] border-secondary"
        >
            Reload
        </button>
    </div>
</template>