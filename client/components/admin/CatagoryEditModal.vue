<script setup>
import {
  Modal,
  Ripple,
  initTE,
} from "tw-elements";
import { Form,Field } from 'vee-validate'
import * as yup from 'yup'
import {useToast} from 'vue-toastification'

const useAdminActionStore=adminProductAndCatagoryStore()
const toast=useToast()
const schema=yup.object().shape({
    catagory:yup.string().required().default(props.catagoryInfo.catagory)
})


const handleUpdateProductCatagory=async(value)=>{
    console.log(value)
    const payload={
        catagory_id:props.catagoryInfo._id,
        form:{
            catagory:value.catagory
        }
    }
    const result=await useAdminActionStore.editCatagorys(payload)
    if(result==true){
        if(useAdminActionStore.$state.success_message){
            toast.success(useAdminActionStore.$state.success_message)
            useAdminActionStore.resetSuccessMessage()
        }else {
            toast.success(`${props.catagoryInfo.catagory} updated successfully!`)
        }
        await useAdminActionStore.getCatagorys()
    }else{
        if(useAdminActionStore.$state.error_message){
            toast.error(useAdminActionStore.$state.error_message,{
                position:'bottom-right'
            })
            useAdminActionStore.resetErrorMessage()
        }else{
            toast.error(`Unable to update ${props.catagoryInfo.catagory} due to some errors`,{
                position:'bottom-right'
            })
        }
    }
}


const props=defineProps({
    catagoryInfo:{
        type:Object,
        required:true
    },
    title:{
        type:String
    }
})


</script>

<template>
    <!-- the top right modal -->
    <div
    data-te-modal-init
    class="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
    id="catagoryUpdateModal"
    tabindex="-1"
    aria-labelledby="catagoryUpdateModalLabel"
    aria-hidden="true">
        <!-- the dialog box -->
        <div
        data-te-modal-dialog-ref
        class="pointer-events-none absolute right-7 h-auto w-full translate-x-[100%] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]"
        >
            <div
            class="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600"
            >
                <!-- the title holder -->
                <div
                class="flex flex-shrink-0 items-center justify-between rounded-t-md bg-blue-200 p-4 dark:border-b dark:border-neutral-500 dark:bg-transparent"
                >
                     <!-- the left one -->
                    <div class="w-fit flex items-center">
                         <!-- the logo -->
                        <div class="1-10 h-10 flex items-center justify-center rounded-full overflow-hidden">
                            <img src="../../assets/images/restlogo.png" class="w-full h-full object-cover" alt="">
                        </div>
                        <!-- the title -->
                        <div class="sm:text-xl font-Roboto capitalize">
                            {{ title }}
                        </div>
                    </div>
                    <!-- the x button -->
                    <button
                    type="button"
                    class="box-content rounded-none border-none text-gray-500 hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                    data-te-modal-dismiss
                    aria-label="Close">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="h-6 w-6">
                            <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <!-- the body holder -->
                <div class="relative flex flex-auto flex-wrap justify-center p-4" data-te-modal-body-ref>
                    <!-- the notificaion icon -->
                    <span class="text-secondary [&>svg]:h-16 [&>svg]:w-14">
                        <svg xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24"
                            fill="currentColor">
                            <path fill="currentColor" d="M136.6 138.79a64.003 64.003 0 0 0-43.31 41.35L0 460l14.69 14.69L164.8 324.58c-2.99-6.26-4.8-13.18-4.8-20.58c0-26.51 21.49-48 48-48s48 21.49 48 48s-21.49 48-48 48c-7.4 0-14.32-1.81-20.58-4.8L37.31 497.31L52 512l279.86-93.29a64.003 64.003 0 0 0 41.35-43.31L416 224L288 96l-151.4 42.79zm361.34-64.62l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55l128.02 128.02l56.55-56.55c18.75-18.75 18.75-49.15 0-67.91z"/>
                        </svg>
                    </span>
                    <!-- the form -->
                    <div class="w-full h-fit flex">
                        <Form @submit="handleUpdateProductCatagory" :validation-schema="schema" v-slot="{errors}"
                        class="w-full flex flex-col font-Roboto gap-2 justify-center"
                        >
                            <!-- the form cont -->
                            <div class="w-full flex flex-col gap-1 relative">
                                <!-- the label -->
                                <FormLabel title="catagory" />
                                <!-- the input holder -->
                                <div class="w-full relative">
                                    <Field name="catagory" type="text" placeholder="Sweets" class="formInput focus:bg-gray-200" />
                                    <InputErrorMark v-if="errors.catagory" />
                                    <!-- the error message -->
                                    <div class="formErrorMessage" v-if="errors.catagory">
                                        {{ errors.catagory }}
                                    </div>
                                </div>
                            </div>
                            <!-- the other form cont -->
                            <div class="w-full flex gap-1 mt-1">
                                <button
                                data-te-ripple-init
                                data-te-ripple-color="light"
                                data-te-modal-dismiss
                                type="submit"
                                :disabled="errors.catagory"
                                class="w-full py-2 px-2 bg-black rounded-md text-white first-letter:capitalize text-xs font-bold"
                                >
                                    Update
                                </button>
                            </div>
                        </Form>
                    </div>
                </div>
                <!-- the footer -->
                <div
                class="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50"
                >
                    <!-- the exit button -->
                    <button
                        type="button"
                        class="inline-block rounded bg-secondary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                        data-te-modal-dismiss
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        >
                        Exit
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>