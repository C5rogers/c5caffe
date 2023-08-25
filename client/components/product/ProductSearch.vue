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

const search_value=ref('')

const searchProduct=async()=>{
    console.log(search_value.value)
    await useProductStore.searchProduct(search_value.value)
}

const handleReload=()=>{

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
                            Search Products
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
                        class="w-full border px-3 py-2 text-xl font-light outline-none bg-gray-50 pl-10 rounded-md focus:bg-gray-100 transition duration-200"
                        placeholder="Search Product..."
                        v-model="search_value"
                        @input="searchProduct"
                        >
                    </div>
                    <!-- result container -->
                    <div v-if="useProductStore.$state.searchedProducts.length>0 && useProductStore.$state.isSearchingProductsLoading==false && useProductStore.$state.searchNetworkError==false"
                    class="w-full max-h-[38em] overflow-y-scroll"
                    > 
                        <ul class="w-full h-fit flex flex-col gap-1 items-center">
                            <li v-if="useProductStore.$state.searchedProducts.length>0"
                                v-for="product in useProductStore.$state.searchedProducts"
                                :key="product._id"
                                class="w-full h-fit rounded-md flex gap-3 bg-gray-50 py-1 px-2 cursor-pointer transition duration-200 hover:bg-gray-100 items-center "
                            >
                                <div class="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
                                    <img :src="product.image" class="w-full h-full object-cover" :alt="product.name"/>
                                </div>
                            </li>
                        </ul>

                    </div>
                    <!-- when the search is loading -->
                    <div v-if="useProductStore.$state.isSearchingProductsLoading==true">

                    </div>
                    <!-- when no search product -->
                    <div v-if="useProductStore.$state.searchedProducts.length==0">
                        <SharebleEmpty/>
                    </div>
                    <!-- network error -->
                    <div v-if="useProductStore.$state.searchNetworkError==true">
                        <NetworkError @reload="handleReload" />
                    </div>
                </div>

            </div>

        </div>

    </div>
</template>