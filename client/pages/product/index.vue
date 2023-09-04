<script setup>
import {storeToRefs} from 'pinia'
import {Ripple,initTE,Select,Carousel} from "tw-elements";

const product_controller=ref({})
const rating_product=ref({})
const rating_product_catagory=ref({})
const animation_trigger_controller=ref(false)
const product_animation_trigger_controller=ref(false)
const useProductStore=productStore()
const page_controller=ref(5)
const {products}=storeToRefs(useProductStore)
const useAuthStore=authStore()

const catagory_controller=ref('')
onMounted(async() => {
    catagory_controller.value=''
    if(useProductStore.$state.products.length==0){
        useProductStore.setProeductPageLimit(page_controller.value)
       await useProductStore.fetchProducts('')
    }
    initTE({
        Select,
        Ripple,
        Carousel
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
    product_animation_trigger_controller.value=true
    setTimeout(() => {
        product_animation_trigger_controller.value=false
    }, 3000);
}

const handleChange=async()=>{
    const number=Number(page_controller.value)
    if(!isNaN(number)){
        useProductStore.setProeductPageLimit(number)
        await useProductStore.fetchProducts(catagory_controller.value)
    }
}
const handleRateCatagory=async(catagory_name)=>{
   const catagory_Rating= useProductStore.filterFromProductCatagory(catagory_name)
   rating_product_catagory.value=catagory_Rating
   animation_trigger_controller.value=true
   setTimeout(() => {
    animation_trigger_controller.value=false
   }, 3000);
}


const handleReloadData=async ()=>{
    useProductStore.resetNetworkError()
    await useProductStore.fetchProducts(catagory_controller.value)
}

</script>

<template>
    <Head>
        <Title>
            C5 Online Caffe | Products
        </Title>
        <Meta name="description" content="This is where all the products are avelable to be sold by the C5 online caffe which the user can select and add to its own cart then letter purchase it" />
    </Head>
    <div class="h-screen relative w-full flex flex-col gap-1 md:flex-row mt-1">
        <!-- the top one -->
        <div
        class="w-full flex flex-wrap md:hidden items-center px-5 py-1  mt-2 justify-center"
        >
           <!-- the button container -->
           <div class="w-full flex flex-wrap gap-1 items-center justify-center" v-if="useProductStore.$state.product_catagorys.length>0">
                <button
                class="w-fit py-1 px-2 border-[1px] text-gray-900 font-light border-secondary flex items-center justify-center rounded-full text-xs"
                :class="{'bg-secondary text-white':catagory_controller==''}"
                @click="filterByCatagory('')"
                >
                    {{ $t('all') }}
                </button>
                <button
                v-for="catagory in useProductStore.$state.product_catagorys"
                :key="catagory._id"
                class="w-fit py-1 px-2 border-[1px] text-gray-900  border-secondary flex items-center justify-center rounded-full text-xs"
                :class="{'bg-secondary text-white':catagory_controller==catagory.catagory}"
                @click="filterByCatagory(catagory.catagory)"
                >
                    {{ catagory.catagory }}
                </button>
           </div>
           <div class="w-3/4 flex flex-wrap gap-1 mt-4 items-center justify-center" v-else>
               <!-- show the animation here -->
               <AnimationsCatagorys/>
            </div>
        </div>
        <!-- the mobile product container -->
        <div class="flex flex-col px-3 py-1 w-full items-center justify-center md:hidden" v-if="useProductStore.$state.products.length>0 && useProductStore.$state.isProductsLoading==false">
            <!-- the upper header -->
            <div class="w-full mt-1 flex flex-col gap-2 justify-center">
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
                            v-model="page_controller"
                            >
                                <option value="5">5</option>
                                <option value="15">15</option>
                                <option value="30">30</option>
                                <option value="50">50</option>
                                <option value="70">70</option>
                                <option value="100">100</option>
                            </select>
                        </div>
                    </div>
                </div>
                <!-- the title -->
                <div class="font-Roboto font-bold text-lg" v-if="catagory_controller.length==0">
                    <span class="text-secondary">5000+</span> {{ $t('product') }}
                </div>
                <!-- the other one -->
                <div class="font-Roboto font-bold text-lg" v-else>
                    <span class="text-secondary">{{ catagory_controller }}</span> Result
                </div>
            </div>
            <!-- product container -->
            <div class="w-full h-fit grid sm:grid-cols-2 gap-3 overflow-scroll  py-4 px-5" v-if="useProductStore.$state.products">
                <div v-for="product in useProductStore.$state.products" :key="product._id" 
                class="w-full h-72 relative rounded-md shadow-md overflow-hidden transition transform duration-300 hover:scale-105"
                >
                    <product-card :product="product" @add-to-cart="changeTheAddToProduct" @rate-product="changeRatingProduct"/>
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
            <!-- the empty one -->
            <Transition tag="div" 
            name="empty"
            class="w-full h-fit flex items-center justify-center" 
            v-if="useProductStore.$state.products.length==0 && useProductStore.$state.network_error==false && useProductStore.$state.isProductsLoading==false"
            >
                <shareble-empty/>
            </Transition>
            <!-- the footer -->
            <div class="w-full mt-3 mb-2 flex items-center justify-center py-1 px-3 text-gray-700 font-Roboto capitalize ">
                2015 E.C | {{ $t('c5') }} {{ $t('online caffe') }}
            </div>
        </div>
        <div 
        class="flex md:hidden flex-col gap-1 px-5 py-1"
        v-else-if="useProductStore.$state.isProductsLoading==true">
            <AnimationsProducts/>
        </div>
        <!-- the left one -->
        <div class="hidden w-1/4 fixed left-2 top-20 bottom-1 overflow-y-scroll py-5 md:flex flex-col items-center gap-2 pl-1 border-r ">
            <!-- the title one -->
            <div class="text-2xl w-full font-Roboto font-bold text-secondary">
                {{ $t('catagorys') }}:
            </div>
            <!-- the catagory lists container-->
            <div class="w-3/4 flex h-64 overflow-y-scroll pr-0 flex-col gap-2 mt-4 items-center " v-if="useProductStore.$state.product_catagorys.length>0">
                <button
                class="w-full border-l-4 pl-5 flex items-center text-left border-gray-200 hover:text-secondary transition duration-200 hover:border-secondary"
                @click="filterByCatagory('')"
                :class="{'border_secondary text-secondary border-secondary':catagory_controller==''}"
                >
                    {{ $t('all') }}
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
            <div class="w-3/4 flex flex-col gap-1 mt-4 items-center justify-center" v-else-if="useProductStore.$state.network_error==false && useProductStore.$state.isProductsLoading==true">
                <!-- show the empty catagory lists -->
                <AnimationsCatagorys/>
            </div>
            <!-- else -->
            <div
            class="w-3/4 flex flex-col gap-1 mt-4 items-center justify-center"
            v-else-if="useProductStore.$state.network_error==true"
            >
                <NetworkError @reload="handleReloadData" />
            </div>
        </div>
        <!-- the right one -->
        <div class="hidden w-full h-fit relative mt-10 px-5 md:px-0 md:w-3/4 ml-auto md:flex flex-col gap-2 " v-if="useProductStore.$state.products.length>0&&useProductStore.$state.isProductsLoading==false">
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
                            v-model="page_controller"
                            >
                                <option value="5">5</option>
                                <option value="15">15</option>
                                <option value="30">30</option>
                                <option value="50">50</option>
                                <option value="70">70</option>
                                <option value="100">100</option>
                            </select>
                        </div>
                    </div>
                </div>
                <!-- the title -->
                <div class="font-Roboto font-bold text-2xl" v-if="catagory_controller.length==0">
                    <span class="text-secondary">5000+</span> {{ $t('product') }}
                </div>
                <!-- the other one -->
                <ProductCatagoryName :name="catagory_controller" @handle_rate_product_catagory="handleRateCatagory" v-else-if="useAuthStore.$state.isAuthed==true"/>
                <div
                class="font-Roboto font-bold text-2xl"
                v-else
                >
                    <span class="text-secondary">{{ catagory_controller }}</span>
                </div>
            </div>
            <!-- the product content -->
            <TransitionGroup tag="div" name="products" class="w-full h-full  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 overflow-y-scroll md:gap-4 py-4 px-2" v-if="useProductStore.$state.products">
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
            <div class="w-full mt-3 mb-2 flex items-center justify-center py-1 px-3 text-gray-700 font-Roboto capitalize ">
                2015 E.C | {{ $t('c5') }} {{ $t('online caffe') }}
            </div>
        </div>
        <div class="hidden w-full h-fit relative mt-10 px-5 md:px-0 md:w-3/4 ml-auto md:flex flex-col gap-2 " v-else-if="useProductStore.$state.isProductsLoading==true">
            <!-- show the animation here -->
            <AnimationsProducts/>
        </div>
        <!-- the empty one -->
        <div
            class="w-full lg:w-3/4 min-h-[30em] flex items-center ml-auto justify-center" 
            v-if="useProductStore.$state.products.length==0 && useProductStore.$state.network_error==false && useProductStore.$state.isProductsLoading==false"
            >
            <shareble-empty/>
        </div>  
        <div
        class="w-full lg:w-3/4 min-h-[30em] flex flex-col items-center ml-auto justify-center" 
        v-else-if="useProductStore.$state.network_error==true"
        >
            <NetworkError @reload="handleReloadData" />
        </div>
        <teleport to='body'>
            <product-add-to-cart :productInfo="product_controller"/>
        </teleport>
        <teleport to='body'>
                    <product-rating :animation-trigger="product_animation_trigger_controller" :productInfo="rating_product" />
        </teleport>
        <teleport to='body'>
            <ProductSearch/>
        </teleport>
        <teleport to="body">
            <ProductCatagoryRating :trig-animation="animation_trigger_controller" :catagory-info="rating_product_catagory" />
        </teleport>
    </div>
    <!-- <AnimatePlaceHolderArea/> -->
</template>