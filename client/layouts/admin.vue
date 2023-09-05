<script setup>
import {
  Sidenav,
  initTE,
} from "tw-elements";

onMounted(()=>{
    initTE({
        Sidenav
    })
})

const slim_toogler=()=>{
    const instance=Sidenav.getInstance(
        document.getElementById('adminSideNav')
    )
    instance.toggleSlim()
}

const route=useRoute()
const useAuthStore=authStore()
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
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            class="h-5 w-5">
                            <path
                            fill-rule="evenodd"
                            d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                            clip-rule="evenodd" />
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
                <!-- the admin profile -->
                <div
                class="w-8 h-8 cursor-pointer flex items-center justify-center rounded-full overflow-hidden"
                >
                    <img :src="useAuthStore.$state.user.profile" class="w-fill h-full object-cover" :alt="useAuthStore.$state.user.name">
                </div>
            </div>
            <div class="w-full mt-12 p-3 ml-auto min-h-[150vh] overflow-y-scroll bg-gray-100">
                <slot/>
            </div>
        </div>
        <!-- the body -->
        
    </div>
</template>