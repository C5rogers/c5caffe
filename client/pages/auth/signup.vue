<script setup>

definePageMeta({
    layout:'auth'
})
</script>
<template>
    <Head>
        <Title>
            C5 Online Caffe | Signup
        </Title>
        <Meta name="description" content="Signup in to new account to get further service." />
    </Head>
    <div class="w-1/2 flex flex-col gap-5 items-center justify-center">
         <!-- the title -->
         <div class="font-Roboto text-3xl font-bold">
            Sign Up
        </div>
        <!-- the form -->
        <div class="w-full items-center">
            <form @submit.prevent="" class="font-Roboto w-full flex flex-col gap-3 items-center">
                <!-- input cont -->
                <div class="formInputCont">
                    <FormLabel title="first name"/>
                    <!-- the input holder -->
                    <div class="w-full relative">
                        <input type="text" name="firstname" placeholder="Nejashi" class="formInput focus:bg-gray-200">
                        <!-- the error message -->
                        <div class="formErrorMessage">

                        </div>
                    </div>
                </div>
                 <!-- input cont -->
                 <div class="formInputCont">
                    <FormLabel title="last name"/>
                    <!-- the input holder -->
                    <div class="w-full relative">
                        <input type="text" name="lastname" placeholder="AlHabib" class="formInput focus:bg-gray-200">
                        <!-- the error message -->
                        <div class="formErrorMessage">

                        </div>
                    </div>
                </div>
                <!-- input cont -->
                <div class="formInputCont">
                    <!-- the form input container -->
                    <FormLabel title="Email" />
                    <!-- the input holder-->
                    <div class="w-full relative">
                        <!-- the input -->
                        <input type="email" name="email" placeholder="nejashi@gmail.com" class="formInput focus:bg-gray-200">
                        <!-- the error message -->
                        <div class="formErrorMessage">
                            
                        </div>
                    </div>
                </div>
                <!-- input cont -->
                <div class="formInputCont">
                    <!-- the form input container -->
                    <FormLabel title="Phonenumber"/>
                    <div class="w-full relative">
                        <!-- the input -->
                        <input type="number" name="phonenumber" placeholder="+2519(+2517)/09(07) 22 88 44 55" min="0" class="formInput focus:bg-gray-200">
                        <!-- the error message -->
                        <div class="formErrorMessage">

                        </div>

                    </div>
                </div>
                <!-- input cont -->
                <div class="formInputCont">
                    <!-- the form input container -->
                    <FormLabel title="location"/>
                    <div class="w-full relative">
                        <!-- the input -->
                        <input type="text" name="location" placeholder="Ethiopia | Addis Abeba | Yeka | wereda 12 | Happy Vialge" class="formInput focus:bg-gray-200">
                        <!-- the error message -->
                        <div class="formErrorMessage">

                        </div>
                    </div>

                </div>
                <!-- the input cont -->
                <div class="formInputCont">
                    <!-- the form input container -->
                    <FormLabel title="Gender"/>
                    <div class="w-full relative">
                        <!-- the form inputs -->
                        <div class="w-full flex tiems-center gap-5">
                            <div class="mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]">
                                <input
                                class="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-secondary before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-secondary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-secondary checked:after:bg-secondary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-secondary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-secondary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                type="radio"
                                name="inlineRadioOptions"
                                id="inlineRadio1"
                                value="m" />
                            </div>
                            <div class="mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]">
                                <input
                                class="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-secondary before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-secondary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-secondary checked:after:bg-secondary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-secondary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-secondary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                type="radio"
                                name="inlineRadioOptions"
                                id="inlineRadio1"
                                value="f" />
                            </div>
                        </div>
                        <!-- the error message -->
                        <div class="formErrorMessage">

                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>