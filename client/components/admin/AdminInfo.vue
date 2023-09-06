<script setup>
import { useToast } from 'vue-toastification'


const toast=useToast()
const useAuthStore=authStore()
const useCartStore=cartStore()

const handleLogOut=async()=>{
    await useAuthStore.logout()
    useCartStore.resetUserCart()
    toast.info("You loged out successfully!",{
        position:'bottom-left'
    })
    router.push('/')
}

</script>

<template>
    <div
    class="w-28 px-3 py-3 flex flex-col font-Roboto text-sm gap-3 capitalize"
    >
        <a href="#"
        aria-current="true"
        class="dropLink w-full hover:text-secondary hover:border-b-secondary"
        >
            <span><i class="fa fa-cog" aria-hidden="true"></i></span><span>Profile</span>
        </a>
        <button @click="handleLogOut" class="flex w-full items-center justify-center gap-1 py-1 rounded-full bg-red-500 text-white"><span><i class="fa fa-sign-out" aria-hidden="true"></i></span><span>{{ $t('logout') }}</span></button>
    </div>
</template>