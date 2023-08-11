<script setup>
import {Collapse,Sidenav, Dropdown,Ripple, initTE} from 'tw-elements'


onMounted(()=>{
    initTE({
        Collapse,
        Dropdown,
        Sidenav,
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

const togleNavBar=()=>{
   
}
</script>
<template>
    <!-- the normal header -->
    <header class=" hidden sm:flex px-4 py-1 sticky top-0 right-0 left-0 z-10 shadow-sm  items-center justify-center">
        <Logo @click="handleRedirect"/>
        <Infobar/>
        <!-- the navigation and the login and signup button -->
        <div class="w-fit px-5 ml-auto flex items-center justify-center gap-4 md:gap-10 mt-10">
            <!-- the nav -->
            <nav class="font-Roboto">
                <ul class="flex items-center justify-center px-2 gap-1 md:gap-4 uppercase relative">
                    <li class="h-10">
                        <nuxt-link to="/" class="pb-3 px-1 text-xs md:text-lg">Home</nuxt-link>
                    </li>
                    <li class="h-10">
                        <button class=" mt-1 md:mt-0 md:pb-3 text-xs md:text-lg  px-1 uppercase flex items-center justify-center gap-1"
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
    <!-- the small scrine header -->
    <header class="sm:hidden px-4 py-3 sticky top-0 right-0 left-0 z-10 shadow-sm  items-center justify-center">
       
        <!-- the contaent container -->
        <div class="w-full flex items-center justify-between ">
            <!-- the left one -->
            <div class="w-fit flex items-center gap-2">
                <!-- the menu button -->
                <button 
                data-te-sidenav-toggle-ref
                data-te-target="#sidenav-2"
                aria-controls="#sidenav-2"
                aria-haspopup="true"
                @click="togleNavBar"
                >
                    <i class="fa-solid fa-bars"></i>
                </button>
                <!-- the logo -->
                <Logo @click="handleRedirect"/>
            </div>
            <!-- the right one -->
            <div class="flex items-center gap-4">
                <!-- the cart icon -->
                <Cart/>
                <div>
                    <button data-te-ripple-init  data-te-ripple-color="rgb(167, 165, 165)" class="text-sm md:text-xl font-light px-2 py-1 rounded-md transition duration-200 hover:shadow-md hover:bg-gray-100 " @click="handleToLogin">LOGIN</button>
                        <span>
                            <i class="fa fa-angle-right"></i>
                        </span>
                    <button data-te-ripple-init data-te-ripple-color="rgb(167, 165, 165)" class="text-sm md:text-xl font-light px-2 py-1 rounded-md duration-200 hover:shadow-md hover:bg-gray-100 " @click="handleToSignup">SIGNUP</button>
                </div>
            </div>
        </div>
      <!-- the absolute one -->
      <div 
        id="sidenav-2"
        class="fixed left-0 top-0 z-[1035] py-10  px-4 h-screen w-60 -translate-x-full overflow-hidden bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] data-[te-sidenav-hidden='false']:translate-x-0 dark:bg-zinc-800"
        data-te-sidenav-init
        data-te-sidenav-hidden="false"
        data-te-sidenav-mode="side"
        data-te-sidenav-content="#content"
      >
        <ul class="relative m-0 list-none px-[0.2rem] flex flex-col gap-4 font-Roboto" data-te-sidenav-menu-ref>
            <li class="relative">
                <nuxt-link to="/" data-te-sidenav-link-ref class="flex items-center gap-4 w-full transition duration-150 hover:bg-secondary hover:text-white pl-2 py-1 rounded-sm">
                    <span>
                        <i class="fa fa-home" aria-hidden="true"></i>
                    </span>
                    <span>
                        HOME
                    </span>
                </nuxt-link>
            </li>
            <li>
                <button data-te-sidenav-link-ref class="flex items-center gap-4 w-full transition duration-150 hover:bg-secondary hover:text-white pl-2 py-1 rounded-sm">
                    <span>
                        <i class="fa-solid fa-bars"></i>
                    </span>
                    <span>
                        Menu 
                        <span><i class="fa fa-angle-right transition duration-150 ease-out" :class="{'rotate-90':changeDirection}"></i></span>
                    </span>
                </button>
            </li>
            <li>
                <nuxt-link to="/product" data-te-sidenav-link-ref class="flex items-center gap-4 w-full transition duration-150 hover:bg-secondary hover:text-white pl-2 py-1 rounded-sm">
                    <span>
                        <i class="fa fa-product-hunt" aria-hidden="true"></i>
                    </span>
                    <span>
                        Products
                    </span>
                </nuxt-link>
            </li>
            <li>
                <nuxt-link to="/about" data-te-sidenav-link-ref class="flex items-center gap-4 w-full transition duration-150 hover:bg-secondary hover:text-white pl-2 py-1 rounded-sm">
                    <span>
                        <i class="fa fa-info-circle" aria-hidden="true"></i>
                    </span>
                    <span>
                        About Us
                    </span>
                </nuxt-link>
            </li>
            <li>
                <nuxt-link to="/contact" data-te-sidenav-link-ref class="flex items-center gap-4 w-full transition duration-150 hover:bg-secondary hover:text-white pl-2 py-1 rounded-sm">
                    <span>
                        <i class="fa fa-address-book" aria-hidden="true"></i>
                    </span>
                    <span>
                        Contact Us
                    </span>
                </nuxt-link>
            </li>
        </ul>
      </div>
    </header>
</template>