<script setup>
import {
  Rating,
  initTE,
} from "tw-elements";

onMounted(()=>{
    initTE({ Rating });
})

const props=defineProps({
    ratingValue:{
        type:Number,
        default:0
    }
})

</script>
<template>
    <ul class="text-secondary flex gap-[1px] items-center">
        <li v-for="index in 5" :key="index">
            <i class="fa-solid fa-star" v-if="index<ratingValue"></i>
            <i class="fa-regular fa-star-half-stroke" v-else-if="index==ratingValue"></i>
            <i class="fa-solid fa-star" v-else-if="ratingValue==0 && index==1"></i>
            <i class="fa-regular fa-star" v-else></i>
        </li>
    </ul>
</template>