<script setup>
import {Ripple,initTE} from 'tw-elements'

const isGoogleLoading=ref(false)
const isGithubLoading=ref(false)
onMounted(()=>{
    initTE({Ripple})
})

const handleWithGoogle=()=>{
    isGithubLoading.value=false
    isGoogleLoading.value=!isGoogleLoading.value
}
</script>

<template>
    <!-- the auth loging button with google -->
    <div class="formInputCont">
        <!-- the input holder -->
        <div class="w-full flex flex-col gap-2 items-center">
            <button data-te-ripple-init data-te-ripple-color="dark" @click="handleWithGoogle" class="w-full px-2 relative py-[5px] text-lg flex items-center justify-center border border-blue-500 shadow-md rounded-xl">
                <div v-if="isGoogleLoading" class="w-full flex items-center justify-center">
                     <!-- the image  -->
                     <div class="absolute top-2 left-2 w-7 h-7 flex items-center justify-center rounded-full overflow-hidden">
                        <img src="../assets/images/google.png" class="w-full h-full object-cover" alt="">
                    </div>
                    <loading/>
                </div>    
                <div v-else class="w-full flex items-center text-sm sm:text-lg justify-center">
                    <!-- the image  -->
                    <div class="absolute top-[5px] sm:top-1 left-2 w-5 h-5 sm:w-7 sm:h-7 flex items-center justify-center rounded-full overflow-hidden">
                        <img src="../assets/images/google.png" class="w-full h-full object-cover" alt="">
                    </div>
                    Continue With Google
                </div>
            </button>
        </div>
    </div>
</template>