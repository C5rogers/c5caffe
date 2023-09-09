<script setup>
import {
  Modal,
  Ripple,
  initTE,
} from "tw-elements";

onMounted(()=>{
    initTE({
        Modal,
        Ripple
    })
})

const confirmation_result=ref(false)
const emit=defineEmits(['confirmation-result'])

const props=defineProps({
    title:{
        type:String,
    },
    message:{
        type:String
    },
    leftMode:{
        type:Boolean,
        default:true
    },
    identifier:{
        type:Object,
    }
})


const formControllers=ref({
    title:'',
    message:''
})
watch(()=>props.identifier,(newValue)=>{
    formControllers.value.title=props.title,
    formControllers.value.message=props.message
})

const handleConfirmations=(e)=>{
    confirmation_result.value=false
    e.preventDefault()
    if(e.submitter.name=='yes'){
        confirmation_result.value=true
    }
    emit('confirmation-result',{
        confirmation_result:confirmation_result.value,
        identifier:props.identifier
    })

}

</script>


<template>
    <!-- modal top left -->
    <div
    data-te-modal-init
    class="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
    id="leftTopModal"
    tabindex="-1"
    aria-labelledby="leftTopModalLabel"
    aria-hidden="true"
    v-if="leftMode==true"
    >
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
                            {{ title }}
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
                class="relative flex flex-auto flex-wrap justify-center p-4"
                data-te-modal-body-ref
                >
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
                    <!-- the message -->
                    <p class="p-4 text-center">
                        {{ formControllers.message }}
                    </p>
                </div>
                <!-- the footer one -->
                <div
                class="flex flex-shrink-0 flex-wrap items-center justify-center rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50"
                >
                    <!-- the buttons -->
                    <form @submit="handleConfirmations">
                        <input
                        class="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                        data-te-modal-dismiss
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        type="submit"
                        value="No"
                        name="no"
                        />
                        <input
                        class="ml-1 inline-block rounded bg-secondary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                        data-te-modal-dismiss
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        value="Yes"
                        name="yes"
                        type="submit"
                        /> 
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!-- the top right modal -->
    <div 
    data-te-modal-init
    class="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
    id="rightTopModal"
    tabindex="-1"
    aria-labelledby="rightTopModalLabel"
    aria-hidden="true"
    v-else>
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
                    <!-- the message -->
                    <p class="p-4 text-center">
                        {{ formControllers.message }}
                    </p>
                </div>
                <!-- the footer one -->
                <div
                class="flex flex-shrink-0 flex-wrap bg-gray-100 items-center justify-center rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50"
                >
                    <!-- the buttons -->
                    <form @submit="handleConfirmations">
                        <input
                        class="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                        data-te-modal-dismiss
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        type="submit"
                        value="No"
                        name="no"
                        />
                        <input
                        class="ml-1 inline-block rounded bg-secondary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                        data-te-modal-dismiss
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        value="Yes"
                        name="yes"
                        type="submit"
                        /> 
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>