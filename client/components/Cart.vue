<script setup>

const number=ref(0)
const handleClick=()=>{
    number.value+=1
}
</script>
<template>
    <div>
       <button class="relative w-10 h-10 overflow-visible rounded-md transition duration-200 hover:shadow-md" @click="handleClick" >
            <i class="fa-solid fa-cart-plus text-2xl"></i>
            <!-- the counter -->
            <div class="absolute w-7 h-7 overflow-hidden flex items-center justify-center p-2 rounded-full -top-2 -right-3 z-10" :class="{'bg-gray-300':number==0},{'bg-secondary text-white': number!=0}">
                {{ number }}
            </div>
       </button>
    </div>
</template>