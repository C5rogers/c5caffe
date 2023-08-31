<script setup>
import{Ripple,initTE,Carousel} from 'tw-elements'

const useCartStore=cartStore()
const empty_cart_message_controller=ref("Oops Your cart is empty")
const checkout_controller=ref(false)

onMounted(async()=>{
    useCartStore.resetLogedUsersCartCount()
    initTE({
        Ripple,
        Carousel
    })
    await useCartStore.fetchAllCarts('')
    await useCartStore.fetchFavoriteProducts()
})


const handleCheckOut=()=>{
    checkout_controller.value=!checkout_controller.value
}


const handleReload=async()=>{
        useCartStore.resetCartsNetworkError()
       await useCartStore.fetchAllCarts('')
}
const handleFavoriteProductReload=async()=>{
    useCartStore.resetFavoriteProductsNetworkError()
    await useCartStore.fetchFavoriteProducts()
}

const handleCartChangePage=async(pagenumber)=>{
    useCartStore.setCartsCurrentPage(pagenumber)
    await useCartStore.fetchAllCarts('')
}

const parseToNumber=(number)=>{
    const parsed=Number(number)
    if(!isNaN(parsed)) {
        return parsed
    }
    return 0
}

const forCartDeleteConfirmation=ref({
    identifyer:{},
    title:"",
    message:""
})

const handleConfirmationDeletingCart=(cart)=>{
    forCartDeleteConfirmation.value.identifyer=cart
    forCartDeleteConfirmation.value=`Deleting ${cart.product.name} from cart`
    forCartDeleteConfirmation.value= `Are you shure to delete ${cart.product.name} from you cart?.`
}

const handleDeleteCartItemConfirmationResult=(result)=>{

}
</script>

<template>
    <div class="w-full h-screen py-5 px-2 flex gap-3 items-center">
        <!-- the left one -->
        <div class="w-2/3 h-full flex flex-col gap-3">
            <!-- the upper one -->
            <div class="w-full h-2/3 p-2 border border-gray-300 rounded-xl">
                <!-- the title -->
                <div class="w-full py-1 px-2 border-b border-gray-300 font-Roboto font-bold text-xl text-gray-700 capitalize">
                    Cart Items
                </div>
                <!-- the body -->
                <div class="w-full flex flex-col gap-1 justify-center px-3">
                    <!-- the cart container -->
                    <div v-if="useCartStore.$state.carts.length>0 && useCartStore.$state.cart_is_loading==false && useCartStore.$state.cart_network_error==false"
                        class="font-Roboto w-full flex-col flex gap-1 justify-center "
                        >
                        <!-- the product holder -->
                        <div
                        class="w-full h-[23em] mt-2 overflow-y-auto pt-11 pb-1 flex flex-col gap-1 justify-center"
                        >
                            <div
                            v-for="cart in useCartStore.carts"
                            :key="cart._id"
                            class="w-full h-fit rounded-lg bg-gray-50"
                            >
                                <CartCard :cart="cart" @confirm_deleting_cart_item="handleConfirmationDeletingCart"/>
                            </div>
                        </div>
                        <!-- the pagination links -->
                        <div class="w-full h-fit flex justify-center items-center">
                            <ShareblePagination
                            :initial-page="parseToNumber(useCartStore.$state.carts_current_page)"
                            :total-pages="parseToNumber(useCartStore.$state.carts_total_pages)"
                            :page-limit="3"
                            :small-mode="true"
                            @change_page="handleCartChangePage"
                            />
                        </div>
                    </div>
                    <!-- the animation -->
                    <div
                    class="w-full h-[23em] mt-2 overflow-y-auto flex flex-col gap-1 justify-center"
                    v-else-if="useCartStore.$state.cart_is_loading==true">
                        <AnimationsUsercarts/>
                    </div>
                    <!-- the empty one -->
                    <div
                    class="w-full h-fit flex items-center justify-center"
                    v-else-if="useCartStore.$state.carts.length==0 && useCartStore.$state.cart_is_loading==false&& useCartStore.$state.cart_network_error==false">
                        <SharebleEmpty :message="empty_cart_message_controller" :cart-mode="true" />
                    </div>
                    <!-- the network error -->
                    <div v-else-if="useCartStore.$state.cart_network_error==true">
                        <NetworkError @reload="handleReload" />
                    </div>
                </div>
            </div>  
            <!-- the lower one -->
            <div class="w-full h-1/3 border p-2 border-gray-300 rounded-xl">
                <!-- the title -->
                <div class="w-full py-1 px-2 border-b border-gray-300 font-Roboto font-bold text-xl text-gray-700 capitalize">
                    Service and delivery options
                </div>
                <!-- the body -->
                <div>
                    
                </div>
            </div>
        </div>
        <!-- the right one -->
        <div class="w-1/3 h-full border p-2 border-gray-300 rounded-xl">
            <!-- the title  -->
            <div class="w-full py-1 px-2 border-b border-gray-300 font-Roboto font-bold text-xl text-gray-700 capitalize">
                Summery
            </div>
            <!-- the body -->
            <div class="w-full h-full flex flex-col gap-2 items-center justify-center">
                <!-- the check out container -->
                <div class="w-full h-fit flex flex-col gap-4">
                    <!-- the final result -->
                    <div class="w-full flex gap-2 items-center font-Roboto">
                        <span class="font-bold">Total<sub>(excluding deliver)</sub>:</span><span>{{ useCartStore.computed_total_cart_price }}$USD</span>
                    </div>
                    <!-- the check out button -->
                    <div class="w-full flex items-center justify-center">
                        <button
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        class="w-full py-1 px-3 bg-primary rounded-md text-white font-bold text-sm font-Roboto "
                        @click="handleCheckOut"
                        :disabled="useCartStore.computed_total_cart_price==0"
                        >
                            <div class="w-full flex justify-center items-center capitalize gap-1" v-if="!checkout_controller">
                                <span><i></i></span><span>Check out</span>
                            </div>
                            <div class="w-full flex justify-center items-center" v-if="checkout_controller">
                                <Loading/>
                            </div>
                        </button>
                    </div>
                    <!-- the bank cards -->
                    <div class="w-full h-12 grid grid-cols-4 items-center">
                        <div class="w-full h-full rounded-md overflow-hidden cursor-pointer">
                            <img src="../../assets/images/chapa2.jpeg" class="w-full h-full object-cover" alt="">
                        </div>
                        <div class="w-full h-full rounded-md overflow-hidden cursor-pointer">
                            <img src="../../assets/images/teleber.svg" class="w-full h-full object-cover" alt="">
                        </div>
                        <div class="w-full h-full rounded-md overflow-hidden cursor-pointer">
                            <img src="../../assets/images/addis bank.jpeg" class="w-full h-full object-cover" alt="">
                        </div>
                        <div class="w-full h-full rounded-md overflow-hidden cursor-pointer">
                            <img src="../../assets/images/awash bank.png" class="w-full h-full object-cover" alt="">
                        </div>
                    </div>
                </div>
                <!-- the related results -->
                <div class="w-full h-3/4 flex flex-col gap-1 mt-2">
                    <!-- the title -->
                    <div class="w-full py-1 px-2 border-b border-gray-300 font-Roboto font-bold text-xl text-gray-700 capitalize">
                        favorite products:
                    </div>
                    <!-- the body -->
                    <div 
                    class="w-full h-full flex flex-col gap-1 items-center justify-center" 
                    v-if="useCartStore.$state.favorite_products.length>0 && useCartStore.$state.is_favorite_product_loading==false && useCartStore.$state.favorite_product_network_error==false">
                        <!-- this is first carosel container -->
                        <div
                        id="firstFavoriteProductContainer"
                        class="w-full h-full relative overflow-hidden after:clear-both after:block after:content-['']"
                        data-te-carousel-init 
                        data-te-carousel-slide
                        > 
                            <!-- the products -->
                            <div
                            class="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                            data-te-carousel-item 
                            v-for="(product,index) in useCartStore.$state.favorite_products"
                            :key="product._id"
                            :data-te-carousel-active="index==1" 
                            style="backface-visibility: hidden"
                            >
                                <!-- the data holder -->
                                <div
                                class="w-full flex flex-col gap-1 justify-center"
                                >
                                    <!-- the image -->
                                    <div
                                    class="w-full h-[15em] flex justify-center items-center rounded-md overflow-hidden"
                                    >
                                        <img :src="product.product_id.image" class="w-full h-full object-cover" :alt="product.product_id.name">
                                    </div>
                                    <!-- the product name -->
                                    <div class="font-Roboto font-bold flex flex-col gap-0 capitalize text-gray-800 text-xl">
                                        <div>
                                            {{ product.product_id.name }}
                                        </div>
                                        <div class="text-xs font-light">
                                            {{ product.product_id.catagory.name }}
                                        </div>
                                    </div>
                                    <!-- the description -->
                                    <div class="font-gray-700 font-Roboto first-letter:capitalize first-letter:text-xl text-sm">
                                        {{ product.product_id.description }}
                                    </div>
                                    <!-- the rating -->
                                    <div>
                                        <SharebleFiveStartRating :rating-value="product.product_id.average_rating" />
                                    </div>
                                </div>
                            </div>

                            <!-- the absolute buttons -->
                                <button
                                class="absolute top-0 bottom-0 left-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
                                type="button" data-te-target="#firstFavoriteProductContainer" 
                                data-te-slide="prev">
                                <span class="inline-block h-8 w-8">
                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"
                                    class="text-neutral-600 dark:text-neutral-300">
                                    <path fill="currentColor"
                                    d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                                </svg>
                                </span>
                                <span
                                class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Previous</span>
                            </button>
                            <!-- the other one -->
                            <button
                            class="absolute top-0 bottom-0 right-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
                            type="button" data-te-target="#firstFavoriteProductContainer" data-te-slide="next">
                            <span class="inline-block h-8 w-8">
                            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"
                                class="text-neutral-600 dark:text-neutral-300">
                                <path fill="currentColor"
                                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                            </span>
                            <span
                            class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Next</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Teleport to="body">
        <SharebleConfirmationModal
        :identifier="forCartDeleteConfirmation.identifyer"
        :title="forCartDeleteConfirmation.title"
        :message="forCartDeleteConfirmation.message"
        @confirmation-result="handleDeleteCartItemConfirmationResult"
        />
    </Teleport>
</template>