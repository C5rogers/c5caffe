<script setup>
import {Form,Field, useField} from 'vee-validate'
import {Ripple,initTE,Input,Select} from 'tw-elements'
import {useToast} from 'vue-toastification'
import * as yup from 'yup'

const inProcess=ref(false)
const router=useRouter()
const toast=useToast()
const useAdminActionStore=adminProductAndCatagoryStore()
const useChart_dataStore=chart_dataStore()

onMounted(()=>{
    initTE({
        Ripple,Input,Select
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

const getExtension=(filename)=>{
    const extension=filename.split('.')
    return extension[1]
}

const handleCreateProduct=async(value)=>{
    inProcess.value=true
    const payload=new FormData()
    payload.append('name',value.name)
    payload.append('price',value.price)
    payload.append('catagory',value.catagory)
    payload.append('description',value.description)
    payload.append('image',value.image)
    const result=await useAdminActionStore.createProduct(payload)
    if(result==true){
        inProcess.value=false
        toast.success(`Product ${value.name} is posted successfully`,{
            position:'top-left'
        })
        toast.info('Product upload alert also delivered to all yousers except you',{
            position:'bottom-left'
        })
        await useChart_dataStore.getChartData()
        resetTheForm()
        router.push('/admin/product')
    }else{
        inProcess.value=false
        toast.error(`Oops we have trouble posting ${value.name}`,{
            position:'bottom-left'
        })
        if(useAdminActionStore.$state.error_message.length>0){
            toast.error(useAdminActionStore.$state.error_message,{
                position:'bottom-left'
            })
            useAdminActionStore.resetErrorMessage()
        }
    }
}

const resetTheForm=()=>{
    Object.keys(schema.fields).forEach(field => {
        const {value}=useField(field)
        value.value=null
        value.error=null
    });
}

</script>

<template>
    <div class="w-full flex items-center">
        <Form @submit="handleCreateProduct" :validation-schema="schema" v-slot="{errors}" class="w-full flex flex-col gap-2">
            <!-- the input container -->
            <div class="w-full flex flex-col gap-1 justify-between h-fit">
                <FormLabel title="Product Name" />
                <!-- the input container -->
                <div class="mt-1 relative w-3/4">
                    <!-- the input wrapper -->
                    <div class="relative mb-3 w-full" data-te-input-wrapper-init>
                        <Field
                            type="text"
                            name="name"
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
                    <InputErrorMark v-if="errors.name || useAdminActionStore.$state.errors.name"/>
                    <!-- the error message -->
                    <div class="formErrorMessage ml-2" v-if="errors.name">
                        {{ errors.name }}
                    </div>
                    <div class="formErrorMessage ml-2" v-else-if="useAdminActionStore.$state.errors.name">
                        {{ useAdminActionStore.$state.errors.name }}
                    </div>
                </div>
            </div>
            <div class="w-full flex flex-col gap-1 justify-between h-fit">
                <FormLabel title="Product Price" />
                <!-- the input container -->
                <div class="mt-1 relative w-3/4">
                    <!-- the input wrapper -->
                    <div class="relative mb-3 w-full" data-te-input-wrapper-init>
                        <Field
                            type="number"
                            name="price"
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
                    <InputErrorMark v-if="errors.price || useAdminActionStore.$state.errors.price"/>
                    <!-- the error message -->
                    <div class="formErrorMessage ml-2" v-if="errors.price">
                        {{ errors.price }}
                    </div>
                    <div class="formErrorMessage ml-2" v-else-if="useAdminActionStore.$state.errors.price">
                        {{ useAdminActionStore.$state.errors.price }}
                    </div>
                </div>
            </div>
            <div class="w-full flex flex-col gap-1 justify-between h-fit">
                <FormLabel title="Product Catagory" />
                <!-- the input container -->
                <div class="mt-1 relative w-3/4">
                    <!-- the input wrapper -->
                    <div class="w-full relative">
                        <Field as="select" name="catagory" data-te-select-init data-te-select-filter="true">
                            <option v-for="catagory in useAdminActionStore.$state.catagorys"
                            :key="catagory._id" :value="catagory.catagory">{{ catagory.catagory }}</option>
                        </Field>
                        <label data-te-select-label-ref>Snack</label>
                    </div>
                    <!-- the error mark -->
                    <InputErrorMark v-if="errors.catagory || useAdminActionStore.$state.errors.catagory"/>
                    <!-- the error message -->
                    <div class="formErrorMessage ml-2" v-if="errors.catagory">
                        {{ errors.catagory }}
                    </div>
                    <div class="formErrorMessage ml-2" v-else-if="useAdminActionStore.$state.errors.catagory">
                        {{ useAdminActionStore.$state.errors.catagory }}
                    </div>
                </div>

            </div>
            <!-- the description -->
            <div class="w-full flex flex-col gap-1 justify-between h-fit">
                <FormLabel title="Product Description" />
                <!-- the input container -->
                <div class="mt-1 relative w-3/4">
                    <!-- the input wrapper -->
                    <div class="relative mb-3" data-te-input-wrapper-init>
                        <Field
                            as="textarea"
                            name="description"
                            class="peer block min-h-[auto] focus:bg-gray-50 w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none  [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                            id="ProductDescription"
                            rows="3"
                            placeholder="Your message"></Field>
                        <label
                            for="ProductDescription"
                            class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-300 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                            >Han Burger is...</label
                        >
                    </div>
                    <!-- the error mark -->
                    <InputErrorMark v-if="errors.description || useAdminActionStore.$state.errors.description"/>
                    <!-- the error message -->
                    <div class="formErrorMessage ml-2" v-if="errors.description">
                        {{ errors.description }}
                    </div>
                    <div class="formErrorMessage ml-2" v-else-if="useAdminActionStore.$state.errors.description">
                        {{ useAdminActionStore.$state.errors.description }}
                    </div>
                </div>
            </div>
            <!-- the image holder button -->
            <div class="w-full flex flex-col gap-1 justify-between h-fit">
                <FormLabel title="Product Image" />
                <!-- the input container -->
                <div class="mt-1 relative w-3/4">
                    <!-- the input wrapper -->
                    <div class="mb-3">
                        <Field
                            name="image"
                            class="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                            type="file"
                            id="formFile" />
                    </div>
                    <!-- the error mark -->
                    <InputErrorMark v-if="errors.image || useAdminActionStore.$state.errors.image"/>
                    <!-- the error message -->
                    <div class="formErrorMessage ml-2" v-if="errors.image">
                        {{ errors.image }}
                    </div>
                    <!-- the other one -->
                    <div class="formErrorMessage ml-2" v-else-if="useAdminActionStore.$state.errors.image">
                        {{ useAdminActionStore.$state.errors.image }}
                    </div>
                </div>
            </div>
            <!-- the post button -->
            <div class="w-full flex flex-col gap-1 justify-between h-fit">
                <div class="mt-1 relative w-3/4">
                    <button
                    class="inline-block rounded bg-gray-900 px-7 py-2 w-full text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    :disabled="inProcess==true"
                    >
                        <span v-if="inProcess==false">
                            Post Product
                        </span>
                        <Loading :small-mode="true" v-else />
                    </button>
                </div>
            </div>
        </Form>

    </div>
</template>