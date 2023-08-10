<script setup> 
import {Ripple,initTE} from 'tw-elements'

const emit=defineEmits(['click'])

onMounted(()=>{
    initTE({Ripple})
})

const handleClick=()=>{
    emit('click')
}

</script>

<template>
    <div data-te-ripple-init data-te-ripple-color="#f57e16" class="w-16 h-16 flex justify-center cursor-pointer items-center rounded-full overflow-hidden border border-gray-300 bg-white" @click="handleClick">
        <img src="../assets/images/restlogo.png" alt="">
    </div>    
</template>