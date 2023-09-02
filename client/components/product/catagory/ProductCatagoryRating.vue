<script setup>
import {Ripple,Modal, Rating,initTE,Select} from "tw-elements";
    



const useProductStore=productStore()
const dismiss_controller=ref(false)
const rating_value=ref(0)
const total_rated_count=ref(0)
const progress_animation_controller=ref(false)
const props=defineProps({
    catagoryInfo:{
        type:Object,
        required:true
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
    if(props.catagoryInfo){
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
     }, 3000) 
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
    }
}
</script>

<template>
    
</template>