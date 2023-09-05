<script setup>

const route=useRoute()
const useAuthStore=authStore()
</script>

<template>
    <!-- the whole container -->
    <div class="w-full relative h-fit md:h-screen  flex">
        <!-- the sidenav -->
        <AdminSideBar/>
        <!-- the small header -->
        <div id="slim-content"  class="w-[82%] fixed flex justify-between items-center px-5 top-0 right-0 h-12">
            <!-- the route name -->
            <div v-if="route.name=='admin'" class="font-Roboto font-bold capitalize">
                Dashboard
            </div>
            <!-- the other one -->
            <div class="font-Roboto font-bold capitalize" v-else>
                {{ route.name }}
            </div>
            <!-- the admin profile -->
            <div
            class="w-8 h-8 cursor-pointer flex items-center justify-center rounded-full overflow-hidden"
            >
                <img :src="useAuthStore.$state.user.profile" class="w-fill h-full object-cover" :alt="useAuthStore.$state.user.name">
            </div>
        </div>
        <!-- the body -->
        <div class="w-[82%] mt-12 p-3 ml-auto min-h-[90vh] overflow-y-scroll bg-gray-50">
            <slot/>
        </div>
    </div>
</template>