<script setup>
import {Form,Field} from 'vee-validate'
import * as yup from 'yup'
import {Modal,initTE,Ripple} from 'tw-elements'
import ClipboardJS from 'clipboard'


const is_copyed=ref(false)
const copyToClipboard=()=>{
    const clipboard=new ClipboardJS('.copy-button',{
        text:()=>formController.value.username
    })
    clipboard.on('success',()=>{
        is_copyed.value=true
        setTimeout(() => {
            is_copyed.value=false
        }, 3000);
    })
    clipboard.on('error',()=>{
        is_copyed.value=false
    })
    clipboard.onClick({ currentTarget: document.body })

}

const schema=yup.object().shape({
    username:yup.string().required("you must inter the correct name of the user to confirm!")
})


const resetFormField=()=>{
    formController.value.message=''
    formController.value.title=''
    formController.value.username=''
    formController.value.warning=''
}

onMounted(()=>{
    initTE({
        Modal,
        Ripple
    })
})

const props=defineProps({
    userInformation:{
        typ:Object,
        required:true
    },
    title:{
        type:String,
    },
    message:{
        type:String
    },
    reload:{
        type:Boolean,
        default:false
    },
    warning:{
        type:String
    }
})

const formController=ref({
    title:'',
    message:'',
    username:'',
    warning:''
})

watch(()=>props.reload,(newValue)=>{
    if(newValue){
        formController.value.title=props.title
        formController.value.message=props.message
        formController.value.username=props.userInformation.username
        formController.value.warning=props.warning
    }
})

watch(()=>props.userInformation,(newValue)=>{
    if(newValue){
        resetFormField()
        formController.value.title=props.title
        formController.value.message=props.message
        formController.value.username=props.userInformation.username
        formController.value.warning=props.warning
    }
})

const emit=defineEmits(['delete_user_confirmation_result'])

const handleConfirmation=(value)=>{
    let confirmation_result=false
    if(value.username==formController.value.username){
        confirmation_result=true
    }
    emit('delete_user_confirmation_result',{confirmation_result,user:props.userInformation})
}   


</script>

<template>
    <div
    data-te-modal-init
    class="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
    id="userDeleteConfirmationModal"
    tabindex="-1"
    aria-labelledby="userDeleteConfirmationModallabel"
    aria-hidden="true">
        <!-- the dialog box -->
        <div
        data-te-modal-dialog-ref
        class="pointer-events-none absolute sm:left-7 h-auto w-full translate-x-[-100%] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]"
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
                            {{ formController.title }}
                        </div>
                    </div>
                    <!-- the x button -->
                    <button
                    type="button"
                    class="box-content rounded-none border-none text-white hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
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
                <div
                class="relative flex flex-auto flex-wrap justify-center p-4 px-10"
                data-te-modal-body-ref>
                    <!-- the notification icon -->
                    <span class="text-secondary [&>svg]:h-16 [&>svg]:w-14">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor">
                            <path
                            fill-rule="evenodd"
                            d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                            clip-rule="evenodd" />
                        </svg>
                    </span>
                    <!-- the form -->
                    <div class="w-full h-fit flex">
                        <Form 
                        @submit="handleConfirmation" :validation-schema="schema" v-slot="{errors}"
                        class="w-full flex flex-col font-Roboto gap-2 justify-center"
                        >
                            <!-- the form cont -->
                            <div class="w-full flex flex-col gap-1 relative">
                                <!-- the copy button -->
                                <div class="absolute right-0 -top-3">
                                    <button type="button" @click="copyToClipboard" v-if="is_copyed==false" class="flex justify-center items-center text-gray-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" 
                                        class="h-4 w-4"
                                        viewBox="0 0 448 512">
                                            <path fill="currentColor" d="M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z"/>
                                        </svg>
                                    </button>
                                    <span v-else class="text-green-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" 
                                        class="h-4 w-4" 
                                        viewBox="0 0 512 512">
                                            <path fill="currentColor" d="m173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69L432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"/>
                                        </svg>
                                    </span>
                                </div>
                                <!-- the label -->
                                <FormLabel :title="formController.message" />
                                <!-- the input holder -->
                                <div class="w-full relative">
                                    <Field name="username" type="text" placeholder="Nejashi" class="formInput focus:bg-gray-200" />
                                    <InputErrorMark v-if="errors.username" />
                                    <div class="formErrorMessage" v-if="errors.username">
                                        {{ errors.username }}
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
                                :disabled="errors.username"
                                class="w-full py-2 px-2 bg-black rounded-md text-white first-letter:capitalize text-xs font-bold"
                                >
                                    Delete
                                </button>
                            </div>
                        </Form>
                    </div>
                    <!-- the warning message -->
                    <p class="p-4 text-center text-xs text-red-600 hover:underline">
                        {{ formController.warning }}
                    </p>
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