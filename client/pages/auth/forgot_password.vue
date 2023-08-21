<script setup>
import {Form,Field} from 'vee-validate'
import * as yup from 'yup'
import {Ripple,initTE} from 'tw-elements'

const inProcess=ref(false)

onMounted(()=>{
    initTE({
        Ripple
    })
})

const emailRegex=/^((?!\.)[\w_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm
const schema=yup.object().shape({
    email:yup.string().required().email().matches()
})

const handleForgotPassword=(value)=>{
    inProcess.value=!inProcess.value
    console.log(value)
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
            <Form @submit="handleForgotPassword" class="font-Roboto w-full flex flex-col gap-3 items-center" :validation-schema="schema" v-slot="{errors}">
                <!-- input cont -->
                <div class="formInputCont">
                    <FormLabel title="Email" />
                    <!-- the input holder -->
                    <div class="w-full relative">
                        <!-- the input -->
                        <Field type="email" placeholder="nejashi@gmail.com" class="formInput focus:bg-gray-200" name="email" />
                        <InputErrorMark v-if="errors.email"/>
                        <!-- the error message -->
                        <div class="formErrorMessage">
                            {{ errors.email }}
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
            <!-- the footer -->
        <div class="w-full mt-10 flex items-center justify-center text-gray-500 font-Roboto font-light">
            <span>&copy;</span> C5 Online Caffe 2015 E.C
        </div>
        </div>
    </div>

</template>