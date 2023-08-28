<script setup>
import {Ripple,initTE} from 'tw-elements'

const useCartStore=cartStore()


const props=defineProps({
    productInfo:{
        type:Object,
        required:true
    }
})

const count_controller=ref(1)
const total_price=ref(1)
onMounted(()=>{
    initTE({
        Ripple
    })
    count_controller.value=props.productInfo.ammount
    total_price.value=props.productInfo.overall_price
    
})


const handleIncrement=async()=>{
    count_controller.value=count_controller.value+1
    total_price.value=count_controller.value*props.productInfo.product.price
    //update the cart now
}
const handleDecrement=async()=>{
    if(count_controller.value>1){
        count_controller.value=count_controller.value-1
        total_price.value=count_controller.value*props.productInfo.product.price
        //update the cart now
    }
}

</script>

<template>
    <div class=" h-7 w-20 md:w-36 justify-between flex gap-1 bg-white  rounded-md overflow-hidden  items-center border">
        <!-- the substraction button -->
        <button @click="handleDecrement" 
        class="w-7 md:w-10 flex items-center justify-center text-white bg-secondary h-full text-2xl font-bold"
        data-te-ripple-init
        data-te-ripple-color="light"
        :disable="count_controller==1"
        >-</button>
        <div class="font-bold text-xs md:text-sm">
            {{ count_controller }}
        </div>
        <!-- the addition button -->
        <button @click="handleIncrement"
        class="w-7 md:w-10 flex items-center justify-center text-white bg-green-600 h-full text-2xl font-bold"
        data-te-ripple-init
        data-te-ripple-color="light"
        >+</button>
    </div>
</template>