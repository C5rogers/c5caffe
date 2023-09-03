<script setup>
const catagory_controller=ref('')


const useProductStore=productStore()
const useAuthStore=authStore()
const rated_badge_controller=ref(false)
const props=defineProps({
    name:{
        type:String,
    }
})

const emit=defineEmits(['handle_rate_product_catagory'])
onMounted(()=>{
    catagory_controller.value=props.name,
    checkRatedProductCatagory()
})

const handleRateProductCatagory=()=>{
    emit('handle_rate_product_catagory',props.name)
}

const checkRatedProductCatagory=()=>{
    const catagory=useProductStore.filterFromProductCatagory(props.name)
    if(useAuthStore.$state.user._id){
        const user_id=useAuthStore.$state.user._id
        useProductStore.$state.product_catagory_ratings.forEach(product_catagory_rate => {
            if(product_catagory_rate.user_id._id==user_id ){
                if(product_catagory_rate.product_catagory_id._id==catagory._id){
                    rated_badge_controller.value=true
                }
            }
        });
    }
    return false
}
</script>

<template>
    <div 
    class="w-fit flex flex-col gap-0 justify-center"
    v-if="name"
    >
        <div class="font-Roboto w-fit font-bold cursor-pointer hover:underline text-2xl"
        @click="handleRateProductCatagory()"
        data-te-toggle="modal"
        data-te-target="#productCatagoryRatingStaticBackdrop"
        >
            <span class="text-secondary">{{ catagory_controller }}</span> Result
        </div>
        <div class="w-fit px-2 py-[1px] rounded-full font-Roboto text-xs text-white bg-green-500 capitalize" v-if="rated_badge_controller==true">
            rated
        </div>
    </div>
</template>