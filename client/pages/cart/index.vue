<script setup>
import{Ripple,initTE,Carousel} from 'tw-elements'
import {useToast} from 'vue-toastification'


const toast=useToast()

const useCartStore=cartStore()
const useOrderStore=orderStore()
const empty_cart_message_controller=ref("Oops Your cart is empty")
const checkout_controller=ref(false)

onMounted(async()=>{
    useCartStore.resetLogedUsersCartCount()
    initTE({
        Ripple,
        Carousel
    })
    if(useOrderStore.$state.the_initialized_user_order.length>0){
        await useOrderStore.complteOrderPayment(useOrderStore.$state.the_initialized_user_order[0]._id)
    }
    await useCartStore.fetchAllCarts('')
    await useCartStore.fetchFavoriteProducts()
    await useCartStore.fetchFavoriteProductCatagorys()
})


const handleCheckOut=async()=>{
    checkout_controller.value=!checkout_controller.value
    const result=await useOrderStore.initializeOrder()
    if(result==true){
        const paymentUri=useOrderStore.$state.initializing_order_payment_url
        if(paymentUri){
            useOrderStore.resetOrderPaymentUri()
            checkout_controller.value=!checkout_controller.value
            window.location.href=paymentUri
        }else{
            checkout_controller.value=!checkout_controller.value
            toast.error('There is error in payment uri',{
                position:'bottom-right'
            })
        }
    }else{
        checkout_controller.value=!checkout_controller.value
        if(useOrderStore.$state.error_message){
            toast.error(useOrderStore.$state.error_message,{
                position:'bottom-right'
            })
        }else{
            toast.error("Unable to initialize payment due to some errors!",{
                position:'bottom-right'
            })
        }
    }
}


const handleReload=async()=>{
        useCartStore.resetCartsNetworkError()
       await useCartStore.fetchAllCarts('')
}
const handleFavoriteProductReload=async()=>{
    useCartStore.resetFavoriteProductsNetworkError()
    await useCartStore.fetchFavoriteProducts()
}

const handleFavoriteProductCataogryReload=async()=>{
    useCartStore.resetFavoriteProductCatagoryNetworkError()
    await useCartStore.fetchFavoriteProductCatagorys()
}

const handleFavoriteProductDescription=(description)=>{
    if(description.length>70){
        return description.substring(0,70)+'...'
    }else{
        return description +'...'
    }
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
    forCartDeleteConfirmation.value.title=`Deleting ${cart.product.name} from cart`
    forCartDeleteConfirmation.value.message= `Are you shure you want to delete ${cart.product.name} from you cart?.`
}

const handleDeleteCartItemConfirmationResult=async(result)=>{
    if(result.confirmation_result==true){
        const response=await useCartStore.removeCartItemFromCart(result.identifier._id)
        if(response==true){
            if(useCartStore.$state.carts_total_pages!=1 && !(useCartStore.$state.carts_total_pages<1)){
            useCartStore.setCartsCurrentPage(useCartStore.$state.carts_total_pages-1)
            await useCartStore.fetchAllCarts('')
            }
            const successMessage=`You remove ${result.identifier.product.name} from your cart successfully!`
            toast.success(successMessage,{
                position:'top-left'
            })
        }else if(response==false){
            const failureMessage=`Unable to remove ${result.identifier.product.name} from your cart!`
            toast.error(failureMessage,{
                position:'bottom-left'
            })
        }
    }
}
const router=useRouter()

const handleGoToProduct=(id)=>{
    toast.clear()
    router.push(`/product/${id}`)
}
</script>

<template>
    <Head>
        <Title>
            C5 Online Caffe | User | Cart
        </Title>
        <Meta name="description" content="This is for Loged user who can access its account carts and can purchase them as he likes based on the c5 caffe preference and rules" />
    </Head>
    <div class="w-full md:h-fit lg:h-screen py-5 px-2 flex flex-col lg:flex-row gap-3 lg:items-center">
        <!-- the left one -->
        <div class="w-full lg:w-2/3 h-full flex flex-col md:flex-row lg:flex-col gap-3">
            <!-- the upper one -->
            <div class=" md:w-2/3 lg:w-full h-2/3 p-2 border border-gray-300 rounded-xl">
                <!-- the title -->
                <div class="w-full py-1 px-2 border-b border-gray-300 font-Roboto font-bold text-xl text-gray-700 capitalize">
                    {{ $t("cart items") }}
                </div>
                <!-- the body -->
                <div class="w-full flex flex-col gap-1 justify-center px-3">
                    <!-- the cart container -->
                    <div v-if="useCartStore.$state.carts.length>0 && useCartStore.$state.cart_is_loading==false && useCartStore.$state.cart_network_error==false"
                        class="font-Roboto w-full flex-col flex gap-1 justify-center "
                        >
                        <!-- the product holder -->
                        <div
                        class="w-full md:h-fit lg:h-[23em] mt-2 overflow-y-auto pt-11 pb-1 flex flex-col gap-1 justify-center"
                        >
                            <div
                            v-for="cart in useCartStore.$state.carts"
                            :key="cart._id"
                            class="w-fit lg:w-full h-fit rounded-lg bg-gray-50"
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
            <div class="w-full h-1/3 border p-2 border-gray-300 font-Roboto rounded-xl">
                <!-- the title -->
                <div class="w-full py-1 px-2 border-b border-gray-300 font-Roboto font-bold text-xl text-gray-700 capitalize">
                    {{ $t('service and delivery options') }}
                </div>
                <!-- the body -->
                <div class="w-full flex flex-col gap-1 justify-center">
                    <!-- card one -->
                    <div class="w-full flex items-center justify-between py-3 px-3">
                        <!-- the left -->
                        <div class="flex items-center gap-1">
                            <!-- the icon -->
                            <div class="text-3xl text-gray-700">
                                <i class="fa-solid fa-laptop-code"></i>
                            </div>
                            <!-- the description -->
                            <div class="text-gray-800 first-letter:capitalize first-letter:2xl font-light">
                                {{ $t('click and collect') }}
                            </div>
                        </div>
                        <!-- the right -->
                        <div class="text-gray-800 uppercase font-light text-xl">
                            {{ $t('free') }}
                        </div>
                    </div>
                    <!-- card two -->
                    <div class="w-full flex items-center justify-between py-3 px-3">
                        <!-- the left -->
                        <div class="flex items-center gap-1">
                            <!-- the icon -->
                            <div class="text-3xl text-gray-700">
                                <i class="fa-solid fa-truck"></i>
                            </div>
                            <!-- the description -->
                            <div class="text-gray-800 first-letter:capitalize first-letter:2xl font-light">
                                {{ $t("standard delivery") }}
                            </div>
                        </div>
                        <!-- the right -->
                        <div class="text-gray-800 uppercase font-light text-xl">
                            25$
                        </div>
                    </div>

                    <!-- the last card -->
                    <div class="w-full flex items-center justify-between py-3 px-3">
                        <!-- the left -->
                        <div class="flex items-center gap-1">
                            <!-- the icon -->
                            <div class="text-3xl text-gray-700">
                                <i class="fa-solid fa-truck-fast"></i>
                            </div>
                            <!-- the description -->
                            <div class="text-gray-800 first-letter:capitalize first-letter:2xl font-light">
                                {{ $t('standard and quick delivery') }}
                            </div>
                        </div>
                        <!-- the right -->
                        <div class="text-gray-800 uppercase font-light text-xl">
                            50$
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- the right one -->
        <div class="w-full md:w-fit lg:w-1/3 h-full border p-2 border-gray-300 rounded-xl">
            <!-- the title  -->
            <div class="w-full py-1 px-2 border-b border-gray-300 font-Roboto font-bold text-xl text-gray-700 capitalize">
                {{ $t("summery") }}
            </div>
            <!-- the body -->
            <div class="w-full h-full flex flex-col gap-2 items-center justify-center">
                <!-- the check out container -->
                <div class="w-full h-fit flex flex-col gap-4">
                    <!-- the final result -->
                    <div class="w-full flex gap-2 items-center font-Roboto">
                        <span class="font-bold">{{ $t('total') }}<sub>({{ $t('excluding') }} {{ $t('delivery') }})</sub>:</span><span>{{ useCartStore.computed_total_cart_price }}$USD</span>
                    </div>
                    <!-- the check out button -->
                    <div class="w-full flex items-center justify-center">
                        <button
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        class="w-full py-2 px-3 bg-primary rounded-md text-white font-bold text-sm font-Roboto "
                        @click="handleCheckOut"
                        :disabled="useCartStore.computed_total_cart_price==0"
                        >
                            <div class="w-full flex justify-center items-center capitalize gap-1" v-if="!checkout_controller">
                                <span><i></i></span><span>{{ $t('check out') }}</span>
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
                    <!-- the product -->
                    <div
                    class="w-full flex flex-col gap-1"
                    >
                        <!-- the title -->
                        <div class="w-full py-1 px-2 border-b border-gray-300 font-Roboto font-bold text-xl text-gray-700 capitalize">
                            {{ $t("favorite") }} {{ $t('products') }}:
                        </div>
                        <!-- the body -->
                        <div 
                        class="w-full h-full flex flex-col gap-1 items-center" 
                        v-if="useCartStore.$state.favorite_products.length>0 && useCartStore.$state.is_favorite_product_loading==false && useCartStore.$state.favorite_product_network_error==false">
                            <!-- this is first carosel container -->
                            <div
                            id="favoriteProductsCarousel"
                            class="relative w-full h-fit"
                            data-te-carousel-init
                            data-te-ride="carousel"
                            >
                                <!-- the carousel items -->
                                <div
                                class="relative w-full overflow-hidden after:clear-both after:block after:content-['']"
                                >
                                    <!-- the first item -->
                                    <div
                                    v-if="useCartStore.$state.favorite_products[0]"
                                    class="relative float-left px-1 -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                                    data-te-carousel-active
                                    data-te-carousel-item
                                    style="backface-visibility: hidden"
                                    >
                                        <!-- the image -->
                                        <div
                                        class="w-full h-[7em] rounded-md overflow-hidden flex items-center justify-center"
                                        >
                                            <img @click.self="handleGoToProduct(useCartStore.$state.favorite_products[0].product_id._id)" :src="useCartStore.$state.favorite_products[0].product_id.image" class="w-full cursor-pointer h-full object-cover" :alt="useCartStore.$state.favorite_products[0].product_id.name">
                                        </div>
                                        <!-- the name -->
                                        <div
                                        class="flex flex-col gap-0 mt-1 justify-center font-Roboto"
                                        >
                                            <!-- the name -->
                                            <div
                                            class="text-xl font-bold first-letter:capitalize hover:underline cursor-pointer"
                                            @click="handleGoToProduct(useCartStore.$state.favorite_products[0].product_id._id)"
                                            >
                                                {{ useCartStore.$state.favorite_products[0].product_id.name }}
                                            </div>
                                            <!-- the catagory -->
                                            <div class=" first-letter:capitalize text-secondary text-xs -mt-1">
                                                {{ useCartStore.$state.favorite_products[0].product_id.catagory.catagory }}
                                            </div>
                                        </div>
                                        <!-- the description -->
                                        <div
                                        class="text-sm text-gray-800 first-letter:capitalize cursor-pointer first-letter:text-lg hover:underline"
                                        @click="handleGoToProduct(useCartStore.$state.favorite_products[0].product_id._id)"
                                        >
                                            {{handleFavoriteProductDescription(useCartStore.$state.favorite_products[0].product_id.description) }}
                                        </div>
                                        <!-- the five star rating -->
                                        <div
                                        class="mt-1"
                                        >
                                            <SharebleFiveStartRating :rating-value="useCartStore.$state.favorite_products[0].product_id.average_rating" />
                                        </div>
                                    </div>
                                    <!-- the other items -->
                                    <div
                                    v-if="useCartStore.$state.favorite_products[1]"
                                    class="relative float-left px-1 -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                                    data-te-carousel-item
                                    style="backface-visibility: hidden"
                                    v-for="product in useCartStore.$state.favorite_products"
                                    :key="product._id"
                                    >
                                        <!-- the image -->
                                        <div
                                        class="w-full h-[7em] rounded-md overflow-hidden flex items-center justify-center"
                                        >
                                            <img :src="product.product_id.image" @click.self="handleGoToProduct(product.product_id._id)" class="w-full cursor-pointer h-full object-cover" :alt="product.product_id.name">
                                        </div>
                                        <!-- the name -->
                                        <div
                                        class="flex flex-col gap-0 mt-1 justify-center font-Roboto"
                                        >
                                            <!-- the name -->
                                            <div
                                            class="text-xl font-bold first-letter:capitalize hover:underline cursor-pointer"
                                            @click="handleGoToProduct(product.product_id._id)"
                                            >
                                                {{ product.product_id.name }}
                                            </div>
                                            <!-- the catagory -->
                                            <div class=" first-letter:capitalize text-secondary text-xs -mt-1">
                                                {{ product.product_id.catagory.catagory }}
                                            </div>
                                        </div>
                                        <!-- the description -->
                                        <div
                                        class="text-sm text-gray-800 first-letter:capitalize cursor-pointer first-letter:text-lg hover:underline"
                                        @click="handleGoToProduct(product.product_id._id)"
                                        >
                                            {{ handleFavoriteProductDescription(product.product_id.description) }}
                                        </div>
                                        <!-- the five star rating -->
                                        <div>
                                            <SharebleFiveStartRating :rating-value="product.product_id.average_rating" />
                                        </div>
                                    </div>
                                </div>
                                <!--Carousel controls - prev item-->
                                <button
                                    class="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
                                    type="button"
                                    data-te-target="#favoriteProductsCarousel"
                                    data-te-slide="prev">
                                    <span class="inline-block h-8 w-8">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="h-6 w-6">
                                        <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M15.75 19.5L8.25 12l7.5-7.5" />
                                    </svg>
                                    </span>
                                    <span
                                    class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                                    >Previous</span
                                    >
                                </button>
                                <!--Carousel controls - next item-->
                                <button
                                    class="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
                                    type="button"
                                    data-te-target="#favoriteProductsCarousel"
                                    data-te-slide="next">
                                    <span class="inline-block h-8 w-8">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="h-6 w-6">
                                        <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                    </svg>
                                    </span>
                                    <span
                                    class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                                    >Next</span
                                    >
                                </button>
                            </div>
                            <div
                            >

                            </div>
                        </div>
                        <!-- the loading -->
                        <div
                        v-else-if="useCartStore.$state.is_favorite_product_loading==true && useCartStore.$state.favorite_product_network_error==false"
                        >
                            <AnimationsFavoriteItem/>
                        </div>
                        <!-- the empty -->
                        <div class="w-full flex items-center justify-center" v-else-if="useCartStore.$state.is_favorite_product_loading==false && useCartStore.$state.favorite_products.length==0 && useCartStore.$state.favorite_product_network_error==false">
                            <SharebleEmpty :small-mode="true" message="Oops there is no rated product by you yet!"/>
                        </div>
                        <!-- the network error -->
                        <div
                        class="w-full flex flex-col items-center justify-center"
                        v-else-if="useCartStore.$state.favorite_product_network_error==true"
                        >
                            <NetworkError :small-mode="true" @reload="handleFavoriteProductReload" />
                        </div>
                    </div>
                    <!-- the catagory -->
                    <div
                    class="w-full flex flex-col overflow-y-auto gap-1"
                    >
                        <!-- the title -->
                        <div class="w-full py-1 px-2 border-b border-gray-300 font-Roboto font-bold text-xl text-gray-700 capitalize">
                            {{ $t("favorite") }} {{ $t('product catagorys') }}:
                        </div>
                        <!-- the body -->
                        <div
                        class="w-full flex flex-wrap gap-1 mt-1"
                        v-if="useCartStore.$state.favorite_product_catagorys.length>0 && useCartStore.$state.is_favorite_product_catagorys_loading==false && useCartStore.$state.favorite_product_catagorys_network_error==false"
                        >
                            <div
                            v-for="catagory_rate in useCartStore.$state.favorite_product_catagorys"
                            :key="catagory_rate._id"
                            class="w-fit px-1 py-1 flex flex-col gap-0 justify-center"
                            >
                                <!-- the name -->
                                <div class="w-fit font-Roboto text-xs px-2 py-[1px] rounded-full bg-green-500 text-white capitalize">
                                    {{ catagory_rate.product_catagory_id.catagory }}
                                </div>
                                <!-- the rating -->
                                <SharebleFiveStartRating :rating-value="parseToNumber(catagory_rate.product_catagory_id.average_rating)" />
                            </div>
                        </div>
                        <!-- the animation -->
                        <div
                        v-else-if="useCartStore.$state.is_favorite_product_catagorys_loading==true && useCartStore.$state.favorite_product_catagorys_network_error==false"
                        class="w-full flex flex-wrap gap-1 mt-1"
                        >
                            <AnimationsFavoriteproductcatagorys/>
                        </div>
                        <!-- the empty -->
                        <div
                        class="w-full flex flex-col gap-0 items-center justify-center"
                        v-else-if="useCartStore.$state.is_favorite_product_catagorys_loading==false && useCartStore.$state.favorite_product_catagorys.length==0 && useCartStore.$state.favorite_product_catagorys_network_error==false"
                        >   
                            <SharebleEmpty :small-mode="true" message="Oops there is no product catagory rated by you yet!" />
                        </div>
                        <!-- the network error -->
                        <div
                        class="w-full flex flex-col items-center"
                        v-else-if="useCartStore.$state.favorite_product_catagorys_network_error==true"
                        >
                          <NetworkError :small-mode="true" @reload="handleFavoriteProductCataogryReload" />
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