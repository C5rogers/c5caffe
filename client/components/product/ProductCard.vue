<script setup>
const props=defineProps({
    product:{
        type:Object
    }
})

</script>

<template>
    <!-- the image -->
    <div 
    class="absolute w-full h-full flex items-center justify-center z-0"
    >
        <img :src="product.image" class="w-full h-full object-cover" alt="">
        <!-- the mask -->
        <div
        class="absolute w-full h-44 bottom-0 bg-black opacity-60 font-Roboto"
        >       
            <!-- wrapper -->
            <div class="w-full h-full relative opacity-100 z-auto flex flex-col gap-1 items-center">
                <!-- the product name -->
                <div class=" w-full text-2xl font-bold text-white px-1 capitalize z-auto">
                    {{ product.name }}
                </div>
                <!-- the product description -->
                <div>
                    <p class="text-xs text-gray-200 pl-4 pr-1 leading-tight">{{ product.description }}... <nuxt-link :to="`product/${product._id}`" class="text-blue-500">See more.</nuxt-link></p>
                    <shareble-five-start-rating :ratingValue="product.average_rating" class="pl-4" />
                </div>
                <!-- the product price and add to cart button -->
                <div>
                    
                </div>
            </div>
        </div>
    </div>

{{ product }}
    
</template>