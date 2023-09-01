<script setup>
import {Form,Field} from 'vee-validate'
import * as yup from 'yup'
import {useToast} from 'vue-toastification'

const toast=useToast()
const router=useRouter()
const useAuthStore=authStore()

const passwordCapitalLetter=/^((?=\S*?[A-Z]).{8,})\S$/
const passwordNumber=/^((?=\S*?[0-9]).{8,})\S$/

const schema=yup.object().shape({
    password:yup.string().required().matches(passwordCapitalLetter,"at least one letter must be capital").matches(passwordNumber,"at least one letter must be digit"),
    password_confirmation:yup.string().required().oneOf([yup.ref('password'), null], 'Confirmation password must match with password'),
})

const changePasswordInputFormat=()=>{
    const passwordInpu=document.getElementById('passwordInput')
    showPassword.value=!showPassword.value
    if(showPassword.value){
    passwordInpu.type="text"
    }else{
        passwordInpu.type="password"
    }
}

const changePasswordConfInputFormat=()=>{
    const passwordConfInput=document.getElementById('passwordConfInput')
    showPasswordConf.value=!showPasswordConf.value
    if(showPasswordConf.value){
        passwordConfInput.type="text"
    }else{
        passwordConfInput.type="password"
    }
}


const handleChangePassword=async(value)=>{

}

definePageMeta({
    layout:'auth'
})
</script>

<template>
    <Head>
        <Title>
            C5 Online Caffe | Change Password
        </Title>
        <Meta name="description" content="This will allow the user to update its password while he lost his own password." />
    </Head>
    <div
    class="w-full sm:w-3/4 flex flex-col gap-5 items-center justify-center"
    >
        <!-- the title -->
        <div class="font-Roboto sm:text-xl md:text-3xl font-bold">
            Change Password
        </div>
        <!-- the form -->
        <div class="w-full items-center" v-if="useAuthStore.$state.network_error==false">
            <Form
            @submit="handleChangePassword"
            class="font-Roboto w-full flex flex-col sm:flex-row mb-2 gap-2 sm:gap-10 " 
            :validation-schema="schema" v-slot="{errors}"
            >
                <!-- the input cont -->
                <div
                class="formInputCont"
                >
                    <FormLabel title="new password"/>
                    <!-- the input holder -->
                    <div class="w-full relative">
                        <Field type="password" name="password" placeholder="@Nejashi123" class="formInput focus:bg-gray-200" id="passwordInput"/>
                        <InputErrorMark v-if="errors.password || attemptErrors.password" />
                        <!-- the absolute button -->
                        <div class="absolute right-2 top-[9px] text-gray-500">
                            <button type="button" @click="changePasswordInputFormat"><span v-if="!showPassword"><i class="fa-solid fa-eye"></i></span><span v-else><i class="fa-solid fa-eye-slash"></i></span></button>
                        </div>
                        <!-- the error message -->
                        <div class="formErrorMessage" v-if="errors.password">
                            {{ errors.password }}
                        </div>
                        <!-- the other one -->
                        <div class="formErrorMessage" v-if="attemptErrors.password">
                            {{ attemptErrors.password }}
                        </div>
                    </div>
                </div>
                <!-- another input cont -->
                <div class="formInputCont">
                    <!-- the label -->
                    <FormLabel title="Confirm The New Password"/>
                    <!-- the input holder -->
                    <div class="w-full relative">
                        <Field type="password" name="password_confirmation" placeholder="@Nejashi123" class="formInput focus:bg-gray-200" id="passwordConfInput"/>
                        <InputErrorMark v-if="errors.password_confirmation" />
                        <!-- the absolute button -->
                        <div class="absolute right-2 top-[9px] text-gray-500">
                            <button type="button" @click="changePasswordConfInputFormat"><span v-if="!showPasswordConf"><i class="fa-solid fa-eye"></i></span><span v-else><i class="fa-solid fa-eye-slash"></i></span></button>
                        </div>
                        <!-- the error message -->
                        <div class="formErrorMessage">
                            {{ errors.password_confirmation }}
                        </div>
                    </div>
                </div>
                <!-- the form submit button -->
                <div class="formInputCont">
                        <!-- the input holders -->
                        <div class="w-full flex flex-col gap-1 items-center">
                            <!-- the submit button -->
                            <button type="submit" data-te-ripple-init  data-te-ripple-color="light" class="w-full px-2 py-[5px] text-lg font-bold text-white rounded-md bg-secondary">
                                <span v-if="!inProcess">Change</span>
                                <span v-else><Loading/></span>
                            </button>
                        </div>
                    </div>
            </Form>
        </div>  
    </div>
</template>