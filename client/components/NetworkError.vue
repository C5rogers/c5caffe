<script setup>

const emit=defineEmits(['reload'])

const props=defineProps({
    smallMode:{
        type:Boolean,
        default:false,
    }
})

const handleReload=()=>{
 emit('reload')   
}

</script>

<template>
    <!-- show the image here -->
    <div class="w-full flex items-center justify-center overflow-hidden" v-if="smallMode==false">
        <img src="../assets/images/noInternet.png" class="w-80 h-80 object-cover" alt="">
    </div>
    <div
    class="w-28 h-28 flex justify-center items-center rounded-full overflow-hidden"
    v-else
    >
        <img src="../assets//images//noInternet.png" class="w-full h-full object-cover" alt="">
    </div>
    <div
    v-if="smallMode"
    class="text-gray-700 text-xs capitalize font-Roboto"
    >
        Oops check your internet connection
    </div>
    <!-- the reload button here -->
    <div class="w-full flex flex-col items-center justify-center gap-2" v-if="smallMode==false">
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
    <button
    v-else
    @click="handleReload"
    class="px-3 py-[2px] text-xs capitalize mt-1 rounded-full border-[1px] border-secondary"
    >
        Reload
    </button>
</template>