<script setup>
import {Form,Field} from 'vee-validate'
import * as yup from 'yup'
import {useToast} from 'vue-toastification'
import {Ripple,initTE,Input} from 'tw-elements'


const toast=useToast()

const useAdminActionStore=adminProductAndCatagoryStore()

onMounted(()=>{
    initTE({
        Ripple,
        Input
    })
})

const schema=yup.object().shape({
    catagory:yup.string().required()
})

const handleCreateCatagory=(value)=>{
    console.log(value)
}

</script>

<template>
    <div>
        catagory creating form
    </div>
</template>