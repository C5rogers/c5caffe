<script setup>
import {storeToRefs} from 'pinia'

const useProductStore=productStore()
const {products}=storeToRefs(useProductStore)

onMounted(async() => {
    useProductStore.fetchProducts()
    console.log("the catagorys")
    console.log()
})


</script>

<template>
    <div class="h-screen relative w-full flex gap-1 mt-1">
        <!-- the left one -->
        <div class="w-1/4 fixed top-20 bottom-1 overflow-y-scroll px-2 py-5 flex flex-col items-center gap-2 border-r ">
            <!-- the title one -->
            <div class="text-2xl w-full font-Roboto font-bold text-secondary">
                Catagorys:
            </div>
            <!-- the catagory lists container-->
            <div class="w-3/4 flex flex-col gap-1 mt-2 items-center ">
                <button class="w-full border-l-4 pl-2 text-left border-gray-200 hover:text-secondary transition duration-200 hover:border-secondary">
                    Sweets
                </button>
            </div>
        </div>
        <!-- the right one -->
        <div>
            <!-- the upper header -->
            <div>

            </div>
            <!-- the product content -->
            <div>

            </div>
        </div>
    </div>
    <!-- <AnimatePlaceHolderArea/> -->
</template>