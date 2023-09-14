<script setup>
    const props=defineProps({
        oddEven:{
            type:Number,
            default:2
        }
    })
    const chakeOddEven=()=>{
        if((props.oddEven%2)==0){
            return true
        }else{
            return false
        }
    }
</script>

<template>
            <p
                class="w-[7em] rounded-full animate-[placeholder-wave_2s_linear_infinite] [mask-size:200%_100%]"
                style="
                -webkit-mask-image: linear-gradient(130deg, #000 55%, rgba(0, 0, 0, 0.8) 75%, #000 95%);
                mask-image: linear-gradient(130deg, #000 55%, rgba(0, 0, 0, 0.8) 75%, #000 95%);
                "
                :class="{'w-[10em]':chakeOddEven()==true}"
                >
                    <span
                        class="inline-block h-5  rounded-full w-full flex-auto cursor-wait bg-current align-middle text-base text-neutral-300 opacity-50 dark:text-neutral-50"></span>
                </p>
</template>