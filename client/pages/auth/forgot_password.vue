<script setup>
import {Form,Field} from 'vee-validate'
import * as yup from 'yup'
import {Ripple,initTE} from 'tw-elements'
import {useToast} from 'vue-toastification'


const hide_form=ref(false)
const inProcess=ref(false)
const toast=useToast()

const useAuthStore=authStore()


onMounted(()=>{
    initTE({
        Ripple
    })
})

const emailRegex=/^((?!\.)[\w_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm
const schema=yup.object().shape({
    email:yup.string().required().email().matches()
})

const handleForgotPassword=async(value)=>{
    inProcess.value=!inProcess.value
    const result=await useAuthStore.PasswordResetRequest(value)
    if(result==true){
        hide_form.value=true
        if(useAuthStore.$state.password_reset_success_message){
            toast.success(useAuthStore.$state.password_reset_success_message)
            useAuthStore.resetPasswordSuccessMessage()
        }else{
            toast.success("You almost get email to reset your password.please verify your email")
        }
        inProcess.value=false
    }else{
        if(useAuthStore.$state.password_reset_error_message){
            toast.error(useAuthStore.$state.password_reset_error_message,{
                position:'bottom-right'
            })
            useAuthStore.resetPasswordErrorMessage()
        }else{
            toast.error('We got a troble to let you change your password',{
                position:"bottom-right"
            })
        }
        inProcess.value=false
    }
}

definePageMeta({
    layout:'auth'
})
</script>
<template>
    <Head>
        <Title>
            C5 Online Caffe | Forgot Password
        </Title>
        <Meta name="description" content="This is used to change password if the user forget its password by providing its email address." />
    </Head>
    <div class="w-full md:w-1/2 flex flex-col gap-5 items-center justify-center">
        <!-- the title -->
        <div class="font-Roboto sm:text-xl md:text-3xl font-bold">
            Forgot Password
        </div>
        <!-- the form -->
        <div class="w-full items-center">
            <Form @submit="handleForgotPassword" class="font-Roboto w-full flex flex-col gap-3 items-center" :validation-schema="schema" v-slot="{errors}" v-if="hide_form==false">
                <!-- input cont -->
                <div class="formInputCont">
                    <FormLabel title="Email" />
                    <!-- the input holder -->
                    <div class="w-full relative">
                        <!-- the input -->
                        <Field type="email" placeholder="nejashi@gmail.com" class="formInput focus:bg-gray-200" name="email" />
                        <InputErrorMark v-if="errors.email || useAuthStore.$state.attemptErrors.email"/>
                        <!-- the error message -->
                         <div class="formErrorMessage" v-if="errors.email">
                            {{ errors.email }}
                        </div>
                        <!-- the another email error -->
                        <div
                        class="formErrorMessage"
                        v-else-if="useAuthStore.$state.attemptErrors.email"
                        >
                            {{ useAuthStore.$state.attemptErrors.email }}
                        </div>
                    </div>
                </div>
                <!-- the form submit button -->
                <div class="formInputCont">
                    <!-- the input holders -->
                    <div class="w-full flex flex-col gap-1 items-center">
                        <!-- the submit button -->
                        <button data-te-ripple-init  data-te-ripple-color="light" class="w-full px-2 py-[5px] text-lg font-bold text-white rounded-md bg-secondary">
                            <span v-if="!inProcess">Reset Password</span>
                            <span v-else><Loading/></span>
                        </button>
                    </div>
                </div>
                <!-- the login link -->
                <div class="formInputCont">
                    <!-- the input holder -->
                    <div class="w-full flex flex-col gap-1 items-center">
                        <div class="w-full">
                            <span>
                                <nuxt-link to="/auth/login" class="text-blue-500">Log In.</nuxt-link>
                            </span>
                        </div>
                    </div>
                </div>
            </Form>
            <!-- the other one -->
            <div
            class="ont-Roboto w-full flex flex-col gap-3 items-center"
            v-else-if="hide_form">
                We send you email. Go ahead and verify your email to reset your password.
            </div>
            <!-- the footer -->
        <div class="w-full mt-10 flex items-center justify-center text-gray-500 font-Roboto font-light">
            <span>&copy;</span> C5 Online Caffe 2015 E.C
        </div>
        </div>
    </div>

</template>