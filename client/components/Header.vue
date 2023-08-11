<script setup>
import {Collapse, Dropdown,Ripple, initTE} from 'tw-elements'


onMounted(()=>{
    initTE({
        Collapse,
        Dropdown,
        Ripple
    })
})

const changeDirection=ref(false)
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

const handleMenuClic=()=>{
    changeDirection.value=!changeDirection.value
}
</script>
<template>
    <header class=" hidden sm:flex px-4 py-1 sticky top-0 right-0 left-0 z-10 shadow-sm  items-center justify-center">
        <Logo @click="handleRedirect"/>
        <Infobar/>
        <!-- the navigation and the login and signup button -->
        <div class="w-fit px-5 ml-auto flex items-center justify-center gap-10 mt-10">
            <!-- the nav -->
            <nav class="font-Roboto">
                <ul class="flex items-center justify-center px-2 gap-4 uppercase relative">
                    <li class="h-10">
                        <nuxt-link to="/" class="pb-3 px-1 text-xs md:text-lg">Home</nuxt-link>
                    </li>
                    <li class="h-10">
                        <button class="pb-3 text-xs md:text-lg  px-1 uppercase flex items-center justify-center gap-1"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        type="button"
                        id="dropdownMenuButtonX"
                        data-te-dropdown-toggle-ref
                        aria-expanded="false"
                        data-te-nav-link-ref
                        @click="handleMenuClic"
                        >Menu <span><i class="fa fa-angle-right transition duration-150 ease-out" :class="{'rotate-90':changeDirection}"></i></span></button>
                        <!-- the absolute menu -->
                        <div class="absolute left-0 pt-3 -right-20 top-full z-[1000] mt-0 hidden w-full border-none bg-white bg-clip-padding text-neutral-600 shadow-md dark:bg-neutral-700 dark:text-neutral-200 [&[data-te-dropdown-show]]:block"
                        aria-labelledby="dropdownMenuButtonX"
                        data-te-dropdown-menu-ref
                        >
                            <!-- element holder -->
                            <div class="px-3 py-3 flex flex-col font-Roboto text-sm gap-3 w-fit capitalize">
                                <a href="#"
                                class="dropLink hover:text-secondary hover:border-b-secondary"
                                aria-current="true"
                                >
                                <span>
                                    <i class="fas fa-money-check-alt"></i>
                                </span>
                                Payment
                                </a>
                                <a href="#"
                                aria-current="true"
                                class="dropLink hover:text-secondary hover:border-b-secondary"
                                >
                                <span>
                                    <i class="fas fa-shipping-fast"></i>
                                </span>
                                Delivery
                                </a>
                                <a href="#"
                                aria-current="true"
                                class="dropLink hover:text-secondary hover:border-b-secondary"
                                >
                                <span>
                                    <i class="fas fa-user-secret"></i>
                                </span>
                                Privacy Policy
                                </a>
                                <a href="#"
                                aria-current="true"
                                class="dropLink hover:text-secondary hover:border-b-secondary"
                                >
                                <span>
                                    <i class="fas fa-building"></i>
                                </span>
                                Company Policy
                                </a>
                            </div>
                        </div>
                    </li>
                    <li class="h-10">
                        <nuxt-link to="/product" class="pb-3 px-1 text-xs md:text-lg">Products</nuxt-link>
                    </li>
                    <li class="h-10">
                        <nuxt-link to="/about" class="pb-3 px-1 text-xs md:text-lg">About Us</nuxt-link>
                    </li>
                    <li class="h-10">
                        <nuxt-link to="/contact" class="pb-3 px-1 text-xs md:text-lg">Contact Us</nuxt-link>
                    </li>
                </ul>
            </nav>
            <!-- the cart icon -->
            <Cart/>
            <!-- the buttons -->
            <div class="flex items-center justify-center gap-3 my-auto mb-3">
                <button data-te-ripple-init  data-te-ripple-color="rgb(167, 165, 165)" class="text-sm md:text-xl font-light px-2 py-1 rounded-md transition duration-200 hover:shadow-md hover:bg-gray-100 " @click="handleToLogin">LOGIN</button>
                <span>
                    <i class="fa fa-angle-right"></i>
                </span>
                <button data-te-ripple-init data-te-ripple-color="rgb(167, 165, 165)" class="text-sm md:text-xl font-light px-2 py-1 rounded-md duration-200 hover:shadow-md hover:bg-gray-100 " @click="handleToSignup">SIGNUP</button>
            </div>
        </div>
    </header>
</template>