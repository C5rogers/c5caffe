<script setup>

import {Ripple,initTE} from 'tw-elements'
import {useToast} from 'vue-toastification'

const toast=useToast()
const useAdminActionStore=adminProductAndCatagoryStore()

onMounted(async()=>{
    await useAdminActionStore.getProducts('')
    await useAdminActionStore.getCatagorys()
    initTE({
        Ripple
    })
})

const forCatagoryDeleteConfirmation=ref({
    identifier:{},
    title:"",
    message:""
})

const router=useRouter()

const handleGoCreateProduct=()=>{
    router.push('/admin/product/create')
}

const handleDeleteCatagoryResult=async(result)=>{
    if(result.confirmation_result==true){
        const res=await useAdminActionStore.deleteCatagory(result.identifier._id)
        if(res==true){
            await useAdminActionStore.getCatagorys()
            toast.success(`${result.identifier.catagory} is removed successfully!`)
            if(useAdminActionStore.$state.success_message){
                toast.success(useAdminActionStore.$state.success_message)
                useAdminActionStore.resetSuccessMessage()
            }
        }else{
            toast.error(`Unable to delete ${result.identifier.catagory} from the site`,{
                position:'bottom-right'
            })
            if(useAdminActionStore.$state.error_message){
                toast.error(useAdminActionStore.$state.error_message,{
                    position:'bottom-right'
                })
                useAdminActionStore.resetErrorMessage()
            }
        }
    }
}
const confirmDeleteCatagory=(catagory)=>{
    forCatagoryDeleteConfirmation.value.identifier=catagory
    forCatagoryDeleteConfirmation.value.title=`Deleting ${catagory.catagory} from the site`
    forCatagoryDeleteConfirmation.value.message=`Are you shure you want to delete ${catagory.catagory} from catagory lists that this site give to its clients?`
}

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
                    @click="handleGoCreateProduct"
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
                    @click="handleGoCreateProduct"
                    data-te-ripple-color="light"
                    class="inline-block rounded bg-green-600 px-4 py-1 w-full text-sm font-medium leading-normal text-white transition duration-150 ease-in-out hover:bg-green-700 focus:bg-primary-600  focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    >Add</button>
                </div>
            </div>
            <!-- catagory lists -->
            <div class="w-full min-h-[55vh] overflow-y-auto flex flex-wrap gap-3 mt-2">
                <div
                class=" w-fit px-2  flex gap-2 items-center py-1 rounded-full hover:bg-secondary hover:text-white transition duration-200 border-[1px] border-secondary first-letter:capitalize text-xs"
                v-for="catagory in useAdminActionStore.$state.catagorys"
                :key="catagory._id"
                >
                    <div>
                        <span>
                            {{ catagory.catagory }}
                        </span>
                    </div>
                    
                    <div class="flex gap-[2px]">
                        <button
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        class="flex items-center justify-center p-2 rounded-full border-[1px] border-green-600 "
                        >
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" 
                                class="w-3 h-3"
                                viewBox="0 0 512 512">
                                    <path fill="currentColor" d="m497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4L.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3l262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3l-31.1-31.1L51.7 376H88v48z"/>
                                </svg>
                            </span>
                        </button>
                        <button
                        data-te-toggle="modal"
                        data-te-target="#rightTopModal"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        @click="confirmDeleteCatagory(catagory)"
                        class=" flex items-center justify-center p-2 rounded-full border border-red-600"
                        >
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" 
                                class="w-3 h-3" 
                                viewBox="0 0 448 512">
                                    <path fill="currentColor" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"/>
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <teleport to="body">
        <SharebleConfirmationModal 
        :left-mode="false"  
        :title="forCatagoryDeleteConfirmation.title"
        :identifier="forCatagoryDeleteConfirmation.identifier"
        :message="forCatagoryDeleteConfirmation.message"
        @confirmation-result="handleDeleteCatagoryResult"
        />
    </teleport>
</template>