<script setup>

import {Ripple,initTE} from 'tw-elements'

onMounted(() => {
  initTE({Ripple})  
})

</script>

<template>
    <div class="min-h-screen w-full flex flex-col gap-5 items-center font-Roboto">
        <!-- the hero container -->
        <div class="w-full flex items-center justify-between h-fit border-b mt-5 gap-5 py-10">
            <!-- the left -->
            <div class="w-1/2 flex flex-col gap-3 justify-center">
                <!-- the title -->
                <div class="w-full text-4xl font-bold capitalize">
                    Welcome To <span class="text-secondary">C5</span> Online Caffe.
                </div>
                <!-- the article -->
                <div class="text-gray-900 capitalize">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus consequatur provident sapiente modi harum iure expedita, facere ullam rerum doloremque necessitatibus quo, dolores libero officia numquam, delectus ipsa fugiat. Ducimus dolore facilis repellendus libero beatae.</p>
                </div>
                <!-- the links -->
                <div class="w-full flex items-center gap-5">
                    <!-- the product link-->
                    <div>
                        <router-link to="/product" data-te-ripple-init data-te-ripple-color="light" class="px-5 py-2 bg-secondary text-white rounded-full transition duration-200 transform hover:scale-105 theLink"><span>Get Start</span><span class="arrow">&rightarrow;</span></router-link>
                    </div>
                    <!-- the signup link -->
                    <div>
                        <router-link to="/auth/signup" data-te-ripple-init class="px-5 py-2 border border-secondary rounded-full theLink"><span>Register</span><span class="arrow">&rightarrow;</span></router-link>
                    </div>
                </div>
            </div>
            <!-- the right -->
            <div class="w-1/2 flex items-center justify-center py-5 h-fit">
                <!-- the owter circle -->
                <div class="relative w-96 h-96 flex items-center justify-center rounded-full bg-orange-100">
                    <!-- the inner circle -->
                    <div class="w-80 h-80 flex items-center justify-center rounded-full bg-orange-300">
                        <!-- the image -->
                        <div class="w-64 h-64 flex items-center justify-center overflow-hidden rounded-full bg-orange-400">
                            <img src="../assets/images/online shoping 2.png" class="w-full h-full object-cover" alt="">
                        </div>
                    </div>
                    <!-- the absolute links -->
                    <!-- one -->
                    <div class="absolute left-6 top-8 bg-white w-14 h-14 rounded-full border border-secondary p-2 flex items-center text-xl justify-center">
                        <i class="fa-brands fa-paypal"></i>
                    </div>
                    <!-- two -->
                    <div class="absolute -left-5 top-32 bg-white w-14 h-14 rounded-full border border-secondary text-xl p-2 flex items-center justify-center">
                        <i class="fas fa-user-secret"></i>
                    </div>
                    <!-- three -->
                    <div class="absolute -left-3 bottom-24 bg-white w-14 h-14 rounded-full border border-secondary text-xl p-2 flex items-center justify-center">
                        <i class="fas fa-shipping-fast"></i>
                    </div>
                    <!-- foure -->
                    <div class="absolute left-10 bottom-6 bg-white w-14 h-14 rounded-full border border-secondary text-xl p-2 flex items-center justify-center">
                        <i class="fa-solid fa-cart-plus"></i>
                    </div>
                </div>
            </div>

        </div>
        <!-- the user testimonials -->
        <div class="w-full flex items-center justify-between h-fit border-b mt-5 gap-10 py-10">
            <!-- the left -->
            <div class="bg-orange-100 flex flex-col gap-4 justify-center p-4 rounded-md shadow-md">
                <!-- the article -->
                <div class="text-gray-700">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut omnis sunt consequuntur iure laudantium perferendis inventore dolores iste eius, cumque voluptates fugiat nam facilis non!</p>
                </div>
                <!-- the profile -->
                <div class="flex gap-2 items-center">
                    <!-- the image -->
                    <div class="w-12 h-12 rounded-full flex items-center justify-center border-secondary bg-white overflow-hidden">
                        <img src="../assets/images/userone.png"  class="w-full h-full object-cover" alt="">
                    </div>
                    <!-- the name -->
                    <div class="text-gray-800 text-lg">
                        Natenael Haylemariam.
                    </div>
                </div>
            </div>
            <!-- the middle -->
            <div class="bg-orange-100 flex flex-col gap-4 justify-center p-4 rounded-md shadow-md">
                <!-- the article -->
                <div class="text-lg text-gray-700">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit quaerat aperiam perferendis possimus eum tempora itaque saepe eveniet, nihil tempore ipsam. In tempora beatae quasi animi nisi corporis doloribus qui itaque exercitationem quia?</p>
                </div>
                <!-- the profile -->
                <div class="flex gap-2 items-center">
                    <!-- the image -->
                    <div class="w-12 h-12 rounded-full flex p-1 items-center justify-center border-secondary bg-white overflow-hidden">
                        <img src="../assets/images/usertwo.png" class="w-full h-full object-cover" alt="">
                    </div>
                    <!-- the name -->
                    <div class="text-gray-800 text-lg">
                        Rosa Mekonen.
                    </div>
                </div>
            </div>
            <!-- the last -->
            <div class="bg-orange-100 flex flex-col gap-4 justify-center p-4 rounded-md shadow-md">
                <!-- the article -->
                <div class="text-gray-700">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque distinctio deleniti eveniet dolorem porro nesciunt dicta, eligendi natus, assumenda qui, aut quos dolor vero ullam.</p>
                </div>
                <!-- the profile -->
                <div  class="flex gap-2 items-center">
                    <!-- the image -->
                    <div class="w-12 h-12 rounded-full p-1 flex items-center justify-center border-secondary bg-white overflow-hidden">
                        <img src="../assets/images/userthree.png" class="w-full h-full object-cover" alt="">
                    </div>
                    <!-- the name -->
                    <div class="text-gray-800 text-lg">
                        Hiwet Demese.
                    </div>
                </div>
            </div>
        </div>
        <!-- the servicess that we offer -->
        <div>

        </div>
        <!-- the last description -->
    </div>
</template>