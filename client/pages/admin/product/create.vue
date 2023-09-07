<script setup>


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
            <div>

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