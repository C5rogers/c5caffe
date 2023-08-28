<script setup>

const progressWidth=ref("10%")
const props=defineProps({
    maxWidth:{
        type:Number,
    },
    animateStatus:{
        type:Boolean,
        default:true
    }
})

onMounted(()=>{
    if(props.maxWidth){
        animateProgress()
    }
})

watch(()=>props.animateStatus,(newValue)=>{
    if(newValue==true){
        setTimeout(() => {
            animateProgress()
        }, 500);
    }
})


const animateProgress=()=>{
    if(props.maxWidth){
        progressWidth.value=5+'%'
        for(let index=10; index<=props.maxWidth; index++){
            setTimeout(() => {
                progressWidth.value=index+'%'
            }, 1000);
        }
    }
    
}

</script>

<template>
    <div
    class="w-64 h-3 rounded-full bg-gray-200"
    >

    <div
    :style="{width:progressWidth}"
    class="h-full rounded-full bg-secondary transition-all ease-out duration-[2s]"
    >

    </div>

    </div>
</template>