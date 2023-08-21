<script setup>
import {Ripple,Modal,initTE,Select} from "tw-elements";
import { Form,Field } from 'vee-validate'
import * as yup from 'yup'
import {storeToRefs} from 'pinia'


const useCountryStore=countryStore()
const {loading,countrys,country,citys,city,errors,regine}=storeToRefs(useCountryStore)


const schema=yup.object().shape({
    country:yup.string().required(),
    regine:yup.string().required(),
    city:yup.string(),
    zip_code:yup.string()
})

const emit=defineEmits(['fill_location_field'])


onMounted(async() => {
  initTE({Modal,Ripple,Select})  
  await useCountryStore.getCountrys()
})

const location_result=ref('')

const onProcess=ref(false)

const resetSchema=()=>{
    location_result.value=''
    schema.fields.country=''
    schema.fields.city=''
    schema.fields.regine=''
    schema.fields.zip_code=''
}

const handleComposeLocation=(value)=>{
    onProcess.value=!onProcess.value
    location_result.value=''
    location_result.value=value.country+' | '+value.regine+' | '
    if(value.city && value.city.length>0){
        location_result.value+=value.city+' | '
    }
    if(value.zip_code && value.zip_code.length>0){
        location_result.value+=value.zip_code
    }
    onProcess.value=!onProcess.value
}

const emitTheFinalResult=()=>{
    emit('fill_location_field',location_result.value)
}
</script>

<template>
    <div
    data-te-modal-init
    class="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
    id="staticBackdrop"
    data-te-backdrop="static"
    data-te-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
    >
        <div
        data-te-modal-dialog-ref
        class="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]"
        >
            <div 
            class="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600"
            >
                <!-- the title holder -->
                <div
                 class="flex flex-shrink-0 gap-3 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50"
                >
                    <!-- the left one -->
                    <div class="w-fit flex items-center">
                         <!-- the logo -->
                        <div class="1-10 h-10 flex items-center justify-center rounded-full overflow-hidden">
                            <img src="../assets/images/restlogo.png" class="w-full h-full object-cover" alt="">
                        </div>
                        <!-- the title -->
                        <div class="text-xl font-Roboto capitalize">
                            Location
                        </div>
                    </div>
                    <!-- exit button -->
                    <!--Close button-->
                    <button
                    type="button"
                    class="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                    data-te-modal-dismiss
                    aria-label="Close">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="h-6 w-6 text-red-500">
                        <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    </button>
                </div>
                <!-- the modal body -->
                <div
                data-te-modal-body-ref
                class="relative p-4 flex flex-col justify-center gap-4"
                v-if="!loading"
                >
                    <!-- the image -->
                    <div class="w-10 h-10 overflow-hidden flex items-center justify-center">
                        <img src="../assets/images/ethiopia.png" clas="w-full h-full object-cover" alt="">
                    </div>
                    <!-- the form -->
                    <div class="w-full flex items-center justify-center">
                        <!-- the form -->
                        <Form @submit="handleComposeLocation"
                        :validation-schema="schema"
                        v-slot="{errors}"
                        class="w-full flex flex-col justify-center gap-3"
                        >
                            <!-- the form cont -->
                            <div class="formInputCont">
                                <!-- the label -->
                                <FormLabel title="Country"/>
                                <!-- the input holder -->
                                <div class="w-full relative">
                                    <!-- now the input -->
                                    <Field as="select" data-te-select-init name="country" id="country">
                                        <option
                                        value="One"
                                        data-te-select-icon="../assets/images/ethiopia.png"
                                        >
                                            Ethiopia
                                        </option>
                                        <option
                                        value="Two"
                                        data-te-select-icon="../assets/images/ethiopia.png"
                                        >
                                            Kenia
                                        </option>
                                        <option
                                        value="Three"
                                        data-te-select-icon="../assets/images/ethiopia.png"
                                        >
                                            Ruanda
                                        </option>
                                        <option
                                        value="Four"
                                        data-te-select-icon="../assets/images/ethiopia.png"
                                        >
                                            Burundi
                                        </option>
                                    </Field>
                                    <!-- now the error -->
                                    <div class="formErrorMessage" v-if="errors.country">
                                        {{ errors.country }}
                                    </div>
                                </div>
                            </div>
                            <!-- the other form cont -->
                            <div class="formInputCont">
                                <!-- the label -->
                                <FormLabel title="Rigin"/>
                                <!-- the input holder -->
                                <div class="w-full relative">
                                    <!-- now the input -->
                                    <Field as="select" data-te-select-init name="regine" id="rigin">
                                        <option
                                        value="One"
                                        data-te-select-icon="../assets/images/ethiopia.png"
                                        >
                                            Addis Abeba
                                        </option>
                                        <option
                                        value="Two"
                                        data-te-select-icon="../assets/images/ethiopia.png"
                                        >
                                            Norway
                                        </option>
                                        <option
                                        value="Three"
                                        data-te-select-icon="../assets/images/ethiopia.png"
                                        >
                                            New York
                                        </option>
                                        <option
                                        value="Four"
                                        data-te-select-icon="../assets/images/ethiopia.png"
                                        >
                                            Bla Bla
                                        </option>
                                    </Field>
                                    <!-- now the error -->
                                    <div class="formErrorMessage" v-if="errors.regine">
                                        {{ errors.regine }}
                                    </div>
                                </div>
                            </div>
                            <!-- the other one -->
                            <div class="formInputCont">
                                 <!-- the label -->
                                 <FormLabel title="City" :is-required=false />
                                 <div class="w-full relative">
                                    <Field type="text" name="city" placeholder="Addis Abeba" class="formInput focus:bg-gray-200" />
                                    <!-- the error message -->
                                    <div class="formErrorMessage" v-if="errors.city">
                                        {{ errors.city }}
                                    </div>
                                 </div>
                            </div>
                            <!-- the other one -->
                            <div class="formInputCont">
                                <!-- the label -->
                                <FormLabel title="Zip Code" :is-required=false />
                                <div class="w-full relative">
                                    <Field type="text" name="zip_code" placeholder="HJJ7783" class="formInput focus:bg-gray-200" />
                                    <!-- the error message -->
                                    <div class="formErrorMessage" v-if="errors.zip_code">
                                        {{ errors.zip_code }}
                                    </div>
                                </div>
                            </div>
                            <!-- the compleate buttons -->
                            <div class="formInputCont">
                                <!-- the container -->
                                <div class="w-full flex flex-col gap-2 items-center justify-center">
                                    <button
                                    type="submit"
                                    data-te-ripple-init  
                                    data-te-ripple-color="light"
                                    class="w-full px-2 py-[5px] text-sm font-bold text-white rounded-md bg-secondary"
                                    >
                                        <span v-if="onProcess">
                                            <Loading/>
                                        </span>
                                        <span v-else>
                                            Compose
                                        </span>
                                    </button>
                                    <button
                                    @click="resetSchema"
                                    type="reset"
                                    data-te-ripple-init
                                    data-te-ripple-color="light"
                                    class="w-full px-2 py-[5px] text-sm font-bold text-white rounded-md bg-primary"
                                    >
                                        Reset
                                    </button>
                                </div>
                            </div>
                        </Form>
                    </div>
                    <!-- the final result -->
                    <div class="w-full flex flex-col gap-2 justify-center">
                        <!-- the label -->
                        <FormLabel title="Final Result" :is-required=false />
                        <div class="w-full rounded-md flex items-center px-2 bg-gray-100 h-7 text-xs text-gray-700 font-Roboto border-[1px] border-gray-100">
                           {{ location_result }}
                        </div>
                    </div>
                </div>
                <!-- the loadin screen -->
                <div  data-te-modal-body-ref
                class="relative p-4 flex items-center justify-center gap-4" v-else>
                    <Loading/>
                </div>
                <!-- the modal footer -->
                <div 
                class="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50"
                >
                    <button
                    type="button"
                    class="inline-block rounded bg-green-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                    data-te-modal-dismiss
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    @click="emitTheFinalResult"
                    v-if="location_result"
                    >
                        Save
                    </button>
                    <!-- <button
                    type="button"
                    class="inline-block rounded bg-secondary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                    data-te-modal-dismiss
                    data-te-ripple-init
                    data-te-ripple-color="light">
                        Exit
                    </button> -->
                </div>
            </div>
        </div>
    </div>
</template>