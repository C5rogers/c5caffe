<script setup>
import {storeToRefs} from 'pinia'

const useCartStore=cartStore()
const useAuthStore=authStore()
const {total_users_cart_count,loged_users_cart_count}=storeToRefs(useCartStore)

const router=useRouter()
const number=ref(0)
const handleClick=()=>{
    router.push('/cart')
}
</script>
<template>
    <div>
       <button class="relative w-5 h-5 md:w-10 md:h-10 overflow-visible rounded-md transition duration-200 hover:shadow-md" @click="handleClick" >
            <i class="fa-solid fa-cart-plus text-2xl"></i>
            <!-- the counter -->
            <div class="absolute w-3 h-3 text-xs md:text-lg md:w-7 md:h-7 overflow-hidden flex items-center justify-center p-2 rounded-full -top-1 md:-top-2 -right-3 z-10" :class="{'bg-gray-300':total_users_cart_count==0},{'bg-secondary text-white': total_users_cart_count!=0}" v-if="useAuthStore.$state.isAuthed==false">
                {{ total_users_cart_count }}
            </div>
            <div 
            class="absolute w-3 h-3 text-xs md:text-lg md:w-7 md:h-7 overflow-hidden flex items-center justify-center p-2 rounded-full -top-1 md:-top-2 -right-3 z-10" :class="{'bg-gray-300':loged_users_cart_count==0},{'bg-secondary text-white': loged_users_cart_count!=0}"
            v-else-if="useAuthStore.$state.isAuthed==true">
                {{ loged_users_cart_count }}
            </div>
       </button>
    </div>
</template>