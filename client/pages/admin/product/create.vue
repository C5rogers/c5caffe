<script setup>

const useAdminActionStore=adminProductAndCatagoryStore()
onMounted(async()=>{
    await useAdminActionStore.getCatagorys()
})

definePageMeta({
    layout:"admin"
})
</script>

<template>
    <Head>
        <Title>
            C5 Online Caffe | Admin | Product | Create
        </Title>
        <Meta name="description" content="This is where the admin post new products to the site to let the users select it and purchase it" />
    </Head>
    <div class="w-full h-full relative flex gap-3">
        <!-- the left one -->
        <div class="w-2/4 h-full flex flex-col gap-2 justify-center rounded-md bg-white p-5">
            <!-- the title -->
            <div class="w-full font-Roboto font-light border-b pb-1">
                Post New Product
            </div>
            <!-- the form container -->
            <div class="w-full h-full flex items-center">
                <AdminProductCreateForm/>
            </div>
        </div>
        <!-- the right one -->
        <div class="w-1/4 h-full flex flex-col gap-2 justify-center rounded-md bg-white p-5">
            <!-- the title -->
            <div class="w-full border-b font-Roboto font-light pb-1">
                Post New Product Catagory
            </div>
            <!-- the form container -->
            <div class="w-full h-full flex items-center">
                <AdminCatagoryCreate/>
            </div>
            <!-- the catagory lists -->
            <div class="w-full border-b mt-3 font-Roboto font-light pb-1">
                Currently Avelable Catagorys
            </div>
            <!-- the catagorys -->
            <div class="w-full h-[55vh] overflow-y-scroll flex transition duration-200 flex-wrap gap-1 items-center">
                <div 
                class="px-2 py-1 rounded-full text-xs capitalize border-[1px] border-secondary text-gray-800 hover:bg-secondary hover:text-white cursor-pointer transition duration-200"
                v-for="catagory in useAdminActionStore.$state.catagorys"
                :key="catagory._id"
                >
                    {{ catagory.catagory }}
                </div>
            </div>
        </div>
        <!-- the creation analysis -->
        <div class="w-1/4 h-full flex flex-col gap-2 justify-center rounded-md bg-white p-5">
            <!-- the title -->
            <div class="w-full border-b font-Roboto font-light pb-1">
                Product Posting Report
            </div>
            <div class="w-full h-full flex items-center">
                <AdminProductUploadingRate/>
            </div>
        </div>
    </div>
</template>