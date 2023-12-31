<script setup>
import {Collapse,Sidenav, Dropdown,Ripple, initTE} from 'tw-elements'
import {useToast} from 'vue-toastification'
const toast=useToast()
import {storeToRefs} from 'pinia'

const useAuthStore=authStore()
const {isAuthed,user}=storeToRefs(useAuthStore)

onMounted(()=>{
    useAuthStore.loadUserInformation()
    initTE({
        Collapse,
        Dropdown,
        Sidenav,
        Ripple
    })
})

const changeSmallDirection=ref(false)
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
const handleSmallMenuClick=()=>{
    changeSmallDirection.value=!changeSmallDirection.value
}

const openNavBar=()=>{
    const sidebar=document.getElementById("sidenav-2")
    sidebar.classList.remove("-left-[500px]")
    sidebar.classList.add('left-0')
}
const closeNavBar=()=>{
    const sidebar=document.getElementById("sidenav-2")
    sidebar.classList.remove('left-0')
    sidebar.classList.add('-left-[500px]')
}

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
    <!-- the normal header -->
    <header id="theHeader" class=" hidden sm:flex px-4 py-1 pb-0 sticky top-0 right-0 left-0 z-10  items-center justify-center bg-white transition duration-200">
        <Logo @click="handleRedirect"/>
        <Infobar/>
        <!-- the navigation and the login and signup button -->
        <div class="w-fit px-5 ml-auto flex items-center justify-center gap-4 md:gap-10 mt-10">
            <!-- the nav -->
            <nav class="font-Roboto">
                <ul class="flex items-center -mb-1 justify-center px-2 gap-1 md:gap-4 uppercase relative">
                    <li class="h-10">
                        <nuxt-link to="/" class="pb-3 px-1 text-xs md:text-lg">{{ $t('home') }}</nuxt-link>
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
                        >{{ $t('service') }} <span><i class="fa fa-angle-right transition duration-150 ease-out" :class="{'rotate-90':changeDirection}"></i></span>
                    </button>
                        <!-- the absolute menu -->
                        <div class="absolute left-0 pt-3 right-20 top-full z-[1000] mt-0 hidden  border-none bg-white bg-clip-padding text-neutral-600 shadow-md dark:bg-neutral-700 dark:text-neutral-200 [&[data-te-dropdown-show]]:block"
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
                                    <i class="fa-brands fa-paypal"></i>
                                </span>
                                {{ $t('payment') }}
                                </a>
                                <a href="#"
                                aria-current="true"
                                class="dropLink hover:text-secondary hover:border-b-secondary"
                                >
                                <span>
                                    <i class="fas fa-shipping-fast"></i>
                                </span>
                                {{ $t('delivery') }}
                                </a>
                                <a href="#"
                                aria-current="true"
                                class="dropLink hover:text-secondary hover:border-b-secondary"
                                >
                                <span>
                                    <i class="fas fa-user-secret"></i>
                                </span>
                                {{ $t('privacy policy') }}
                                </a>
                                <a href="#"
                                aria-current="true"
                                class="dropLink hover:text-secondary hover:border-b-secondary"
                                >
                                <span>
                                    <i class="fas fa-building"></i>
                                </span>
                                {{ $t('company policy') }}
                                </a>
                            </div>
                        </div>
                    </li>
                    <li class="h-10">
                        <nuxt-link to="/product" class="pb-3 px-1 text-xs md:text-lg">{{ $t('products') }}</nuxt-link>
                    </li>
                    <li class="h-10">
                        <nuxt-link to="/about" class="pb-3 px-1 text-xs md:text-lg">{{ $t('about') }}</nuxt-link>
                    </li>
                    <li class="h-10">
                        <nuxt-link to="/contact" class="pb-3 px-1 text-xs md:text-lg">{{ $t('contact') }}</nuxt-link>
                    </li>
                </ul>
            </nav>
            <!-- the cart icon -->
            <Cart/>
            <!-- the buttons -->
            <div class="flex relative items-center justify-center gap-3 my-auto mb-3" v-if="!isAuthed">
                <button data-te-ripple-init  data-te-ripple-color="rgb(167, 165, 165)" class="text-sm md:text-lg font-light px-2 py-1 rounded-md transition duration-200  hover:bg-gray-100 uppercase " @click="handleToLogin">{{ $t('login') }}</button>
                <span>
                    <i class="fa fa-angle-right"></i>
                </span>
                <button data-te-ripple-init data-te-ripple-color="rgb(167, 165, 165)" class="text-sm md:text-lg font-light px-2 py-1 rounded-md duration-200  hover:bg-gray-100 uppercase" @click="handleToSignup">{{ $t('signup') }}</button>
            </div>
            <!-- the else holder -->
            <div v-else-if="isAuthed" class="relative">
        <!-- the profile information -->
            <button
            data-te-ripple-init
            type="button"
            id="dropdownMenuButtonY"
            data-te-ripple-color="light"
            data-te-dropdown-toggle-ref
            aria-expanded="false"
            data-te-nav-link-ref
             class="flex items-center text-xs text-gray-800 gap-2 capitalize"
             >
                <div class="flex items-center justify-center relative my-auto w-10 h-10 rounded-full overflow-hidden">
                    <img :src="user.profile" class="w-full h-full object-cover" alt="">
                </div>
                <span>
                    {{ user.username }}
                </span>
            </button>
            <!-- the absolute information -->
            <div 
            class="absolute left-0 pt-3 right-0 top-full z-[1000] mt-0 hidden w-full border-none bg-white bg-clip-padding text-neutral-600 shadow-md dark:bg-neutral-700 dark:text-neutral-200 [&[data-te-dropdown-show]]:block"
            aria-labelledby="dropdownMenuButtonX"
            data-te-dropdown-menu-ref
            >
                <!-- the element holder -->
                <div
                class="px-3 py-3 flex flex-col font-Roboto text-sm gap-3 w-full capitalize" 
                >
                    <a href="#"
                    aria-current="true"
                    class="dropLink w-full hover:text-secondary hover:border-b-secondary"
                    ><span><i class="fa fa-cog" aria-hidden="true"></i></span><span>Profile</span></a>
                    <button @click="handleLogOut" class="flex w-full items-center justify-center gap-1 py-1 rounded-full bg-red-500 text-white"><span><i class="fa fa-sign-out" aria-hidden="true"></i></span><span>{{ $t('logout') }}</span></button>
                </div>
            </div>
            </div>
        </div>
    </header>
    <!-- the small scrine header -->
    <header id="theSmallHeader" class="sm:hidden px-4 py-3 sticky top-0 right-0 left-0 z-10 bg-white  items-center justify-center">
       
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
                @click="openNavBar"
                >
                    <i class="fa-solid fa-bars"></i>
                </button>
            </div>
            <!-- the right one -->
            <div class="flex items-center gap-4">
                <!-- the cart icon -->
                <Cart/>
                <div  v-if="!isAuthed">
                    <button data-te-ripple-init  data-te-ripple-color="rgb(167, 165, 165)" class="text-sm md:text-xl font-light px-2 py-1 rounded-md transition duration-200 sm:hover:shadow-md  " @click="handleToLogin">LOGIN</button>
                        <span>
                            <i class="fa fa-angle-right"></i>
                        </span>
                    <button data-te-ripple-init data-te-ripple-color="rgb(167, 165, 165)" class="text-sm md:text-xl font-light px-2 py-1 rounded-md duration-200 sm:hover:shadow-md" @click="handleToSignup">SIGNUP</button>
                </div>
                <!-- the else holder -->
            <div v-else-if="isAuthed" class="relative ml-4">
        <!-- the profile information -->
            <button
            data-te-ripple-init
            type="button"
            id="dropdownMenuButtonY"
            data-te-ripple-color="light"
            data-te-dropdown-toggle-ref
            aria-expanded="false"
            data-te-nav-link-ref
             class="flex items-center text-xs text-gray-800 gap-2 capitalize"
             >
                <div class="flex items-center justify-center relative my-auto w-10 h-10 rounded-full overflow-hidden">
                    <img :src="user.profile" class="w-full h-full object-cover" alt="">
                </div>
                <span>
                    {{ user.username }}
                </span>
            </button>
            <!-- the absolute information -->
            <div 
            class="absolute left-0 pt-3 right-0 top-full z-[1000] mt-0 hidden w-full border-none bg-white bg-clip-padding text-neutral-600 shadow-md dark:bg-neutral-700 dark:text-neutral-200 [&[data-te-dropdown-show]]:block"
            aria-labelledby="dropdownMenuButtonX"
            data-te-dropdown-menu-ref
            >
                <!-- the element holder -->
                <div
                class="px-3 py-3 flex flex-col font-Roboto text-sm gap-3 w-full capitalize" 
                >
                    <a href="#"
                    aria-current="true"
                    class="dropLink hover:text-secondary w-full hover:border-b-secondary"
                    ><span><i class="fa fa-cog" aria-hidden="true"></i></span><span>Profile</span></a>
                    <button @click="handleLogOut" class="flex items-center w-full justify-center gap-1 py-1 rounded-full bg-red-500 text-white"><span><i class="fa fa-sign-out" aria-hidden="true"></i></span><span>Logout</span></button>
                </div>
            </div>
            </div>
            </div>
        </div>
      <!-- the absolute one -->
      <div 
        id="sidenav-2"
        class="fixed -left-[500px] top-0 z-[1035] flex flex-col gap-5  px-4 h-screen w-60 -translate-x-full overflow-hidden bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] data-[te-sidenav-hidden='false']:translate-x-0 dark:bg-zinc-800"
        data-te-sidenav-init
        data-te-sidenav-hidden="false"
        data-te-sidenav-mode="side"
        data-te-sidenav-content="#content"
        data-te-sidenav-position="fixed"
      >
      <!-- hte heaader -->
      <div class="flex gap-2 items-center mb-5 mt-2 border-b py-2 px-1">
        <!-- the logo -->
        <Logo @click="closeNavBar"/>
        <span>
           <span class="text-secondary">C5</span> Online Caffe
        </span>
      </div>
        <ul class="relative m-0 list-none px-[0.2rem] flex flex-col gap-4 font-Roboto" data-te-sidenav-menu-ref>
            <li class="relative">
                <nuxt-link to="/" @click="closeNavBar" data-te-sidenav-link-ref class="flex items-center gap-4 w-full border-b border-b-5 transition duration-150 hover:bg-secondary hover:text-white pl-2 py-1 rounded-sm uppercase">
                    <span>
                        <i class="fa fa-home" aria-hidden="true"></i>
                    </span>
                    <span>
                        HOME
                    </span>
                </nuxt-link>
            </li>
            <li class="relative">
                <button data-te-sidenav-link-ref class="flex items-center gap-4 w-full border-b border-b-5 transition duration-150 hover:bg-secondary hover:text-white pl-2 py-1 rounded-sm uppercase"
                @click="handleSmallMenuClick"
                >
                    <span>
                        <i class="fa-solid fa-list"></i>
                    </span>
                    <span>
                        Services
                        <span><i class="fa fa-angle-right transition duration-150 ease-out" :class="{'rotate-90':changeSmallDirection}"></i></span>
                    </span>
                </button>
                <ul
                class="!visible relative ml-5 hidden list-none p-0 data-[te-collapse-show]:block "
                data-te-sidenav-collapse-ref
                >
                    <li>
                        <a href="#"
                                class=" text-sm px-1 border-b text-gray-800 flex gap-3 items-center py-1  hover:text-secondary hover:border-b-secondary"
                                aria-current="true"
                                @click="closeNavBar"
                                >
                                <span>
                                    <i class="fa-brands fa-paypal"></i>
                                </span>
                                Payment
                        </a>
                    </li>
                    <li>
                        <a href="#"
                                aria-current="true"
                                class=" text-sm px-1 border-b text-gray-800 flex gap-3 items-center py-1  hover:text-secondary hover:border-b-secondary"
                                @click="closeNavBar"
                                >
                                <span>
                                    <i class="fas fa-shipping-fast"></i>
                                </span>
                                Delivery
                        </a>
                    </li>
                    <li>
                        <a href="#"
                                aria-current="true"
                                class=" text-sm px-1 border-b text-gray-800 flex gap-3 items-center py-1  hover:text-secondary hover:border-b-secondary"
                                @click="closeNavBar"
                                >
                                <span>
                                    <i class="fas fa-user-secret"></i>
                                </span>
                                Privacy Policy
                        </a>
                    </li>
                    <li>
                        <a href="#"
                                aria-current="true"
                                class=" text-sm px-1 border-b text-gray-800 flex gap-3 items-center py-1  hover:text-secondary hover:border-b-secondary"
                                @click="closeNavBar"
                                >
                                <span>
                                    <i class="fas fa-building"></i>
                                </span>
                                Company Policy
                        </a>
                    </li>
                </ul>
            </li>
            <li class="relative">
                <nuxt-link to="/product" @click="closeNavBar" data-te-sidenav-link-ref class="flex items-center gap-4 w-full border-b border-b-5 transition duration-150 hover:bg-secondary hover:text-white pl-2 py-1 rounded-sm uppercase">
                    <span>
                        <i class="fa-solid fa-tag"></i>
                    </span>
                    <span>
                        Products
                    </span>
                </nuxt-link>
            </li>
            <li class="relative">
                <nuxt-link to="/about" @click="closeNavBar" data-te-sidenav-link-ref class="flex items-center gap-4 w-full border-b border-b-5 transition duration-150 hover:bg-secondary hover:text-white pl-2 py-1 rounded-sm uppercase">
                    <span>
                        <i class="fa-solid fa-circle-info"></i>
                    </span>
                    <span>
                        About Us
                    </span>
                </nuxt-link>
            </li>
            <li class="relative">
                <nuxt-link to="/contact" @click="closeNavBar" data-te-sidenav-link-ref class="flex items-center gap-4 w-full border-b border-b-5 transition duration-150 hover:bg-secondary hover:text-white pl-2 py-1 rounded-sm uppercase">
                    <span>
                        <i class="fa-solid fa-headphones"></i>
                    </span>
                    <span>
                        Contact Us
                    </span>
                </nuxt-link>
            </li>
        </ul>
        <!-- the footer -->
        <div class="mt-auto mb-10 mx-auto text-xs text-gray-500">
            <span>&copy;</span> 2015 E.C
        </div>
    </div>
    </header>
</template>