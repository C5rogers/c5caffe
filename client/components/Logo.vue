<script setup> 
import {Ripple,initTE} from 'tw-elements'

const emit=defineEmits(['click'])

const props=defineProps({
    adminMode:{
        type:Boolean,
        default:false
    }
})

onMounted(()=>{
    initTE({Ripple})
})

const handleClick=()=>{
    emit('click')
}

</script>

<template>
    <!-- the container -->
    <div
    class="w-fit flex items-center justify-center gap-1"
    >
        <!-- the logo -->
        <div data-te-ripple-init data-te-ripple-color="#f57e16" class="w-7 h-7 sm:mt-10 md:mt-0 md:w-16 md:h-16 flex justify-center cursor-pointer items-center rounded-full overflow-hidden border border-gray-300 bg-white" @click="handleClick" v-if="adminMode==false">
            <img src="../assets/images/restlogo.png" alt="">
        </div>   
        <!-- the logo -->
        <div data-te-ripple-init class="w-4 h-4 sm:mt-10 md:mt-0 md:w-12 md:h-12 flex justify-center cursor-pointer items-center rounded-full overflow-hidden border border-gray-300 bg-white" @click="handleClick" v-else>
            <img src="../assets/images/restlogo.png" class="w-full h-full object-cover" alt="">
        </div>
    </div>
     
</template>