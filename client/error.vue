<script setup>
defineProps(['error'])

const isLoading=ref(false)

definePageMeta({
    layout:'404'
})
const handleGoHome=()=>clearError({redirect:'/'})

</script>

<template>
    <!-- the container -->
    <div class="mx-auto my-10 container flex flex-col gap-3 items-center justify-center">
        <!-- the image -->
        <div class="w-80 h-80 flex items-center justify-center ">
            <img src="./assets/images/404 page.png" class="w-full h-full object-cover" alt="">
        </div>
        <!-- the message -->
        <div class="font-Roboto text-lg">
            <p>
                <span class="font-bold"> Oops!</span>  {{ error.message }}
            </p>
        </div>
        <div class="w-32">
            <Button theme="bg-secondary" :no-loader='false' :is-loading="isLoading" text_theme="text-white" @click="handleGoHome">Go Home</Button>
        </div>
    </div>
    
</template>