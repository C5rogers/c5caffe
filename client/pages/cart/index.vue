<script setup>
import{Ripple,initTE} from 'tw-elements'

const useCartStore=cartStore()
const empty_cart_message_controller=ref("Oops Your cart is empty")
const checkout_controller=ref(false)

onMounted(async()=>{
    useCartStore.resetLogedUsersCartCount()
    initTE({
        Ripple
    })
    await useCartStore.fetchAllCarts('')
})


const handleCheckOut=()=>{
    checkout_controller.value=!checkout_controller.value
}


const handleReload=async()=>{
        useCartStore.resetCartsNetworkError()
       await useCartStore.fetchAllCarts('')
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
                                <CartCard :cart="cart"/>
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
                    <div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>