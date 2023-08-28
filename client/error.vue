<script setup>
const props=defineProps(['error'])

const isLoading=ref(false)

definePageMeta({
    layout:'404'
})
const handleGoHome=()=>clearError({redirect:'/'})

onMounted(()=>{
    if(props.error.message=='document is not defined' && props.error.statusCode==500){
        handleGoHome()
    }
})

</script>

<template>
    <!-- the container -->
    <div class="mx-auto my-10 container flex flex-col gap-3 items-center justify-center">
        <!-- the image -->
        <div class="w-80 h-80 flex items-center justify-center " v-if="error.statusCode==404">
            <img src="./assets/images/404 page.png" class="w-full h-full object-cover" alt="">
        </div>
        <!-- the other image -->
        <div class="w-80 h-80 flex items-center justify-center" v-else-if="error.statusCode==500">
            <img src="./assets/images/internal_server_error.gif" alt="">
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