<script setup>
import {Ripple,initTE} from 'tw-elements'
import {Form,Field} from 'vee-validate'
import * as yup from 'yup'

const showPassword=ref(false)
const inProcess=ref(false)

onMounted(()=>{
    initTE({
        Ripple
    })
})

definePageMeta({
    layout:'auth'
})
const passwordRegex= /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{8,})\S$/
const emailRegex=/^((?!\.)[\w_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm

const schema=yup.object({
    email:yup.string().required().email().matches(emailRegex),
    password:yup.string().required().min(8).matches(passwordRegex)
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

const handleLoginTwo=(values)=>{
    inProcess.value=!inProcess.value
    console.log(values)

}
</script>
<template>
    <Head>
        <Title>
            C5 Online Caffe | Login
        </Title>
        <Meta name="description" content="Login in to your account to get further service." />
    </Head>
    <div class="w-1/2 flex flex-col gap-5 items-center justify-center">
        <!-- the title -->
        <div class="font-Roboto text-3xl font-bold">
            Log In
        </div>
        <!-- the form -->
        <div class="w-full  items-center">
           <Form @submit="handleLoginTwo" class="font-Roboto w-full flex flex-col gap-3 items-center" :validation-schema="schema" v-slot="{errors}">
                <!-- input cont -->
                <div class="formInputCont">
                    <!-- the form input container -->
                    <FormLabel title="Email" />
                    <!-- the input holder-->
                    <div class="w-full relative">
                        <!-- the input -->
                        <Field type="email" name="email" placeholder="nejashi@gmail.com" class="formInput focus:bg-gray-200" />
                        <!-- the error message -->
                        <div class="formErrorMessage">
                            {{ errors.email }}
                        </div>
                    </div>
                </div>
                <!-- another input cont -->
                <div class="formInputCont">
                    <!-- the label -->
                    <FormLabel title="Password"/>
                    <!-- the input holder -->
                    <div class="w-full relative">
                        <Field type="password" name="password" placeholder="@Nejashi123" class="formInput focus:bg-gray-200" id="passwordInput"/>
                        <!-- the absolute button -->
                        <div class="absolute right-2 top-[9px] text-gray-500">
                            <button type="button" @click="changePasswordInputFormat"><span v-if="!showPassword"><i class="fa-solid fa-eye"></i></span><span v-else><i class="fa-solid fa-eye-slash"></i></span></button>
                        </div>
                        <!-- the error message -->
                        <div class="formErrorMessage">
                            {{ errors.password }}
                        </div>
                    </div>
                </div>
                <!-- the form submit button -->
                <div class="formInputCont">
                    <!-- the input holders -->
                    <div class="w-full flex flex-col gap-1 items-center">
                        <!-- the submit button -->
                        <button data-te-ripple-init  data-te-ripple-color="light" class="w-full px-2 py-[5px] text-lg font-bold text-white rounded-md bg-secondary">
                            <span v-if="!inProcess">Log In</span>
                            <span v-else><Loading/></span>
                        </button>
                    </div>
                </div>
                <!-- the separeter -->
                <FormSeparetur/>
                <AuthLoging/>
                <!-- the goto signup -->
                <div class="formInputCont">
                    <!-- the input holders -->
                    <div class="w-full flex flex-col gap-1 items-center">
                        <div class="w-full">
                            Dont have an account? <span><nuxt-link to="/auth/signup" class="text-blue-500">Sign Up</nuxt-link></span>
                        </div>
                    </div>
                </div>
            </Form> 
        </div>
        <!-- the footer -->
        <div class="w-full mt-10 flex items-center justify-center text-gray-500 font-Roboto font-light">
            <span>&copy;</span> C5 Online Caffe 2015 E.C
        </div>
    </div>
</template>