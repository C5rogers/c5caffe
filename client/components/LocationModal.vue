<script setup>
import {Ripple,Modal,initTE,Select} from "tw-elements";
import { Form,Field } from 'vee-validate'
import {storeToRefs} from 'pinia'


const flagimage=ref('')
const googleMap=ref('')
const flagImageAlt=ref('')
const timezone=ref('')
const useCountryStore=countryStore()
const {loading,countrys,mainLoading,selectedCountry,selectedCity,citys,errors}=storeToRefs(useCountryStore)

const emit=defineEmits(['fill_location_field'])


onMounted(async() => {
  initTE({Modal,Ripple,Select})
  if(useCountryStore.$state.countrys.length==0){
    await useCountryStore.getCountrys()
  }
})

const location_result=ref('')

const onProcess=ref(false)

const resetSchema=()=>{
    location_result.value=''
    form.value.country=''
    form.value.capital_city=''
    form.value.regine=''
    form.value.zip_code=''
    form.value.country_error=''
    form.value.capital_city_error=''
    form.value.zip_code_error=''
    form.value.regine_error=''
}

const form=ref({
    country:'',
    state:'',
    regine:'',
    zip_code:'',
    country_error:'',
    state_error:'',
    regine_error:'',
    zip_code_error:''
})

const validateForm=()=>{
    if(!form.value.country){
        form.value.country_error="Country is required"
    }
    if(!form.value.capital_city){
        form.value.capital_city_error="Capital city also required"
    }

    if(!form.value.country_error && !form.value.state_error){
        return true
    }else{
        return false
    }
}
const handleComposeLocation=()=>{
    onProcess.value=true
    if(validateForm()==true){
        location_result.value=''
    location_result.value=form.value.country+' | '+form.value.capital_city+' | '
    if(form.value.regine && form.value.regine.length>0){
        location_result.value+=form.value.regine+' | '
    }
    if(form.value.zip_code && form.value.zip_code.length>0){
        location_result.value+=form.value.zip_code
    }
    onProcess.value=false
    }
    onProcess.value=false
}

const emitTheFinalResult=()=>{
    emit('fill_location_field',location_result.value)
}
const handleCountryChange=async(e)=>{
    const countryname=e.target.value
    await useCountryStore.getCountry(countryname)
    flagimage.value=useCountryStore.$state.selectedCountry[0].flags.png
    flagImageAlt.value=useCountryStore.$state.selectedCountry[0].flags.alt
    googleMap.value=useCountryStore.$state.selectedCountry[0].maps.googleMaps
    form.value.regine=useCountryStore.$state.selectedCountry[0].region
    form.value.zip_code=useCountryStore.$state.selectedCountry[0].cca2+' | '+useCountryStore.$state.selectedCountry[0].cca3+' | '+useCountryStore.$state.selectedCountry[0].ccn3+' | '+useCountryStore.$state.selectedCountry[0].cioc
    form.value.capital_city=useCountryStore.$state.selectedCountry[0].capital[0]
    timezone.value=useCountryStore.$state.selectedCountry[0].timezones[0]
    console.log(useCountryStore.$state.selectedCountry[0])
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
                v-if="!mainLoading"
                >
                    <!-- the image holder -->
                    <div class="w-full flex items-center gap-1" v-if="flagimage || googleMap">
                        <!-- the image -->
                        <div class="w-10 h-7 overflow-hidden flex items-center justify-center" v-if="flagimage">
                            <img :src="flagimage" class="w-full h-full object-cover" :alt="flagImageAlt">
                        </div>
                        <!-- the map -->
                        <div class="h-7 overflow-hidden flex flex-col justify-center items-center" v-if="googleMap">
                            <a :href="googleMap" target="_blank" class="text-blue-500 text-xs font-Roboto">Google Map <span>&rightarrow;</span></a>
                            <div class="text-gray-500 text-xs font-Roboto">
                               Time zone: {{ timezone }}
                            </div>
                        </div>
                    </div>
                    
                    <!-- the form -->
                    <div class="w-full flex items-center justify-center">
                        <!-- the form -->
                        <form @submit.prevent="handleComposeLocation"
                        class="w-full flex flex-col justify-center gap-3"
                        >
                            <!-- the form cont -->
                            <div class="formInputCont">
                                <!-- the label -->
                                <FormLabel title="Country"/>
                                <!-- the input holder -->
                                <div class="w-full relative">
                                    <!-- the country list -->
                                    <Field as="select" data-te-select-init v-model="form.country" name="country" id="country"
                                    @change="handleCountryChange"
                                    class="w-full py-[9px] text-gray-600 border-[1px] border-gray-200 px-2 rounded-md transition duration-200"
                                    >
                                        <option value="">Seleect a Country</option>
                                        <option v-for="individul in countrys" :key="individul.name.common" :value="individul.name.common">
                                        {{ individul.name.common }}
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
                                <FormLabel title="Capital city"/>
                                <!-- the input holder -->
                                <div class="w-full relative">
                                    <!-- now the input -->

                                    <input type="text" placeholder="Addis Abeba" name="capital_city" v-model="form.capital_city" class="formInput focus:bg-gray-200">
                                    <div class="formErrorMessage" v-if="form.capital_city_error">
                                        {{  form.capital_city_error }}
                                    </div>
                                </div>
                            </div>
                            <!-- the other one -->
                            <div class="formInputCont">
                                 <!-- the label -->
                                 <FormLabel title="City" :is-required=false />
                                 <div class="w-full relative">
                                    <input type="text" v-model="form.regine" name="city" placeholder="Addis Abeba" class="formInput focus:bg-gray-200" >
                                    <!-- the error message -->
                                    <div class="formErrorMessage" v-if="form.regine_error">
                                        {{ form.regine_error }}
                                    </div>
                                 </div>
                            </div>
                            <!-- the other one -->
                            <div class="formInputCont">
                                <!-- the label -->
                                <FormLabel title="Zip Code" :is-required=false />
                                <div class="w-full relative">
                                    <input type="text" v-model="form.zip_code" name="zip_code" placeholder="HJJ7783" class="formInput focus:bg-gray-200" >
                                    <!-- the error message -->
                                    <div class="formErrorMessage" v-if="form.zip_code_error">
                                        {{ form.zip_code_error }}
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
                        </form>
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