<script setup>
import {Ripple, initTE} from 'tw-elements'


onMounted(()=>{
    initTE({
        Ripple
    })
})
const router=useRouter()   
const handleRedirect=()=>{
    router.push('/')
}
const handleToSignup=()=>{
    setTimeout(() => {
        router.push('/auth/signup')
    }, 500);
}
const handleToLogin=()=>{
    setTimeout(() => {
        router.push('/auth/login')
    }, 500);
}
</script>
<template>
    <header class="px-4 py-1 sticky top-0 right-0 left-0 z-10 shadow-sm flex items-center justify-center">
        <Logo @click="handleRedirect"/>
        <Infobar/>
        <!-- the navigation and the login and signup button -->
        <div class="w-fit px-5 ml-auto flex items-center justify-center gap-10 mt-10">
            <!-- the nav -->
            <nav class="font-Roboto">
                <ul class="flex items-center justify-center px-2 gap-4 uppercase">
                    <li class="h-10">
                        <nuxt-link to="/" class="pb-3 px-1">Home</nuxt-link>
                    </li>
                    <li class="h-10">
                        <button class="pb-3  px-1 uppercase flex items-center justify-center gap-1">Menu <span><i class="fa fa-angle-right"></i></span></button>
                        <!-- the absolute menu -->
                        <div>

                        </div>
                    </li>
                    <li class="h-10">
                        <nuxt-link to="/product" class="pb-3 px-1">Products</nuxt-link>
                    </li>
                    <li class="h-10">
                        <nuxt-link to="/about" class="pb-3 px-1">About Us</nuxt-link>
                    </li>
                    <li class="h-10">
                        <nuxt-link to="/contact" class="pb-3 px-1">Contact Us</nuxt-link>
                    </li>
                </ul>
            </nav>
            <!-- the buttons -->
            <div class="flex items-center justify-center gap-3 my-auto mb-3">
                <button data-te-ripple-init  data-te-ripple-color="rgb(167, 165, 165)" class="text-xl font-light px-2 py-1 rounded-md transition duration-200 hover:shadow-md hover:bg-gray-100 " @click="handleToLogin">LOGIN</button>
                <span>
                    <i class="fa fa-angle-right"></i>
                </span>
                <button data-te-ripple-init data-te-ripple-color="rgb(167, 165, 165)" class="text-xl font-light px-2 py-1 rounded-md duration-200 hover:shadow-md hover:bg-gray-100 " @click="handleToSignup">SIGNUP</button>
            </div>
        </div>
    </header>
</template>