<script setup>

const props=defineProps({
    isRequired:{
        type:Boolean,
        default:true
    },
    title:{
        type:String
    }
})
</script>

<template>
    <!-- label container -->
    <div class="w-full flex items-center font-Roboto capitalize">
        <label :for="title" class="flex gap-1 items-center"><span>{{ title }}</span><span v-if="isRequired" class="font-bold text-red-600">*</span></label>
    </div>
</template>