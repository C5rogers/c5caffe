<script setup>
import {Ripple,Modal, Rating,initTE,Select} from "tw-elements";
import {useToast} from 'vue-toastification'    

const toast=useToast()

const useProductStore=productStore()
const dismiss_controller=ref(false)
const rating_value=ref(0)
const total_rated_count=ref(0)
const progress_animation_controller=ref(false)
const props=defineProps({
    catagoryInfo:{
        type:Object,
        required:true
    },
    trigAnimation:{
        type:Boolean,
        default:false,
    }
})

watch(()=>props.trigAnimation,(newValue)=>{
    if(newValue){
     dismiss_controller.value=false
     rating_value.value=newValue.average_rating
     total_rated_count.value=count_how_many_times_rated()
     progress_animation_controller.value=true
     setTimeout(() => {
        progress_animation_controller.value=false
     }, 1000)
    }
})

const reset_rating_value=()=>{
    rating_value.value=0
    total_rated_count.value=0
}

const widths=[
    100,
    75,
    50,
    25,
    10
]

onMounted(()=>{
    initTE({
        Ripple,
        Modal,
        Rating,
        Select
    })
    if(props.catagoryInfo.length>0){
        rating_value.value=props.catagoryInfo.product_catagory_id.average_rating
    }
})   

watch(()=>props.catagoryInfo,(newValue)=>{
    if(newValue){
     dismiss_controller.value=false
     rating_value.value=newValue.average_rating
     total_rated_count.value=count_how_many_times_rated()
     progress_animation_controller.value=true
     setTimeout(() => {
        progress_animation_controller.value=false
     }, 1000) 
    }
})


const change_rating_value=(value)=>{
    rating_value.value=value
}

const confirm_rating_value=(value)=>{
    rating_value.value=value
}

const count_how_many_times_rated=()=>{
    let counter=0
    useProductStore.$state.product_catagory_ratings.forEach(element => {
        if(element.product_catagory_id._id==props.catagoryInfo._id){
            counter++
        }
    });
    return counter
}


const handleRatingProductCatagory=async()=>{
    const payload={
        product_catagory_id:props.catagoryInfo._id,
        rating_value:rating_value.value
    }

    const result=await useProductStore.rateProductCatagory(payload)
    if(result==true){
        await useProductStore.fetchProducts('')
        setTimeout(() => {
            dismiss_controller.value=true
        }, 1000);
        const successmessage=`You rated ${props.catagoryInfo.catagory} successfully!`
        toast.success(successmessage)
    }else{
        const failureMessage=`You are unable to rate ${props.catagoryInfo.catagory} due to some error!`
        toast.error(failureMessage,{
            position:'bottom-right'
        })
    }
}
</script>

<template>
    <!-- the modal holder -->
    <div
    data-te-modal-init
    class="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
    id="productCatagoryRatingStaticBackdrop"
    data-te-backdrop="static"
    data-te-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
    >
        <!-- the modal dialog -->
        <div
        data-te-modal-dialog-ref
        class="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]"
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
                            <img src="../../../assets/images/restlogo.png" class="w-full h-full object-cover" alt="">
                        </div>
                        <!-- the title -->
                        <div class="text-xl font-Roboto capitalize">
                            {{ $t('product catagory') }} {{ $t('rating') }}
                        </div>
                    </div>
                    <!--Close button-->
                    <button
                    type="button"
                    class="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                    data-te-modal-dismiss
                    @click="reset_rating_value()"
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
                v-if="catagoryInfo"
                class="relative p-4 flex flex-col items-center justify-center gap-4"
                >
                    <!-- the upper holder -->
                    <div class="w-full h-fit py-5 px-4 flex flex-col gap-2 items-center justify-center">
                        <!-- the title -->
                        <div class="text-2xl font-Roboto font-light">
                            {{ $t('rating overview') }}:
                        </div>
                        <!-- the value holder -->
                        <div>
                            <span class="text-3xl font-bold">{{ rating_value }}</span>/5.0
                        </div>
                        <!-- the rating components -->
                        <ul 
                        id="selected-value-example"
                        class="my-1 flex list-none gap-1 p-0"
                        data-te-rating-init
                        >
                            <li
                            v-for="index in 5"
                            :key="index"
                            >
                            <span
                                class="text-secondary [&>svg]:h-7 [&>svg]:w-7"
                                data-te-rating-icon-ref
                                @click="confirm_rating_value(index)"
                                >
                                <svg
                                    @mousehover="change_rating_value(index)"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor">
                                    <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                </svg>
                                </span>
                            </li>
                        </ul>
                        <!-- the total ratings -->
                        <div class="font-light">
                            {{ total_rated_count }} {{ $t('ratings') }}
                        </div>
                    </div>
                    <!-- the lower holder -->
                    <div class="w-full px-4 py-1 flex flex-col gap-1 items-center justify-center">
                        <!-- itemcont -->
                        <div class="w-80 flex items-center justify-between gap-1">
                            <span>5</span>
                            <span><i class="fa-solid fa-star text-secondary"></i></span>
                            <shareble-progress-bar :animate-status="progress_animation_controller" :max-width="widths[0]" />
                            <span>100%</span>
                        </div>
                        <!-- itemcont -->
                        <div class="w-80 flex items-center justify-between gap-1">
                            <span>4</span>
                            <span><i class="fa-solid fa-star text-secondary"></i></span>
                            <shareble-progress-bar :animate-status="progress_animation_controller" :max-width="widths[1]" />
                            <span>75%</span>
                        </div>
                         <!-- itemcont -->
                         <div class="w-80 flex items-center justify-between gap-1">
                            <span>3</span>
                            <span><i class="fa-solid fa-star text-secondary"></i></span>
                            <shareble-progress-bar :animate-status="progress_animation_controller" :max-width="widths[2]" />
                            <span>50%</span>
                        </div>
                        <!-- itemcont -->
                        <div class="w-80 flex items-center justify-between gap-1">
                            <span>2</span>
                            <span><i class="fa-solid fa-star text-secondary"></i></span>
                            <shareble-progress-bar :animate-status="progress_animation_controller" :max-width="widths[3]" />
                            <span>25%</span>
                        </div>
                        <!-- itemcont -->
                        <div class="w-80 flex items-center justify-between gap-1">
                            <span>1</span>
                            <span><i class="fa-solid fa-star text-secondary"></i></span>
                            <shareble-progress-bar :animate-status="progress_animation_controller" :max-width="widths[4]" />
                            <span>0%</span>
                        </div>
                    </div>
                    <!-- the button holder -->
                    <div class="w-full flex justify-center items-center py-1 px-4">
                        <button
                        :data-te-modal-dismiss="dismiss_controller=true"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        @click="handleRatingProductCatagory()"
                        class="w-80 py-1 px-3 flex items-center rounded-md bg-primary justify-center capitalize font-Roboto text-white"
                        >
                            <span v-if="useProductStore.$state.isProductLoading==false">
                                {{ $t('apply') }}
                            </span>
                            <span
                            v-else
                            >
                                <loading/>
                            </span>
                        </button>
                    </div>
                </div>
                <!-- the footer -->
                <div
                class="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50"
                >
                <button
                    type="button"
                    class="inline-block rounded bg-secondary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                    data-te-modal-dismiss
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    @click="reset_rating_value()"
                    >
                        {{ $t('exit') }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>