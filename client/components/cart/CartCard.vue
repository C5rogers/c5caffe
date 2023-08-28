<script setup>
import {Ripple,initTE} from 'tw-elements'


onMounted(()=>{
    initTE({
        Ripple
    })
})



const props=defineProps({
    cart:{
        type:Object
    }
})


const handleDescription=(description)=>{
    if(description.length>50){
        return description.substring(0,50)+'...'
    }else{
        return description+'...'
    }
}
</script>

<template>
    <div class="w-full h-full flex flex-col justify-center">
        <!-- the upper one -->
        <div class="w-full h-full flex gap-1 py-2 items-center px-1 justify-between">
            <!-- the left one -->
            <div class="w-fit h-full flex gap-2 items-center justify-center ">
                <!-- the image container -->
                <div
                class="w-[7em] h-[4em] flex justify-center items-center rounded-md overflow-hidden"
                >
                    <img :src="cart.product.image" class="w-full h-full object-cover my-auto" :alt="cart.product.description">
                </div>
                <!-- the description container -->
                <div class="flex flex-col gap-[2px] justify-center font-Roboto">
                    <!-- the title -->
                    <div class="flex flex-col gap-0">
                        <!-- name -->
                        <div class="text-xl m-0 font-bold capitalize">{{ cart.product.name }}</div>
                        <!-- the price -->
                        <div class="text-xs m-0 font-bold capitalize"><span class="text-secondary">{{ cart.product.price }}/</span>USD</div>
                    </div>
                    <!-- the description -->
                    <div class="text-xs font-light first-letter:capitalize">
                        {{ handleDescription(cart.product.description) }}
                    </div>
                    <!-- the rating -->
                    <div>
                    <shareble-five-start-rating :ratingValue="cart.product.average_rating" />
                    </div>
                </div>
            </div>
            <!-- the middle one -->
            <div class="w-fit h-full px-2 flex justify-center items-center">
                <cartIncrementButton :productInfo="cart" />
            </div>
            
        </div>
        
    </div>
</template>