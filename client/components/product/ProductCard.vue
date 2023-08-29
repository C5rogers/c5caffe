<script setup>
import {Ripple,initTE} from 'tw-elements'
const props=defineProps({
    product:{
        type:Object
    }
})

onMounted(() => {
initTE({
    Ripple
})  
})

const useAuthStore=authStore()
const useProductStore=productStore()


const emit=defineEmits(['add-to-cart','rate-product'])

const checkRated=(product_id)=>{
    let result=false
    if(useAuthStore.$state.user._id){
        const user_id=useAuthStore.$state.user._id
        useProductStore.$state.productRatings.forEach(element => {
        if(element.user_id._id==user_id && element.product_id._id==product_id){
            result=true
        }
    });
    }
    
    return result
}

const handleDescriptionShorting=(description)=>{
    if(description.length<60){
        return description+'...'
    }else{
        return description.substring(0,60)+'...'
    }
}

const handle_show_add_to_cart=()=>{
    emit('add-to-cart',props.product)
}

const handleRateProduct=()=>{
    emit('rate-product',props.product)
}
const router=useRouter()

const goToTheProduct=(product_id)=>{
    router.push(`/product/:${product_id}`)
}

const handleGoToLogin=()=>{
    router.push('/auth/login')
}
</script>

<template>
    <!-- the image -->
    <div 
    class="absolute w-full h-full flex items-center justify-center z-0"
    >
        <img :src="product.image" class="w-full h-full object-cover cursor-pointer" @click.self="goToTheProduct(product._id)" alt="">
        <!-- the mask -->
        <div
        class="absolute w-full h-36 bottom-0 bg-black opacity-80 font-Roboto"
        >       
            <!-- the like button -->
            <button
            data-te-toggle="modal"
            data-te-target="#productRatingStaticBackdrop"
            class="absolute right-6 p-1 flex items-center justify-center -top-5 shadow-md w-10 h-10 bg-white rounded-full"
            @click="handleRateProduct"
            v-if="useAuthStore.$state.isAuthed==true"
            >
            <i class="fas fa-thumbs-up"
            :class="{'text-secondary':checkRated(product._id)}"
            ></i>
            </button>
            <!-- the login rate button -->
            <button
            v-else
            class="absolute right-6 p-1 flex items-center justify-center -top-5 shadow-md w-10 h-10 bg-white rounded-full"
            @click="handleGoToLogin"
            >
            <i class="fas fa-thumbs-up"></i>
            </button>
                <teleport to='body'>
                    <product-rating :productInfo="product" />
                </teleport>
            <!-- wrapper -->
            <div class="w-full h-full relative opacity-100 z-auto flex flex-col gap-1 items-center">
                <!-- the product name -->
                <div class=" w-full text-2xl font-bold text-white px-1 capitalize z-auto">
                    {{ product.name }}
                </div>
                <!-- the product description -->
                <div>
                    <p class="text-xs text-gray-200 pl-4 pr-1 leading-tight">{{ handleDescriptionShorting(product.description) }} <nuxt-link :to="`product/${product._id}`" class="text-blue-500">See more.</nuxt-link></p>
                    <shareble-five-start-rating :ratingValue="product.average_rating" class="pl-4" />
                </div>
                <!-- the product price and add to cart button -->
                <div class="w-full flex justify-between px-1 items-center">
                    <!-- the price -->
                    <div class="font-Roboto font-bold text-white text-2xl">
                        {{ product.price }}$
                    </div>
                    <!-- the button -->
                    <div>
                        <button 
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        class="w-28 py-1 px-1 flex items-center justify-center gap-[1px] bg-secondary text-white text-sm font-bold rounded-md"
                        data-te-toggle="modal"
                        data-te-target="#addToCartFixedBackground"
                        @click="handle_show_add_to_cart"
                        >
                            <i class="fa-solid fa-cart-plus text-lg"></i>
                            <span>Add To Cart</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>