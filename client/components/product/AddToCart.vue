<script setup>
import {Ripple,Modal,initTE,Select} from "tw-elements";

const props=defineProps({
    productInfo:{
        type:Object,
        required:true,
    }
})


const reset_controller=ref(false)
const total_price_controller=ref(0)
onMounted(()=>{
    initTE({
        Ripple,
        Modal,
        Select
    })

    if(props.productInfo && props.productInfo.price){
        total_price_controller.value=props.productInfo.price
    }
    
})

const handleDescriptionShorting=(description)=>{
    if(description){
        if(description.length<70){
            return description+'...'
        }else{
            return description.substring(0,60)+'...'
        }
    }
    
}
const parseToNumber=(price)=>{
    const parsed=Number(price)
    if(isNaN(parsed)){
        return 0
    }else{
        return parsed
    }
}

const handleChangeCalculation=(totalPrice)=>{
    total_price_controller.value=totalPrice
}

const handleAddToCart=()=>{
    console.log("handlign the add cart")
    resetTotal_price()
}
const resetTotal_price=()=>{
    total_price_controller.value=props.productInfo.price
    reset_controller.value=true
    setTimeout(() => {
        reset_controller.value=false
    }, 1000);
}
</script>

<template>
    <!-- the modal container -->
    <div
    data-te-modal-init
    class="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
    id="addToCartFixedBackground"
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
                            Add To Cart
                        </div>
                    </div>
                    <!-- exit button -->
                    <!--Close button-->
                    <button
                    type="button"
                    class="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                    data-te-modal-dismiss
                    @click="resetTotal_price()"
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
                v-if="productInfo"
                class="relative p-4 flex flex-col items-center justify-center gap-4"
                >

                    <!-- the container -->
                    <div
                    class="w-full flex gap-5  justify-center font-Roboto"
                    >
                        <!-- the left -->
                        <div class="w-1/2 flex flex-col gap-2 items-center justify-center">
                            <!-- the image -->
                            <div
                            class="w-full rounded-xl shadow-md h-56 flex items-center justify-center overflow-hidden"
                            >
                                <img :src="productInfo.image" class="w-full h-full object-cover" :alt="productInfo.description">
                            </div>
                            <!-- the name and other one-->
                            <div class="w-full pl-2 mt-2 flex flex-col gap-1 justify-center">
                                <div class="text-lg sm:text-xl md:text-3xl font-bold text-gray-700 capitalize">
                                    {{ productInfo.name }}
                                </div>
                                <div class="-mt-1 text-gray-700 text-xs sm:text-sm md:text-lg font-light">
                                    Note: NoSize
                                </div>
                            </div>
                        </div>
                        <!-- the right -->
                        <div class="w-1/2 h-full flex flex-col gap-1">
                            <!-- the main name -->
                            <div class="w-full flex flex-col justify-center">
                                <div class="font-bold text-lg sm:text-2xl md:text-4xl capitalize m-0">
                                    {{ productInfo.name }}
                                </div>
                                <!-- the price -->
                                <div class="font-bold text-xs sm:text-sm md:text-lg md:ml-2">
                                    <span class="text-secondary">{{ productInfo.price }}$/</span>USD
                                </div>
                            </div>
                            <!-- the description -->
                            <div class="w-full flex items-center justify-center">
                                <div class="w-56 flex flex-col gap-2 justify-center">
                                    <!-- note -->
                                    <div class="md:-ml-2 text-gray-700 text-xs sm:text-sm  md:text-lg font-light">
                                        Note: NoSize
                                    </div>
                                    <!-- title -->
                                    <div class="font-bold text-secondary text-xs sm:text-sm md:text-lg capitalize">
                                        Buy More & Save?
                                    </div>
                                    <!-- body -->
                                    <div class="text-gray-700 text-xs sm:text-sm">
                                        {{ handleDescriptionShorting(productInfo.description) }}
                                    </div>
                                    <!-- rating -->
                                    <div>
                                        <SharebleFiveStartRating :rating-value="productInfo.average_rating" />
                                    </div>
                                </div>
                                
                            </div>
                            <!-- the action -->
                            <div class="w-full px-3 py-1 bg-gray-100 min-h-[5em] mt-2">
                                <!-- the first one -->
                                <div class="w-full flex gap-2 items-center">
                                    <SharebleIncrementComp :reset="reset_controller" :unit-price="parseToNumber(productInfo.price)" @change-calculation="handleChangeCalculation" />
                                    <div class="flex gap-2 items-center">
                                        <span class="font-bold text-sm md:text-lg">Total:</span>
                                        <span class="font-light">{{ total_price_controller }}$</span>
                                    </div>
                                </div>
                                <!-- the button -->
                                <div class="w-full mt-3 flex items-center justify-center">
                                    <button
                                    data-te-ripple-init
                                    data-te-ripple-color="light"
                                    class="w-full bg-primary flex items-center gap-1 justify-center text-white rounded-md py-1 px-2 font-bold text-sm capitalize"
                                    @click="handleAddToCart"
                                    >
                                        <i class="fa-solid fa-cart-plus text-lg"></i>
                                        <span>Add To Cart</span>
                                    </button>
                                </div>
                            </div>
                        </div>
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
                        @click="resetTotal_price()"
                        >
                        Exit
                    </button>
                </div>
            </div>
                
        </div>

    </div>
</template>