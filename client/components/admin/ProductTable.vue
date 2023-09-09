<script setup>
import {Select,Ripple,initTE,Input} from 'tw-elements'
import {useToast} from 'vue-toastification'

const toast=useToast()
const search_controller=ref("")
const page_controller=ref(5)
const router=useRouter()

const forProductDeleteConfirmation=ref({
    identifier:{},
    title:"",
    message:""
})

onMounted(()=>{
    initTE({
        Select,
        Ripple,
        Input
    })
})

const resetSearch=async()=>{
    search_controller.value=''
    await useAdminActionStore.getProducts('')
}

const handleChange=async()=>{
    useAdminActionStore.setProductsPageLimit(page_controller.value)
    await useAdminActionStore.getProducts(search_controller.value)
}
const useAdminActionStore=adminProductAndCatagoryStore()
const handleDescription=(description)=>{
    if(description.length<=30){
        return description+'...'
    }else{
        return description.substring(0,30)+'...'
    }
}

const handleChangePage=async(page)=>{
    useAdminActionStore.setProductsCurrentPage(page)
    await useAdminActionStore.getProducts(search_controller.value)
}
const handleSearch=async()=>{
    await useAdminActionStore.getProducts(search_controller.value)
}
const handleDate=(date)=>{
    return date.substring(0,10)
}
const parseToNumber=(price)=>{
    const parsed=Number(price)
    if(isNaN(parsed)){
        return 0
    }else{
        return parsed
    }
}

const confirmProductDeletion=(product)=>{
    forProductDeleteConfirmation.value.identifier=product,
    forProductDeleteConfirmation.value.title=`Deleting ${product.name} from the site`
    forProductDeleteConfirmation.value.message=`Are you really shure to remove ${product.name} from the site that provide this product for its clients?`
}
const handleConfirmedProductDeletion=async(result)=>{
    if(result.confirmation_result==true){
        const res=await useAdminActionStore.deleteProduct(result.identifier._id)
        if(res==true){
            toast.success(`You deleted ${result.identifier.name} from the site successfully`,{
                position:'top-left'
            })
            if(useAdminActionStore.$state.success_message){
                toast.success(useAdminActionStore.$state.success_message,{
                    position:'top-left'
                })
                useAdminActionStore.resetSuccessMessage()
            }
        }else{
            toast.error(`Unable to delete ${result.identifier.name} from site`,{
                position:'bottom-left'
            })
            if(useAdminActionStore.$state.error_message){
                toast.error(useAdminActionStore.$state.error_message,{
                    position:'bottom-left'
                })
                useAdminActionStore.resetErrorMessage()
            }
        }
    }
}

const goToEditProduct=(product_id)=>{
    router.push(`/admin/product/edit/${product_id}`)
}
</script>

<template>
    <!-- the product container -->
    <div 
    class="w-full h-full overflow-y-auto flex flex-col gap-1"
    >
        <div class="w-full flex justify-between p-2">
            <!-- the pagination option -->
            <div>
                <select
                data-te-select-init
                name="pageLimit" id="ProductPageLimit"
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
            <!-- the search input -->
            <div class="relative w-[35%] h-fit">
                <input type="text"
                v-model="search_controller"
                placeholder="Search..."
                @input="handleSearch"
                class="w-full py-2 rounded-md text-gray-600 border-[1px] transition duration-300 font-light px-8 bg-gray-100 focus:bg-gray-200 active:bg-gray-200 outline-none"
                >
                <div class="absolute left-2 top-3 text-gray-500 text-sm">
                        <i class="fa-solid fa-search"></i>
                </div>
                <!-- the cliear button -->
                <button
                class="absolute right-3 top-2 text-gray-500 text-sm"
                @click="resetSearch"
                v-show="search_controller.length>0"
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
        </div>
        <div class="w-full h-full flex flex-col gap-1 ">
            <!-- the titles -->
            <div class="w-full grid gap-1 py-2 px-1 grid-cols-6 bg-gray-100 rounded">
                <!-- the first one -->
                <div class="font-bold text-gray-600 col-span-2">
                    Product
                </div>
                <div class="font-bold text-gray-600">
                    Price
                </div>
                <div class="font-bold text-gray-600">
                    Catagory
                </div>
                <div class="font-bold text-gray-600">
                    Rating
                </div>
                <div class="font-bold text-gray-600">
                    Actions
                </div>
            </div>
            <!-- the products -->
            <div class="w-full min-h-[55vh] overflow-y-auto flex flex-col gap-[2px]" v-if="useAdminActionStore.$state.products.length>0 && useAdminActionStore.$state.is_products_loading==false && useAdminActionStore.$state.products_network_error==false">
                <div 
                class="w-full grid border-b-[1px] gap-1 py-2 grid-cols-6 transition duration-200 rounded hover:bg-gray-50"
                v-for="product in useAdminActionStore.$state.products"
                :key="product._id"
                >
                    <!-- the product -->
                    <div class="flex col-span-2 items-center gap-1">
                        <!-- the image -->
                        <div class="w-10 h-10 flex justify-center items-center overflow-hidden rounded-md">
                            <img :src="product.image" class="w-full h-full object-cover" :alt="product.name">
                        </div>
                        <!-- some discriptions -->
                        <div class="flex flex-col gap-0 justify-center">
                            <!-- the name -->
                            <div class="font-bold text-gray-700 first-letter:capitalize">
                                {{ product.name }}
                            </div>
                            <!-- the description -->
                            <div class="text-xs -mt-1 first-letter:capitalize text-gray-500">
                                {{ handleDescription(product.description) }}
                            </div>
                            <!-- date -->
                            <div class="text-xs flex items-center gap-1 first-letter:capitalize text-gray-500">
                                <span class="h-2 w-2 rounded-full bg-green-500">

                                </span>
                                {{ handleDate(product.created_at) }}
                            </div>
                        </div>
                    </div>
                    <!-- the price -->
                    <div class="text-gray-700 h-full flex items-center font-light">
                        {{ product.price }} $
                    </div>
                    <!-- the catagory -->
                    <div class="h-full flex items-center">
                        <div class="w-fit h-fit rounded-full bg-green-400 text-white first-letter:capitalize text-xs px-1">
                            {{ product.catagory.catagory }}
                        </div>
                    </div>
                    <!-- the rating -->
                    <div class="h-full flex items-center">
                        <SharebleFiveStartRating :rating-value="product.average_rating" />
                    </div>
                    <!-- the actions -->
                    <div class="h-full flex gap-1 items-center">
                        <button
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        @click="goToEditProduct(product._id)"
                        class="flex px-2 text-white gap-1 items-center justify-center bg-green-600 py-1 rounded"
                        >
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" 
                                class="w-3 h-3"
                                viewBox="0 0 512 512">
                                    <path fill="currentColor" d="m497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4L.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3l262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3l-31.1-31.1L51.7 376H88v48z"/>
                                </svg>
                            </span>
                            <span class="text-xs">
                                Edit
                            </span>
                        </button>
                        <button
                        data-te-toggle="modal"
                        data-te-target="#leftTopModal"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        @click="confirmProductDeletion(product)"
                        class="flex px-2 text-white gap-1 items-center justify-center bg-red-400 py-1 rounded"
                        >
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" 
                                class="w-3 h-3" 
                                viewBox="0 0 448 512">
                                    <path fill="currentColor" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"/>
                                </svg>
                            </span>
                            <span class="text-xs">
                                Delete
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="w-full h-[55vh] flex justify-center items-center" v-else-if="useAdminActionStore.$state.products.length==0 && useAdminActionStore.$state.is_products_loading==false && useAdminActionStore.$state.products_network_error==false">
                <SharebleEmpty />
            </div>
            <!-- the pagination holder -->
            <div class="w-full flex justify-end"
            v-if="useAdminActionStore.$state.products.length>0 && useAdminActionStore.$state.is_products_loading==false && useAdminActionStore.$state.products_network_error==false"
            >
                <ShareblePagination :small-mode="true" :total-pages="parseToNumber(useAdminActionStore.$state.products_total_page)" :initial-page="parseToNumber(useAdminActionStore.$state.products_current_page)" :page-limit="4" @change_page="handleChangePage"/>
            </div>
        </div>
    </div>
    <!-- the animation -->
    <div v-if="useAdminActionStore.$state.is_products_loading==true && useAdminActionStore.$state.products_network_error==false">

    </div>
    <!-- the network error -->
    <div v-else-if="useAdminActionStore.$state.products_network_error==true">

    </div>
    <teleport to="body">
        <SharebleConfirmationModal
        :left-mode="true"
        :title="forProductDeleteConfirmation.title"
        :identifier="forProductDeleteConfirmation.identifier"
        :message="forProductDeleteConfirmation.message"
        @confirmation-result="handleConfirmedProductDeletion"
        />
    </teleport>
</template>