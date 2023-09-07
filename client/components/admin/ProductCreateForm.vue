<script setup>
import {Form,Field} from 'vee-validate'
import {Ripple,initTE,Input} from 'tw-elements'
import {useToast} from 'vue-toastification'
import * as yup from 'yup'

const toast=useToast()
const useAdminActionStore=adminProductAndCatagoryStore()

onMounted(()=>{
    initTE({
        Ripple,Input
    })
})
const MAX_FILE_SIZE=2097152
const nameregex=/^([^\x00-\x7F]|[\a-zA-Z_\ \.\+\-]){2,20}$/
const priceregex= /^\d+(\.\d{1,2})?$/
const schema=yup.object().shape({
    name:yup.string().required().matches(nameregex,"Invalid Product Name"),
    description:yup.string().required(),
    price:yup.number().typeError("Price must be number").required("Price is also required").positive("Price must be positive number").test('is-decimal','Price must have up to 2 decimal places',value=>{
        if(value){
            return priceregex.test(value)
        }
        return true
    }),
    image:yup.mixed().required("Image is required").test({
        message:"Please provide supported file type",
        test:(file,context)=>{
            let isValid
            if(file){
                 isValid=['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp','jpeg'].includes(getExtension(file?.name))
            }else{
                isValid=true
            }
            if(!isValid){
                context?.createError()
            }
            return isValid
        }
    }).test({
        message:`File is too big, cant exit 2MB`,
        test:(file)=>{
            let isValid
            if(file){
                isValid=file?.size<MAX_FILE_SIZE
            }else{
                isValid=true
            }
            return isValid
        }
    }),
    catagory:yup.string().required("catagory also required")
})

const handleCreateProduct=(value)=>{
    console.log(value)
}

</script>

<template>
    <div class="w-full flex items-center">
        <form @submit.prevent="" class="w-full flex flex-col gap-2">
            <!-- the input container -->
            <div class="w-full flex flex-col gap-1 justify-between h-fit">
                <FormLabel title="Product Name" />
                <!-- the input container -->
                <div class="mt-1 relative w-3/4">
                    <!-- the input wrapper -->
                    <div class="relative mb-3 w-full" data-te-input-wrapper-init>
                        <input
                            type="text"
                            class="peer block min-h-[auto] w-full focus:bg-gray-50 rounded first-letter:capitalize bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-secondary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none   [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                            id="ProductName"
                            placeholder="Hann Burger" />
                        <label
                            for="ProductName"
                            class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-300 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-gray-400 peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-secondary"
                            >
                            Hann Burger
                        </label>
                    </div>
                    <!-- the error mark -->
                    <InputErrorMark v-if="0>1"/>
                    <!-- the error message -->
                    <div class="formErrorMessage ml-2" v-if="0>1">
                        
                    </div>
                </div>
            </div>
            <div class="w-full flex flex-col gap-1 justify-between h-fit">
                <FormLabel title="Product Price" />
                <!-- the input container -->
                <div class="mt-1 relative w-3/4">
                    <!-- the input wrapper -->
                    <div class="relative mb-3 w-full" data-te-input-wrapper-init>
                        <input
                            type="number"
                            class="peer block min-h-[auto] w-full focus:bg-gray-50 rounded first-letter:capitalize bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-secondary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none   [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                            id="ProductPrice"
                            placeholder="Hann Burger" />
                        <label
                            for="ProductPrice"
                            class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-300 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-gray-400 peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-secondary"
                            >
                            22.50
                        </label>
                    </div>
                    <!-- the error mark -->
                    <InputErrorMark v-if="0>1"/>
                    <!-- the error message -->
                    <div class="formErrorMessage ml-2" v-if="0>1">
                        
                    </div>
                </div>
            </div>
            <div class="w-full flex flex-col gap-1 justify-between h-fit">
                <FormLabel title="Product Description" />
                <!-- the input container -->
                <div class="mt-1 relative w-3/4">
                    <!-- the input wrapper -->
                    <div class="relative mb-3" data-te-input-wrapper-init>
                        <textarea
                            class="peer block min-h-[auto] focus:bg-gray-50 w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none  [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                            id="ProductDescription"
                            rows="3"
                            placeholder="Your message"></textarea>
                        <label
                            for="ProductDescription"
                            class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-300 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                            >Han Burger is...</label
                        >
                    </div>
                    <!-- the error mark -->
                    <InputErrorMark v-if="0>1"/>
                    <!-- the error message -->
                    <div class="formErrorMessage ml-2" v-if="0>1">
                        
                    </div>
                </div>
            </div>
            <!-- the image holder button -->
            
        </form>

    </div>
</template>