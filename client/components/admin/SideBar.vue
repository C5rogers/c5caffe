<script setup>
import {Ripple,initTE,Sidenav,Collapse,Dropdown} from 'tw-elements'
onMounted(() => {
  initTE({
    Ripple,
    Collapse,
    Dropdown,
    Sidenav
  })  
})


const router=useRouter()
const route=useRoute()
const gotoDashborad=()=>{
    router.push('/admin')
}

</script>

<template>
    <nav
    id="adminSideNav"
    class="group fixed left-0 top-0 z-[1035] h-screen w-[18%] -translate-x-full overflow-hidden bg-gray-900 shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] data-[te-sidenav-slim='true']:hidden data-[te-sidenav-slim-collapsed='true']:w-[77px] data-[te-sidenav-slim='true']:w-[77px] data-[te-sidenav-hidden='false']:translate-x-0 dark:bg-zinc-800 [&[data-te-sidenav-slim-collapsed='true'][data-te-sidenav-slim='false']]:hidden [&[data-te-sidenav-slim-collapsed='true'][data-te-sidenav-slim='true']]:[display:unset]"
    data-te-sidenav-init
    data-te-sidenav-hidden="false"
    data-te-sidenav-mode="side"
    data-te-sidenav-slim="true"
    data-te-sidenav-content="#slim-content"
    data-te-sidenav-slim-collapsed="true"
    >
        <div
        class="relative w-full h-full m-0 flex flex-col gap-3 text-[0.875rem] text-gray-400 outline-none transition duration-300 ease-linear  data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10  font-Roboto"
        data-te-sidenav-menu-ref
        >
            <!-- the main logo -->
            <div class="h-20 pt-3 pl-3 w-full truncate flex gap-1 items-center border-b-[1px] pb-5">
                <logo :admin-mode="true" @click="gotoDashborad"/>
                <div data-te-sidenav-slim="false">
                    Admin Pannel
                </div>
            </div>
            <!-- the other contents -->
            <div
            class="w-full h-full flex flex-col px-2 gap-1 items-center"
            >
                <div class="w-full">
                    <span
                    class="px-2 py-4 text-[0.6rem] font-bold uppercase text-gray-600 dark:text-gray-400"
                    >Main
                    </span>
                </div>
                <!-- the links -->
                <nuxt-link data-te-sidenav-link-ref to="/admin"
                class="w-full flex h-12 cursor-pointer items-center truncate rounded-[5px] px-5 py-4 text-[0.875rem] text-gray-400 outline-none transition duration-300 ease-linear hover:bg-slate-800  hover:outline-none   focus:outline-none   active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                >
                    <span
                    class="mr-4 [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300"
                    :class="{'[&>svg]:text-secondary':route.name=='admin'}"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            class="h-3.5 w-3.5">
                            <path
                            d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                            <path
                            d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                        </svg>
                    </span>
                    <span data-te-sidenav-slim="false">
                        Dashbord
                    </span>
                </nuxt-link>
                <div class="w-full">
                    <span
                    class="px-2 py-4 text-[0.6rem] font-bold uppercase text-gray-600 dark:text-gray-400">
                    Product
                    </span>
                </div>
                <nuxt-link data-te-sidenav-link-ref 
                to="/admin/product"
                class="w-full flex h-12 cursor-pointer items-center truncate rounded-[5px] px-5 py-4 text-[0.875rem] text-gray-400 outline-none transition duration-300 ease-linear hover:bg-slate-800 hover:outline-none focus:outline-none active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                >
                    <span
                    class="mr-4 [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300"
                    :class="{'[&>svg]:text-secondary':route.name=='admin-product'}"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            class="h-3.5 w-3.5">
                            <path
                            d="M21 6.375c0 2.692-4.03 4.875-9 4.875S3 9.067 3 6.375 7.03 1.5 12 1.5s9 2.183 9 4.875z" />
                            <path
                            d="M12 12.75c2.685 0 5.19-.586 7.078-1.609a8.283 8.283 0 001.897-1.384c.016.121.025.244.025.368C21 12.817 16.97 15 12 15s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.285 8.285 0 001.897 1.384C6.809 12.164 9.315 12.75 12 12.75z" />
                            <path
                            d="M12 16.5c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 001.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 001.897 1.384C6.809 15.914 9.315 16.5 12 16.5z" />
                            <path
                            d="M12 20.25c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 001.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 001.897 1.384C6.809 19.664 9.315 20.25 12 20.25z" />
                        </svg>
                    </span>
                    <span data-te-sidenav-slim="false">
                        Products
                    </span>
                </nuxt-link>
                <nuxt-link
                data-te-sidenav-link-ref 
                class="w-full flex h-12 cursor-pointer items-center truncate rounded-[5px] px-5 py-4 text-[0.875rem] text-gray-400 outline-none transition duration-300 ease-linear hover:bg-slate-800 hover:outline-none focus:outline-none active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                to="/admin/product/create">
                    <span
                        class="mr-4 [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300"
                        :class="{'[&>svg]:text-secondary':route.name=='admin-product-create'}"
                        >
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="h-3.5 w-3.5">
                        <path
                            fill-rule="evenodd"
                            d="M12 1.5a.75.75 0 01.75.75V4.5a.75.75 0 01-1.5 0V2.25A.75.75 0 0112 1.5zM5.636 4.136a.75.75 0 011.06 0l1.592 1.591a.75.75 0 01-1.061 1.06l-1.591-1.59a.75.75 0 010-1.061zm12.728 0a.75.75 0 010 1.06l-1.591 1.592a.75.75 0 01-1.06-1.061l1.59-1.591a.75.75 0 011.061 0zm-6.816 4.496a.75.75 0 01.82.311l5.228 7.917a.75.75 0 01-.777 1.148l-2.097-.43 1.045 3.9a.75.75 0 01-1.45.388l-1.044-3.899-1.601 1.42a.75.75 0 01-1.247-.606l.569-9.47a.75.75 0 01.554-.68zM3 10.5a.75.75 0 01.75-.75H6a.75.75 0 010 1.5H3.75A.75.75 0 013 10.5zm14.25 0a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H18a.75.75 0 01-.75-.75zm-8.962 3.712a.75.75 0 010 1.061l-1.591 1.591a.75.75 0 11-1.061-1.06l1.591-1.592a.75.75 0 011.06 0z"
                            clip-rule="evenodd" />
                        </svg>
                    </span>
                    <span data-te-sidenav-slim="false">
                        Post Product
                    </span>
                </nuxt-link>
                <div class="w-full">
                    <span
                    class="px-2 py-4 text-[0.6rem] font-bold uppercase text-gray-600 dark:text-gray-400"
                    >
                    Users
                    </span>
                </div>
                <nuxt-link 
                data-te-sidenav-link-ref 
                class="w-full flex h-12 cursor-pointer items-center truncate rounded-[5px] px-5 py-4 text-[0.875rem] text-gray-400 outline-none transition duration-300 ease-linear hover:bg-slate-800 hover:outline-none  focus:outline-none active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                to="/admin/user">
                    <span
                    class="mr-4 [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300"
                    :class="{'[&>svg]:text-secondary':route.name=='admin-user'}"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            class="h-3.5 w-3.5">
                            <path
                            fill-rule="evenodd"
                            d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z"
                            clip-rule="evenodd" />
                            <path
                            d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
                        </svg>
                    </span>
                    <span data-te-sidenav-slim="false">
                        Users
                    </span>
                </nuxt-link>
                <div class="w-full">
                    <span
                    class="px-2 py-4 text-[0.6rem] font-bold uppercase text-gray-600 dark:text-gray-400"
                    >
                    Overall
                    </span>
                </div>
                <nuxt-link 
                data-te-sidenav-link-ref 
                class="w-full flex h-12 cursor-pointer items-center truncate rounded-[5px] px-5 py-4 text-[0.875rem] text-gray-400 outline-none transition duration-300 ease-linear hover:bg-slate-800 hover:outline-none focus:outline-none active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                to="/admin/selled_order">
                    <span
                    class="mr-4 [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300"
                    :class="{'[&>svg]:text-secondary':route.name=='admin-selled_order'}"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            class="h-3.5 w-3.5">
                            <path
                            fill-rule="evenodd"
                            d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z"
                            clip-rule="evenodd" />
                            <path
                            fill-rule="evenodd"
                            d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z"
                            clip-rule="evenodd" />
                        </svg>
                    </span>
                    <span data-te-sidenav-slim="false">
                        Selled Orders
                    </span>
                </nuxt-link>
                <nuxt-link
                data-te-sidenav-link-ref 
                class="w-full flex h-12 cursor-pointer items-center truncate rounded-[5px] px-5 py-4 text-[0.875rem] text-gray-400 outline-none transition duration-300 ease-linear hover:bg-slate-800 hover:outline-none  focus:outline-none  active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                to="/admin/analisis">
                    <span
                    class="mr-4 [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300"
                    :class="{'[&>svg]:text-secondary':route.name=='admin-analisis'}"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            class="h-3.5 w-3.5">
                            <path
                            d="M12.378 1.602a.75.75 0 00-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03zM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 00.372-.648V7.93zM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 00.372.648l8.628 5.033z" />
                        </svg>
                    </span>
                    <span 
                    data-te-sidenav-slim="false">Analitics</span>
                </nuxt-link>
            </div>
        </div>
    </nav>
</template>