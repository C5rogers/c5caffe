<script setup> 
import {Ripple,initTE} from 'tw-elements'

onMounted(()=>{
    initTE({Ripple})
})

</script>

<template>
    <div data-te-ripple-init data-te-ripple-color="#f57e16" class="w-16 h-16 flex justify-center items-center rounded-full overflow-hidden border border-gray-300">
        <img src="../assets/images/restlogo.png" alt="">
    </div>    
</template>