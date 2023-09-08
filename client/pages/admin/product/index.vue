<script setup>

import {Ripple,initTE} from 'tw-elements'
const useAdminActionStore=adminProductAndCatagoryStore()

onMounted(async()=>{
    await useAdminActionStore.getProducts('')
    await useAdminActionStore.getCatagorys()
    initTE({
        Ripple
    })
})

definePageMeta({
    layout:"admin"
})
</script>

<template>
    <Head>
        <Title>
            C5 Online Caffe | Admin | Product
        </Title>
        <Meta name="description" content="This is where the admin controlle the products which is online for sell" />
    </Head>
    <div class="w-full h-full relative flex gap-3">
        <!-- the left one -->
        <div class="w-[65%] h-full flex flex-col gap-2 justify-center rounded-md bg-white p-5">
            <!-- the title -->
            <div class="w-full font-Roboto font-light border-b pb-1">
                Online Avelable Products
            </div>
            <!-- the button holder -->
            <div class="w-full flex justify-end items-center py-1">
                <div class="mr-2">
                    <button 
                    type="button"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    class="inline-block rounded bg-green-600 px-4 py-1 w-full text-sm font-medium leading-normal text-white transition duration-150 ease-in-out hover:bg-green-700 focus:bg-primary-600  focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    >New</button>
                </div>
            </div>
            <!-- the product holder -->
            <div 
            class="w-full min-h-[70vh] overflow-y-auto"
            >
                <AdminProductTable/>
            </div>
        </div>
        <!-- the right one -->
        <div class="w-[35%] h-full flex flex-col gap-2 justify-center rounded-md bg-white p-5">
            <!-- the title -->
            <div class="w-full font-Roboto font-light border-b pb-1">
                Online Avelable Product Catagorys
            </div>
            <!-- the button holder -->
            <div class="w-full flex justify-end items-center py-1">
                <div class="mr-2">
                    <button 
                    type="button"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    class="inline-block rounded bg-green-600 px-4 py-1 w-full text-sm font-medium leading-normal text-white transition duration-150 ease-in-out hover:bg-green-700 focus:bg-primary-600  focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    >Add</button>
                </div>
            </div>
        </div>
    </div>
</template>