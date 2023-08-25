<script setup>
import {storeToRefs} from 'pinia'

const useProductStore=productStore()
const {products}=storeToRefs(useProductStore)

const catagory_controller=ref('')
onMounted(async() => {
    if(useProductStore.$state.products.length==0){
        useProductStore.fetchProducts('')
    }
})



const filterByCatagory=async(catagory)=>{
    catagory_controller.value=catagory
    await useProductStore.fetchProducts(catagory)
}
const handleChangePage=async(pagenumber)=>{
    useProductStore.setProductCurrentPage(pagenumber)
    await useProductStore.fetchProducts(catagory_controller.value)
}
const parseToNumber=(number)=>{
    const parsed=Number(number)
    if(!isNaN(parsed)) {
        return parsed
    }
    return 0
}
</script>

<template>
    <div class="h-screen relative w-full flex mt-1">
        <!-- the left one -->
        <div class="w-1/4 fixed left-2 top-20 bottom-1 overflow-y-scroll py-5 flex flex-col items-center gap-2 px-1 border-r ">
            <!-- the title one -->
            <div class="text-2xl w-full font-Roboto font-bold text-secondary">
                Catagorys:
            </div>
            <!-- the catagory lists container-->
            <div class="w-3/4 flex flex-col gap-2 mt-4 items-center " v-if="useProductStore.$state.product_catagorys">
                <button
                class="w-full border-l-4 pl-5 flex items-center text-left border-gray-200 hover:text-secondary transition duration-200 hover:border-secondary"
                @click="filterByCatagory('')"
                :class="{'border_secondary text-secondary border-secondary':catagory_controller==''}"
                >
                    All
                </button>
                <button
                 class="w-full border-l-4 pl-5 flex items-center text-left border-gray-200 hover:text-secondary transition duration-200 hover:border-secondary"
                v-for="catagory in useProductStore.$state.product_catagorys"
                :key="catagory._id" 
                @click="filterByCatagory(catagory.catagory)"
                :class="{'border-secondary text-secondary':catagory_controller==catagory.catagory}"
                >
                    {{ catagory.catagory }}
                </button>
            </div>
            <!-- else -->
            <div class="w-3/4 flex flex-col gap-1 mt-4 items-center justify-center" v-else>
                <!-- show the empty catagory lists -->
            </div>
        </div>
        <!-- the right one -->
        <div class="w-3/4 ml-auto flex flex-col gap-2 ">
            <!-- the upper header -->
            <div>

            </div>
            <!-- the product content -->
            <div class="w-full h-fit grid grid-cols-3 gap-4 overflow-y-scroll py-4 px-2" v-if="useProductStore.$state.products">
                <div v-for="product in useProductStore.$state.products" :key="product._id" 
                class="w-full h-72 relative rounded-md shadow-md overflow-hidden transition transform duration-300 hover:scale-105"
                >
                    <product-card :product="product"/>
                </div>
            </div>
            <!-- the pagination holder -->
            <div 
            class="w-full h-fit flex items-center justify-center mt-3 mb-2 "
            v-if="useProductStore.$state.products.length>0">
                <shareble-pagination 
                    :initial-page="parseToNumber(useProductStore.$state.current_page)"
                    :total-pages="parseToNumber(useProductStore.$state.totalProductPages)"
                    @change_page="handleChangePage"
                />
            </div>
        </div>
    </div>
    <!-- <AnimatePlaceHolderArea/> -->
</template>