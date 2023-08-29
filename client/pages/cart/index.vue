<script setup>


const useCartStore=cartStore()
const empty_cart_message_controller=ref("Oops Your cart is empty")

onMounted(async()=>{
    useCartStore.resetLogedUsersCartCount()
    await useCartStore.fetchAllCarts('')
})

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
                        class="font-Roboto w-full flex gap-1 justify-center "
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
            <div>

            </div>
        </div>
    </div>
</template>