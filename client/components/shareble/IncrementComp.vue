<script setup>

import {Ripple,initTE} from "tw-elements";


onMounted(()=>{
    initTE({Ripple})
    emit('change-calculation',props.unitPrice)
})
    const emit=defineEmits(['change-calculation'])
    const props=defineProps({
        unitPrice:{
            type:Number,
            required:true
        },
        reset:{
            type:Boolean,
            default:false
        }
    })

    watch(()=>props.reset,(newValue)=>{
        if(newValue==true){
            count_controller.value=1
        }
    })


    const count_controller=ref(1)
    const handleCalculateChange=()=>{
        count_controller.value=count_controller.value+1
        let totalPrice=props.unitPrice*count_controller.value
        console.log()
        emit('change-calculation',totalPrice)
    }
    const handleCalculateChangeNegative=()=>{
        count_controller.value=count_controller.value-1
        if(count_controller.value>1){
            const totalPrice=props.unitPrice*count_controller.value
            emit('change-calculation',totalPrice)
        }else{
            count_controller.value=1
        }
    }
</script>

<template>
    <div class=" h-10 w-24 md:w-36 justify-between flex gap-1 bg-white  rounded-md overflow-hidden  items-center border">
        <!-- the substraction button -->
        <button @click="handleCalculateChangeNegative" 
        class="w-7 md:w-10 flex items-center justify-center text-white bg-secondary h-full text-2xl font-bold"
        data-te-ripple-init
        data-te-ripple-color="light"
        >-</button>
        <div class="font-bold text-xs md:text-lg">
            {{ count_controller }}
        </div>
        <!-- the addition button -->
        <button @click="handleCalculateChange"
        class="w-7 md:w-10 flex items-center justify-center text-white bg-green-600 h-full text-2xl font-bold"
        data-te-ripple-init
        data-te-ripple-color="light"
        >+</button>
    </div>
</template>