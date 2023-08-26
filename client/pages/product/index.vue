<script setup>
import {storeToRefs} from 'pinia'
import {Ripple,initTE,Select} from "tw-elements";

const product_controller=ref({})
const rating_product=ref({})
const useProductStore=productStore()
const {products}=storeToRefs(useProductStore)

const catagory_controller=ref('')
onMounted(async() => {
    if(useProductStore.$state.products.length==0){
        useProductStore.fetchProducts('')
    }
    initTE({
        Select,
        Ripple
    })
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

const changeTheAddToProduct=(product)=>{
    product_controller.value=product
}
const changeRatingProduct=(product)=>{
    rating_product.value=product
}

const handleChange=async(e)=>{
    const number=Number(e.target.value)
    if(!isNaN(number)){
        useProductStore.setProeductPageLimit(number)
        await useProductStore.fetchProducts(catagory_controller.value)
    }
}
</script>

<template>
    <div class="h-screen relative w-full flex mt-1">
        <!-- the left one -->
        <div class="w-1/4 fixed left-2 top-20 bottom-1 overflow-y-scroll py-5 flex flex-col items-center gap-2 pl-1 border-r ">
            <!-- the title one -->
            <div class="text-2xl w-full font-Roboto font-bold text-secondary">
                Catagorys:
            </div>
            <!-- the catagory lists container-->
            <div class="w-3/4 flex h-64 overflow-y-scroll pr-0 flex-col gap-2 mt-4 items-center " v-if="useProductStore.$state.product_catagorys">
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
            <div class="w-full mt-5 flex flex-col gap-2 justify-center">
                <!-- the first  -->
                <div>
                    <!-- container -->
                    <div class="ml-auto w-fit flex gap-2 items-center h-fit">
                        <!-- the search input -->
                        <div class="relative w-fit h-fit">
                            <input 
                            class="border bg-gray-100 rounded-full w-24 py-1 px-2 pl-7 relative outline-none focus:bg-gray-200" type="text" placeholder="Search..."
                            data-te-toggle="modal"
                            data-te-target="#searchProductFixedBackground"
                            >
                            <div class="absolute left-[7px] top-2 text-gray-500 text-sm">
                                <i class="fa-solid fa-search"></i>
                            </div>
                        </div>
                        <!-- the limit input -->
                        <div class="flex items-center justify-center">
                            <select
                            name="pageLimit" id="pageLilmit"
                            class="w-28 py-[9px] text-gray-600 border-[1px] bg-gray-100 cursor-pointer border-gray-50 px-2 rounded-md text-center transition duration-200"
                            @change="handleChange"
                            >
                                <option value="1">1</option>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                        </div>
                    </div>
                </div>
                <!-- the title -->
                <div class="font-Roboto font-bold text-2xl" v-if="catagory_controller.length==0">
                    <span class="text-secondary">5000+</span> Products
                </div>
                <!-- the other one -->
                <div class="font-Roboto font-bold text-2xl" v-else>
                    <span class="text-secondary">{{ catagory_controller }}</span> Result
                </div>
            </div>
            <!-- the product content -->
            <TransitionGroup tag="div" name="products" class="w-full h-fit grid grid-cols-3 gap-4 overflow-y-scroll py-4 px-2" v-if="useProductStore.$state.products">
                <div v-for="product in useProductStore.$state.products" :key="product._id" 
                class="w-full h-72 relative rounded-md shadow-md overflow-hidden transition transform duration-300 hover:scale-105"
                >
                    <product-card :product="product" @add-to-cart="changeTheAddToProduct" @rate-product="changeRatingProduct"/>
                </div>
            </TransitionGroup>
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
            <!-- the empty one -->
            <Transition tag="div" 
            name="empty"
            class="w-full h-fit flex items-center justify-center" 
            v-if="useProductStore.$state.products.length==0 && useProductStore.$state.network_error==false && useProductStore.$state.isProductsLoading==false"
            >
            <shareble-empty/>
            </Transition>  
        </div>
        <teleport to='body'>
            <product-add-to-cart :productInfo="product_controller"/>
        </teleport>
        <teleport to='body'>
                    <product-rating :productInfo="rating_product" />
        </teleport>
        <teleport to='body'>
            <ProductSearch/>
        </teleport>
    </div>
    <!-- <AnimatePlaceHolderArea/> -->
</template>