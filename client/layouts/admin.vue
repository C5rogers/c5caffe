<script setup>
import {
  Sidenav,
  initTE,
  Dropdown,
  Ripple
} from "tw-elements";


const route=useRoute()
const useAuthStore=authStore()

onMounted(()=>{
    initTE({
        Dropdown,
        Ripple,
        Sidenav
    })
})

const slim_toogler=()=>{
    const instance=Sidenav.getInstance(
        document.getElementById('adminSideNav')
    )
    instance.toggleSlim()
}

</script>

<template>
    <!-- the whole container -->
    <div class="w-full relative h-fit md:h-screen  flex">
        <!-- the sidenav -->
        <AdminSideBar/>
        <!-- the small header -->
        <!-- the header and body holder -->
        <div id="slim-content" class="w-full ml-auto relative h-full" >
            <div class="w-full fixed z-[1000] bg-white flex justify-between items-center px-5 left-0 top-0 right-0 h-12">
                <!-- the name controller div -->
                <div id="slim-content" class="w-fit h-full flex gap-1 items-center">
                    <button
                        class="inline-block rounded -ml-1 mr-2 text-xs font-medium uppercase leading-tight transition duration-150 ease-in-out focus:outline-none focus:ring-0 "
                        aria-haspopup="true"
                        id="slim-toggler"
                        @click="slim_toogler"
                        >
                        <span class="block [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-black">
                            <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            class="h-5 w-5"
                            viewBox="0 0 448 512">
                            <path fill="currentColor" d="M12.83 352h262.34A12.82 12.82 0 0 0 288 339.17v-38.34A12.82 12.82 0 0 0 275.17 288H12.83A12.82 12.82 0 0 0 0 300.83v38.34A12.82 12.82 0 0 0 12.83 352zm0-256h262.34A12.82 12.82 0 0 0 288 83.17V44.83A12.82 12.82 0 0 0 275.17 32H12.83A12.82 12.82 0 0 0 0 44.83v38.34A12.82 12.82 0 0 0 12.83 96zM432 160H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0 256H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"/>
                            </svg>
                        </span>
                    </button>
                    <!-- the route name -->
                    <div v-if="route.name=='admin'" class="font-Roboto font-bold capitalize">
                        Dashboard
                    </div>
                    <!-- the other one -->
                    <div class="font-Roboto font-bold capitalize" v-else>
                        {{ route.name }}
                    </div>
                </div>
                <!-- the right one -->
                <div class="flex w-28 relative justify-end ml-auto">
                    <div
                    data-te-ripple-init
                    id="dropdownAdminButton"
                    data-te-ripple-color="light"
                    data-te-dropdown-toggle-ref
                    aria-expanded="false"
                    data-te-nav-link-ref
                    class="w-8 h-8 cursor-pointer flex items-center justify-center rounded-full overflow-hidden"
                    >
                        <img :src="useAuthStore.$state.user.profile" class="w-fill h-full object-cover" :alt="useAuthStore.$state.user.name">
                    </div>
                    <!-- the absolute one -->
                    <div
                    class="absolute pt-3 right-10 top-full z-[1000] mt-0 hidden w-full border-none bg-white bg-clip-padding text-neutral-600 shadow-md dark:bg-neutral-700 dark:text-neutral-200 [&[data-te-dropdown-show]]:block"
                    aria-labelledby="dropdownAdminMenu"
                    data-te-dropdown-menu-ref
                    >
                        <!-- the element holder -->
                        <AdminInfo/>
                    </div>
                </div>
                <!-- the admin profile -->
            </div>
            <div class="w-full mt-12 p-3 ml-auto min-h-[93vh] overflow-y-scroll bg-gray-100">
                <slot/>
            </div>
        </div>
        <!-- the body -->
        
    </div>
</template>