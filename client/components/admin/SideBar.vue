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

const changeSmallDirection=ref(false)

const handleSmallMenuClick=()=>{
    changeSmallDirection.value=!changeSmallDirection.value
}

const router=useRouter()
const gotoDashborad=()=>{
    router.push('/admin')
}

</script>

<template>
    <nav
    data-te-sidenav-init
    data-te-sidenav-hidden="false"
    data-te-sidenav-mode="side"
    data-te-sidenav-content="#content"
    class="fixed left-0 bottom-0 top-0 w-[18%] font-Roboto text-white bg-gray-900 flex flex-col gap-3 "
    >
        <!-- the logo -->
        <div class="w-full border-b-[1px] flex items-center gap-3 justify-center pt-4 pb-5 px-5">
            <!-- the logo image -->
            <logo @click="gotoDashborad" :adminMode="true" />
            <!-- the main message -->
            <div class="font-Roboto text-xl capitalize">
                Admin Pannel
            </div>
        </div>
        <!-- the content -->
        <div class="w-full relative m-0 px-[0.2rem] pb-12 h-full">
            <nav
            data-te-sidenav-menu-ref
            class="w-full h-full flex flex-col gap-2 list-none"
            >
                <nuxt-link to="/admin"
                data-te-sidenav-link-ref 
                data-te-ripple-init
                data-te-ripple-color="light"
                class="flex cursor-pointer items-center border-b-[3px] border-gray-400 truncate rounded-[5px] px-6 py-[0.45rem] text-[0.85rem] text-gray-400 outline-none transition duration-300 ease-linear hover:bg-slate-800 hover:text-inherit hover:outline-none  focus:text-inherit focus:outline-none  active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                >
                    <span
                    class="mr-4 [&>svg]:h-3.5 [&>svg]:w-3.5 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300">
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
                    <span>
                        Dashbord
                    </span>
                </nuxt-link>
                <!-- the collaps button -->
                <div class="relative">
                    <button 
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    data-te-sidenav-link-ref
                    class="flex cursor-pointer w-full items-center border-b-[3px] border-gray-500 truncate rounded-[5px] px-6 py-[0.45rem] text-[0.85rem] text-gray-400 outline-none transition duration-300 ease-linear hover:bg-slate-800 hover:text-inherit hover:outline-none  focus:text-inherit focus:outline-none  active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                    @click="handleSmallMenuClick"
                    >
                        <span
                        class="mr-4 [&>svg]:h-3.5  [&>svg]:w-3.5 text-gray-400 dark:[&>svg]:text-gray-300"
                        >
                            <i class="fa-solid fa-tag"></i>
                        </span>
                        <span>Product</span>
                        <span class="ml-auto">
                            <span><i class="fa fa-angle-right transition duration-150 ease-out" :class="{'rotate-90':changeSmallDirection}"></i></span>
                        </span>
                    </button>
                    <ul 
                    class="!visible relative ml-5 mt-4 hidden list-none p-0 data-[te-collapse-show]:block "
                    data-te-sidenav-collapse-ref
                    >
                        <li class="w-full">
                            <nuxt-link data-te-sidenav-collapse-ref
                            data-te-ripple-init
                            data-te-ripple-color="light"
                            class="flex cursor-pointer rounded-[5px] items-center border-b-[1px] border-gray-400 truncate px-6 py-[0.45rem] text-[0.85rem] text-gray-400 outline-none transition duration-300 ease-linear hover:bg-slate-800 hover:text-inherit hover:outline-none  focus:text-inherit focus:outline-none  active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                            to="admin/product/">
                                <span
                                class="mr-4 [&>svg]:h-3.5 [&>svg]:w-3.5 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300">
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
                                <span>
                                    Products
                                </span>
                            </nuxt-link>
                        </li>
                        <li>
                            <nuxt-link 
                            data-te-sidenav-collapse-ref
                            data-te-ripple-init
                            data-te-ripple-color="light"
                            class="flex cursor-pointer items-center rounded-[5px] border-b-[1px] border-gray-400 truncate px-6 py-[0.45rem] text-[0.85rem] text-gray-400 outline-none transition duration-300 ease-linear hover:bg-slate-800 hover:text-inherit hover:outline-none  focus:text-inherit focus:outline-none  active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                            to="admin/product/create">
                                <span
                                class="mr-4 [&>svg]:h-3.5 [&>svg]:w-3.5 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300">
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
                                <span>
                                    Post Product
                                </span>
                            </nuxt-link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    </nav>
</template>