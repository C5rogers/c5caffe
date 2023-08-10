<script setup>
defineProps(['error'])

definePageMeta({
    layout:'404'
})
const handleGoHome=()=>clearError({redirect:'/'})
</script>

<template>
    <!-- the container -->
    <div class="m-10 container flex flex-col gap-3 items-center justify-center">
        <!-- the image -->
        <div class="w-80 h-80 flex items-center justify-center ">
            <img src="./assets/images/404 page.png" class="w-full h-full object-cover" alt="">
        </div>
        <!-- the message -->
        <div>
            <p>
            Oops! {{ error.message }}
            </p>
        </div>
        <div>
            <button class="btn" @click="handleGoHome">Go Home</button>
        </div>
    </div>
    
</template>