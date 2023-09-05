<script setup>
// import {Collapse, Dropdown, Ripple, initTE} from 'tw-elements'


const isLoading=ref(false)

// onMounted(() => {
//     isLoading.value=props.isLoading
//     initTE({ Collapse, Dropdown, Ripple  });  
// })

const emit=defineEmits(['click'])
const props=defineProps({
    theme:String,
    text_theme:String,
    isLoading:{
        type:Boolean,
        default:false
    },
    noLoader:{
        type:Boolean,
        default:true
    }
})

const handleClick=()=>{
    if(!props.noLoader){
        isLoading.value=!isLoading.value
    }
    emit('click')
}
</script>
<template>
    <ClientOnly placeholder="loading...">
        <button
    type="button"
    class="
    rounded-md 
    px-3
    py-2 
    font-bold
    font-Roboto 
    text-xs 
    transition 
    duration-150
    ease-in-out
    flex
    items-center
    justify-center w-full
    " @click="handleClick" :class="{[theme]:theme}, {[text_theme] : text_theme}">
        <span v-if="isLoading" class="w-full flex items-center justify-center">
            <Loading/>
        </span>
        <slot v-else>

        </slot>
    </button>
    </ClientOnly>
    
</template>