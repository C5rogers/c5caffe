
<script setup>
import {Ripple,initTE} from 'tw-elements'




const useCartStore=cartStore()
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


const handleDeleteCartItem=async()=>{
    const result=await useCartStore.removeCartItemFromCart(props.cart._id)
    if(result==true){
        if(useCartStore.$state.carts_current_page!=1 && !(useCartStore.$state.carts_current_page<1)){
            useCartStore.setCartsCurrentPage(useCartStore.$state.carts_current_page-1)
            await useCartStore.fetchAllCarts('')
        }
    }
}

const handleDescription=(description)=>{
    if(description.length>50){
        return description.substring(0,50)+'...'
    }else{
        return description+'...'
    }
}
const router=useRouter()
const handleGoToProduct=()=>{
    router.push(`product/:${props.cart.product._id}`)
}
</script>

<template>
    <div class="w-full relative h-full flex flex-col justify-center">
        <!-- the upper one -->
        <div class="w-full h-full flex gap-1 py-2 items-center px-1 justify-between">
            <!-- the left one -->
            <div class="w-fit h-full flex gap-2 items-center justify-center ">
                <!-- the image container -->
                <div
                class="w-[7em] h-[5em] flex justify-center items-center rounded-md overflow-hidden"
                >
                    <img :src="cart.product.image" class="w-full h-full cursor-pointer object-cover my-auto" @click.self="handleGoToProduct" :alt="cart.product.description">
                </div>
                <!-- the description container -->
                <div class="flex flex-col gap-[2px] justify-center font-Roboto">
                    <!-- the title -->
                    <div class="flex flex-col gap-0">
                        <!-- name -->
                        <div class="text-xl w-fit transition duration-200 hover:underline m-0 font-bold capitalize cursor-pointer" @click.self="handleGoToProduct()">{{ cart.product.name }}</div>
                        <!-- the price -->
                        <div class="text-xs m-0 font-bold capitalize underline"><span class="text-secondary">{{ cart.product.price }}/</span>USD</div>
                    </div>
                    <!-- the description -->
                    <div class="text-xs w-fit transition duration-200 cursor-pointer hover:underline font-light first-letter:capitalize" @click.self="handleGoToProduct()">
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
            <!-- the last one -->
            <div class="flex w-32 gap-1 mr-1 justify-center items-center font-light text-xl capitalize">
                <span class="font-bold">Total: </span>
                {{ cart.overall_price }}$
            </div>
        </div>
        <div class="absolute right-3 bottom-[3px]">
            <button type="button"
            @click="handleDeleteCartItem"
            class=" py-1 w-[7em] px-4 items-center hover:text-secondary text-xs hover:underline font-light rounded-md"
            >
                Remove
            </button>
        </div>
    </div>
</template>