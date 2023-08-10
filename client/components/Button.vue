<script setup>
import {Collapse, Dropdown, Ripple, initTE} from 'tw-elements'

onMounted(() => {
    initTE({ Collapse, Dropdown, Ripple  });  
})

const emit=defineEmits(['click'])
const props=defineProps({
    theme:String,
    text_theme:String,
    isLoading:{
        type:Boolean,
        default:false
    }
})

const handleClick=()=>{
    emit('click')
}
</script>
<template>
    <button
    type="button"
    data-te-ripple-init
    data-te-ripple-color="white"
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
        <span v-if="isLoading">
            <Loading/>
        </span>
        <slot v-else>

        </slot>
    </button>
</template>