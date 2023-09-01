<script setup>
import {storeToRefs} from 'pinia'
import {Ripple,initTE,Carousel} from 'tw-elements'
import {useToast} from 'vue-toastification'


const toast=useToast()
const auth=authStore()
const {user}=storeToRefs(auth)


onMounted(() => {
  initTE({Ripple,Carousel})  
})

</script>

<template>
    <div class="min-h-screen w-full flex flex-col gap-5 items-center font-Roboto">
        <!-- the hero container -->
        <div class="w-full flex flex-col md:flex-row items-center justify-between h-fit border-b mt-5 gap-5 py-10">
            <!-- the left -->
            <div class="w-full sm:w-3/4 md:w-1/2 order-2 md:order-1 flex flex-col gap-3 justify-center">
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
                    <div v-if="auth.$state.isAuthed==false">
                        <router-link to="/auth/signup" data-te-ripple-init class="px-5 py-2 border border-secondary rounded-full theLink"><span>Register</span><span class="arrow">&rightarrow;</span></router-link>
                    </div>
                </div>
            </div>
            <!-- the right -->
            <div class="w-full sm:w-3/4 md:order-2 md:w-1/2 flex items-center justify-center py-5 h-fit">
                <!-- the owter circle -->
                <div class="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center rounded-full bg-orange-100">
                    <!-- the inner circle -->
                    <div class="w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center rounded-full bg-orange-300">
                        <!-- the image -->
                        <div class="w-52 h-52 sm:w-64 sm:h-64 flex items-center justify-center overflow-hidden rounded-full bg-orange-400">
                            <!-- <img src="../assets/images/online shoping 2.png" class="w-full h-full object-cover" alt=""> -->
                            <img src="../assets/images/thesalad.jpg" alt="">
                        </div>
                    </div>
                    <!-- the absolute links -->
                    <!-- one -->
                    <div class="absolute left-6 top-8 bg-white w-10 h-10 sm:w-14 sm:h-14 rounded-full border border-secondary p-2 flex items-center text-sm sm:text-xl justify-center transition duration-200 ease-out transform hover:scale-125 cursor-pointer hover:shadow-xl">
                        <i class="fa-brands fa-paypal"></i>
                    </div>
                    <!-- two -->
                    <div class="absolute -left-5 top-24 sm:top-32 bg-white w-10 h-10 sm:w-14 sm:h-14 rounded-full border border-secondary text-sm sm:text-xl p-2 flex items-center justify-center transition duration-200 ease-out transform hover:scale-125 cursor-pointer hover:shadow-xl">
                        <i class="fas fa-user-secret"></i>
                    </div>
                    <!-- three -->
                    <div class="absolute -left-3 bottom-16 sm:bottom-24 bg-white w-10 h-10 sm:w-14 sm:h-14 rounded-full border border-secondary text-sm sm:text-xl p-2 flex items-center justify-center transition duration-200 ease-out transform hover:scale-125 cursor-pointer hover:shadow-xl">
                        <i class="fas fa-shipping-fast"></i>
                    </div>
                    <!-- foure -->
                    <div class="absolute left-10 bottom-0 sm:bottom-6 bg-white w-10 h-10 sm:w-14 sm:h-14 rounded-full border border-secondary text-sm sm:text-xl p-2 flex items-center justify-center transition duration-200 ease-out transform hover:scale-125 cursor-pointer hover:shadow-xl">
                        <i class="fa-solid fa-cart-plus"></i>
                    </div>
                </div>
            </div>

        </div>
        <!-- the user testimonials -->
        <div
  id="carouselExampleCaptions"
  class="relative md:hidden min-h-[20em] sm:min-h-[13em] bg-orange-300 rounded-md shadow-md"
  data-te-carousel-init
  data-te-ride="carousel">
  <!--Carousel indicators-->
  <div
    class="absolute bottom-0 left-0 right-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0"
    data-te-carousel-indicators>
    <button
      type="button"
      data-te-target="#carouselExampleCaptions"
      data-te-slide-to="0"
      data-te-carousel-active
      class="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent  bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
      aria-current="true"
      aria-label="Slide 1"></button>
    <button
      type="button"
      data-te-target="#carouselExampleCaptions"
      data-te-slide-to="1"
      class="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
      aria-label="Slide 2"></button>
    <button
      type="button"
      data-te-target="#carouselExampleCaptions"
      data-te-slide-to="2"
      class="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
      aria-label="Slide 3"></button>
  </div>

  <!--Carousel items-->
  <div
    class="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
    <!--First item-->
    <div
      class="relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
      data-te-carousel-active
      data-te-carousel-item
      style="backface-visibility: hidden">
      <div class="flex flex-col gap-4 justify-center p-4">
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
    </div>
    <!--Second item-->
    <div
      class="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
      data-te-carousel-item
      style="backface-visibility: hidden">
      <!-- the middle -->
      <div class="flex flex-col gap-4 justify-center p-4">
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
    </div>
    <!--Third item-->
    <div
      class="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
      data-te-carousel-item
      style="backface-visibility: hidden">
      <!-- the last -->
      <div class="flex flex-col gap-4 justify-center p-4">
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
  </div>

  <!--Carousel controls - prev item-->
  <button
    class="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
    type="button"
    data-te-target="#carouselExampleCaptions"
    data-te-slide="prev">
    <span class="inline-block h-8 w-8">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-6 w-6">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
    </span>
    <span
      class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
      >Previous</span
    >
  </button>
  <!--Carousel controls - next item-->
  <button
    class="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
    type="button"
    data-te-target="#carouselExampleCaptions"
    data-te-slide="next">
    <span class="inline-block h-8 w-8">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-6 w-6">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </span>
    <span
      class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
      >Next</span
    >
  </button>
</div>
        <div class="w-full hidden md:flex items-center justify-between h-fit border-b mt-5 gap-10 py-10">
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
        <div class="w-full rounded-md min-h-[10em] px-2 md:px-0 mb-10 md:shadow-md md:bg-gradient-to-br bg-gray-100 md:from-secondary md:to-orange-300 text-white flex items-center justify-center">
            <!-- Container for demo purpose -->
<div class="container mt-2 mx-auto md:px-6">
  <!-- Section: Design Block -->
  <section class="mb-4 text-center">
    <h2 class="mt-4 mb-10 text-3xl text-primary md:text-white font-bold">Why You Choose us</h2>

    <div class="grid lg:grid-cols-3 lg:gap-x-12">
      <div class="mb-16 lg:mb-0">
        <div
          class="block h-full rounded-lg bg-primary shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
          <div class="flex justify-center">
            <div class="-mt-8 inline-block rounded-full bg-primary-100 p-4 bg-white text-primary shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" class="h-7 w-7">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
              </svg>
            </div>
          </div>
          <div class="p-3">
            <h3 class="mb-4 text-2xl font-bold text-white dark:text-primary-400">
              10,000+
            </h3>
            <h5 class="mb-4 text-lg font-medium">Products</h5>
            <p class="text-neutral-500 dark:text-neutral-300">
              Laudantium totam quas cumque pariatur at doloremque hic quos
              quia eius
            </p>
          </div>
        </div>
      </div>

      <div class="mb-16 lg:mb-0">
        <div
          class="block h-full rounded-lg bg-primary text-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
          <div class="flex justify-center">
            <div class="-mt-8 inline-block rounded-full bg-primary-100 p-4 bg-white text-primary shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" class="h-7 w-7">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
              </svg>
            </div>
          </div>
          <div class="p-3">
            <h3 class="mb-4 text-2xl font-bold text-white dark:text-primary-400">
              5000+
            </h3>
            <h5 class="mb-4 text-lg font-medium">Users</h5>
            <p class="text-neutral-500 dark:text-neutral-300">
              Eum nostrum fugit numquam, voluptates veniam neque quibusdam
              ullam
            </p>
          </div>
        </div>
      </div>

      <div class="">
        <div
          class="block h-full rounded-lg bg-primary text-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
          <div class="flex justify-center">
            <div class="-mt-8 inline-block rounded-full bg-primary-100 p-4 bg-white text-primary shadow-md">
              <i class="fas fa-shipping-fast"></i>
            </div>
          </div>
          <div class="p-3">
            <h3 class="mb-4 text-2xl font-bold text-white dark:text-primary-400">
              49/month
            </h3>
            <h5 class="mb-4 text-lg font-medium">Deliverys</h5>
            <p class="text-neutral-500 dark:text-neutral-300">
              Cupiditate enim, minus nulla dolor cumque iure eveniet facere
              ullam
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Section: Design Block -->
</div>
<!-- Container for demo purpose -->
</div>
        <!-- the last description -->
</div>
<!-- this is the last one -->
<div class="mb-10   border-t py-5 w-full flex flex-col md:flex-row items-center justify-between h-fit gap-5">
    <!-- the left -->
    <div class="w-full sm:w-3/4 md:w-1/2 flex items-center justify-center py-5 h-fit">
        <div class="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center rounded-full bg-orange-100">
            <!-- the inner cirle-->
            <div  class="w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center rounded-full bg-orange-300">
                <!-- the image -->
                <div class="w-52 h-52 sm:w-64 sm:h-64 flex items-center justify-center overflow-hidden rounded-full bg-orange-400">
                    <img src="../assets/images/chill burger.jpeg" class="w-full h-full object-cover" alt="">
                </div>
            </div>
        </div>
    </div>
    <!-- the right -->
    <div class="w-full sm:w-3/4 md:w-1/2 flex flex-col gap-3 justify-center">
        <!-- the title -->
        <div class="w-full text-4xl font-bold capitalize">
            Our service and our products
        </div>
        <!-- the article -->
        <div class="text-gray-900 capitalize">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus consequatur provident sapiente modi harum iure expedita, facere ullam rerum doloremque necessitatibus quo, dolores libero officia numquam, delectus ipsa fugiat. Ducimus dolore facilis repellendus libero beatae.</p>
        </div>
        <!-- the links -->
        <div class="w-full flex items-center gap-5">
            <div>
                <router-link to="/auth/signup" data-te-ripple-init class="px-5 py-2 border border-secondary rounded-full theLink"><span>Register</span><span class="arrow">&rightarrow;</span></router-link>
            </div>
        </div>
    </div>
</div>
</template>