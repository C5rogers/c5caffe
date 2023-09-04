<script setup>
import {Ripple,Modal,initTE,Select} from "tw-elements";


const useProductStore=productStore()
onMounted(async()=>{
    initTE({
        Ripple,
        Modal,
        Select
    })
    await useProductStore.searchProduct(search_value.value)
})

const handleDescription=(description)=>{
    if(description.length<50){
        return description+'...'
    }else{
        return description.substring(0,50)+'...'
    }
}

const search_value=ref('')

const searchProduct=async()=>{
    await useProductStore.searchProduct(search_value.value)
}

const handleReload=async()=>{
    useProductStore.resetSearchNetworkError()
    await useProductStore.searchProduct(search_value.value)
}

const resetSearch=async()=>{
    search_value.value=''
    useProductStore.resetNetworkError()
    await useProductStore.searchProduct(search_value.value)
}

const router=useRouter()

const handleNavigation=(product_id)=>{
    search_value.value=''
    router.push(`/product/:${product_id}`)
}

const parseToNumber=(number)=>{
    const parsed=Number(number)
    if(!isNaN(parsed)) {
        return parsed
    }
    return 0
}

const handleChangePage=async(pagenumber)=>{
    useProductStore.setSearchingProductCurrentPage(pagenumber)
    await useProductStore.searchProduct(search_value.value)
}
</script>
<template>
    <div
    data-te-modal-init
    class="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
    id="searchProductFixedBackground"
    data-te-backdrop="static"
    data-te-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
    >
        <!-- the modal -->
        <div
        data-te-modal-dialog-ref
        class="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 sm:min-[576px]:max-w-[500px] min-[650px]:max-w-[750px]"
        >
            <div
            class="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600"
            >
                <!-- the title holder -->
                <div
                 class="flex flex-shrink-0 gap-3 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50"
                >
                    <!-- the left one -->
                    <div class="w-fit flex items-center">
                         <!-- the logo -->
                        <div class="1-10 h-10 flex items-center justify-center rounded-full overflow-hidden">
                            <img src="../../assets/images/restlogo.png" class="w-full h-full object-cover" alt="">
                        </div>
                        <!-- the title -->
                        <div class="text-xl font-Roboto capitalize">
                            {{ $t('products') }} {{ $t('search') }}
                        </div>
                    </div>
                    <!-- exit button -->
                    <!--Close button-->
                    <button
                    type="button"
                    class="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                    data-te-modal-dismiss
                    aria-label="Close">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="h-6 w-6 text-red-500">
                        <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    </button>
                </div>

                <!-- the body -->
                <div 
                data-te-modal-body-ref
                class="relative p-4 flex flex-col items-center gap-4 min-h-[30em] max-h-[40em] font-Roboto"
                >
                    <!-- the input -->
                    <div class="w-full relative">
                        <input type="text"
                        class="w-full border py-2 text-xl font-light outline-none bg-gray-50 px-10 rounded-md focus:bg-gray-200 transition duration-200"
                        placeholder="Search Product..."
                        v-model="search_value"
                        @input="searchProduct"
                        >
                        <div class="absolute left-3 top-3 text-gray-500 text-sm">
                                <i class="fa-solid fa-search"></i>
                        </div>
                        <!-- the cliear button -->
                        <button
                        class="absolute right-3 top-3 text-gray-500 text-sm"
                        @click="resetSearch"
                        v-show="search_value.length>0"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="h-6 w-6 text-gray-500">
                                <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <!-- result container -->
                    <div v-if="useProductStore.$state.searchedProducts.length>0 && useProductStore.$state.isSearchingProductsLoading==false && useProductStore.$state.searchNetworkError==false"
                    class="w-full max-h-[38em] overflow-y-scroll"
                    > 
                        <ul class="w-full h-fit flex flex-col gap-1 items-center">
                            <li v-if="useProductStore.$state.searchedProducts.length>0"
                                v-for="product in useProductStore.$state.searchedProducts"
                                :key="product._id"
                                @click="handleNavigation(product._id)"
                                class="w-full h-fit rounded-md flex gap-3 bg-gray-100 py-1 px-2 cursor-pointer transition duration-200 hover:bg-gray-200 items-center "
                                data-te-modal-dismiss
                            >
                                <div class="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
                                    <img :src="product.image" class="w-full h-full object-cover" :alt="product.name"/>
                                </div>
                                <!-- the other one -->
                                <div
                                class="w-full h-full m-1 flex flex-col gap-[2px] justify-center"
                                >
                                    <!-- the name -->
                                    <div class="text-gray-600 capitalize font-light text-xl">
                                        {{ product.name }}
                                    </div>
                                    <!-- some description -->
                                    <div class="text-xs text-gray-500 font-light">
                                        {{ handleDescription(product.description) }}
                                    </div>
                                </div>
                            </li>
                        </ul>

                    </div>
                    <!-- when the search is loading -->
                    <div 
                    class="w-full max-h-[38em] overflow-y-scroll"
                    v-if="useProductStore.$state.isSearchingProductsLoading==true">
                        <AnimationsProductSearch/>
                    </div>
                    <!-- when no search product -->
                    <div v-if="useProductStore.$state.searchedProducts.length==0">
                        <SharebleEmpty/>
                    </div>
                    <!-- network error -->
                    <div v-if="useProductStore.$state.searchNetworkError==true && useProductStore.$state.isSearchingProductsLoading==false ">
                        <NetworkError @reload="handleReload" />
                    </div>
                </div>
                <!-- the pagination footer -->
                <div
                class="flex flex-shrink-0 flex-wrap items-center justify-center rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50"
                >   
                    <ShareblePagination
                    :initial-page="parseToNumber(useProductStore.$state.searchCurrentPage)"
                    :total-pages="parseToNumber(useProductStore.$state.searchTotalProductPages)"
                    @change_page="handleChangePage"
                    v-if="useProductStore.$state.searchedProducts.length>0"
                    />

                </div>

            </div>

        </div>

    </div>
</template>