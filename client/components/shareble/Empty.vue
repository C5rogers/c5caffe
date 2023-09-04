<script setup>
const props=defineProps({
    message:{
        type:String,
        default:"Oops Nothig found here"
    },
    cartMode:{
        type:Boolean,
        default:false
    },
    smallMode:{
        type:Boolean,
        default:false
    }
})

</script>

<template>
        <!-- the container -->
        <div class=" w-fit h-fit flex flex-col gap-1 items-center justify-center font-Roboto text-xl capitalize text-gray-700">
            <!-- the image holder -->
            <div class="w-56 h-56 md:w-80 md:h-80 rounded-full overflow-hidden flex items-center justify-center" v-if="!smallMode">
                <!-- <img src="../../assets/images/empty.jpg" class="w-full h-full object-cover" alt="" v-if="!cartMode"> -->
                <img src="../../assets/images/witch.png" class="w-full h-full object-cover" alt="">
            </div>
            <!-- the small mode image -->
            <div
            v-else-if="smallMode"
            class="w-28 h-28 flex justify-center items-center rounded-full overflow-hidden"
            >
                <img src="../../assets/images/witch.png" class="w-full h-full object-cover" alt="">
            </div>
            <!-- the message container -->
            <div class="w-full flex items-center justify-center text-center" v-if="!smallMode">
                 {{ message }}
            </div>
            <div
            v-else-if="smallMode"
            class="text-gray-700 text-xs font-Roboto capitalize"
            >
                {{ message }}
            </div>
            <!-- the link-->
            <div v-if="cartMode" class="w-fit font-Roboto font-light hover:underline hover:text-secondary">
                <router-link to="/product" class="flex gap-1 items-center"><span><i class="fa-solid fa-cart-plus text-2xl"></i></span>Goto shop</router-link>
            </div>
        </div>
    
</template>