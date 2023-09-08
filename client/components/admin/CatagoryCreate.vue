<script setup>
import {Form,Field,useField} from 'vee-validate'
import * as yup from 'yup'
import {useToast} from 'vue-toastification'
import {Ripple,initTE,Input} from 'tw-elements'


const toast=useToast()

const inProcess=ref(false)
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

const handleCreateCatagory=async(value)=>{
    inProcess.value=true
    const result=await useAdminActionStore.createCatagorys(value)
    if(result==true){
        toast.success(useAdminActionStore.$state.success_message,{
            position:'top-left'
        })
        useAdminActionStore.resetSuccessMessage()
        await useAdminActionStore.getCatagorys()
    }else{
        toast.error(`Unable to post ${value.catagory}`,{
            position:'bottom-left'
        })
        if(useAdminActionStore.$state.error_message){
            toast.error(useAdminActionStore.$state.error_message,{
                position:'bottom-left'
            })
            useAdminActionStore.resetErrorMessage()
        }
        resetTheForm()
    }
    inProcess.value=false
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
        <Form @submit="handleCreateCatagory" :validation-schema="schema" v-slot="{errors}" class="w-full">
            <!-- input container -->
            <div class="w-full flex flex-col gap-1 justify-between h-fit">
                <FormLabel title="Catagory Name" />
                <!-- input cont -->
                <div class="mt-1 relative w-[90%]">
                    <!-- the input -->
                    <div class="relative mb-3 w-full" data-te-input-wrapper-init>
                        <Field
                            name="catagory"
                            type="text"
                            class="peer block min-h-[auto] w-full focus:bg-gray-50 rounded first-letter:capitalize bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-secondary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none   [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                            id="ProductName"
                            placeholder="Hann Burger" />
                        <label
                            for="ProductName"
                            class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-300 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-gray-400 peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-secondary"
                            >
                            Makaranio
                        </label>
                    </div>
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
            <!-- the create button -->
            <div class="w-full flex flex-col gap-1 justify-between h-fit">
                <div class="mt-1 relative w-[90%]">
                    <button
                    class="inline-block rounded bg-gray-900 px-7 py-2 w-full text-sm font-medium uppercase leading-normal text-white  transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    data-te-ripple-init
                    data-te-ripple-color="light">
                        <span v-if="inProcess==false">
                            Post Catagory
                        </span>
                        <Loading :small-mode="true" v-else />
                    </button>
                </div>
            </div>
        </Form>
    </div>
</template>