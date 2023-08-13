<script setup>

const router=useRouter()
const handleGoHome=()=>{
    router.push('/')
}
</script>

<template>

    <footer class=" w-full h-80 bg-primary text-white mt-auto relative shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
        <!-- the right box -->
        <div class="w-full sm:w-3/4 h-56 bg-white text-primary ml-auto sm:rounded-tl-xl flex justify-between items-center px-3 gap-5 relative">
            <!-- the left -->
            <div class="hidden md:flex w-1/4  items-center justify-center">
                <!-- the absolute circle -->
                <div class="hidden md:flex w-56 h-56 items-center justify-center rounded-full absolute -bottom-20 -left-20 bg-white">
                    <!--the inner circle -->
                    <div class="w-3/4 h-3/4 flex items-center justify-center rounded-full bg-gray-200">
                        <!-- the logo -->
                        <div class="w-24 h-24 flex items-center justify-center rounded-full overflow-hidden border border-gray-100">
                            <a href="#" class="h-full w-full">
                                <img src="../assets/images/restlogo.png" class="w-full h-full object-cover" alt="">
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <!-- the right content -->
            <div class="w-full sm:w-3/4 h-full py-5 flex items-center justify-center gap-5 font-Roboto ">

                <!-- the left content -->
                <div class="h-full w-1/2 flex flex-col gap-1 justify-center">
                    <!-- the main title -->
                    <div class="text-xl md:text-3xl lg:text-clit-4xl font-bold">
                        C5 Online Caffe.
                    </div>
                    <!-- the location -->
                    <div class="text-lg md:text-xl lg:text-2xl font-light">
                        Ethiopia | Addis Abeba.
                    </div>
                    <!-- the social media links -->
                    <div class="w-full flex items-center justfy-center">
                        <ul class="w-full flex items-center gap-3">
                            <li>
                                <a href="#" class="w-7 h-7 sm:w-10 sm:h-10 md:w-14 md:h-14 flex items-center bg-primary justify-center text-white rounded-full text-lg sm:text-xl md:text-3xl"><i class="fa-brands fa-twitter"></i></a>
                            </li>
                            <li>
                                <a href="#" class="w-7 h-7 sm:w-10 sm:h-10 md:w-14 md:h-14 flex items-center bg-primary justify-center text-white rounded-full text-lg sm:text-xl md:text-3xl"><i class="fa-brands fa-instagram"></i></a>
                            </li>
                            <li>
                                <a href="#" class="w-7 h-7 sm:w-10 sm:h-10 md:w-14 md:h-14 flex items-center bg-primary justify-center text-white rounded-full text-lg sm:text-xl md:text-3xl"><i class="fa-brands fa-facebook"></i></a>
                            </li>
                            <li>
                                <a href="#" class="w-7 h-7 sm:w-10 sm:h-10 md:w-14 md:h-14 flex items-center bg-primary justify-center text-white rounded-full text-lg sm:text-xl md:text-3xl"><i class="fa-brands fa-tiktok"></i></a>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- the vertical line -->
                <div class="h-full w-2 bg-primary">

                </div>
                <!-- the right content -->
                <div class="h-full w-1/2">
                    <ul class="w-full h-full flex flex-col justify-center gap-1">
                        <li class="flex items-center gap-2">
                            <!-- the icon -->
                            <span class="w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full text-sm sm:text-lg md:text-xl text-white bg-primary">
                                <i class="fa-solid fa-phone"></i>
                            </span>
                            <span class="font-light text-sm sm:text-lg md:text-xl">+251939209166</span>
                        </li>
                        <li class="flex items-center gap-2">
                            <!-- the icon -->
                            <span class="w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full text-sm sm:text-lg md:text-xl text-white bg-primary">
                                <i class="fa-solid fa-globe"></i>
                            </span>
                            <span class="font-light text-sm sm:text-lg md:text-xl">
                                www.natenael-haylemariam.com
                            </span>
                        </li>
                        <li class="flex items-center gap-2">
                            <!-- the icon -->
                            <span class="w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full text-sm sm:text-lg md:text-xl text-white bg-primary">
                                <i class="fa-solid fa-location-dot"></i>
                            </span>
                            <span class="font-light text-sm sm:text-lg md:text-xl">Ethiopia | Addis Abeba</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- the bottom  -->
        <div class="mt-auto w-full h-1/4 flex items-center justify-center">
            <!-- the right one -->
            <div class="flex w-2/3 items-center justify-center ml-auto">
                <!-- the left content -->
                <div class="flex w-1/2 gap-2 py-2 items-center justify-center">
                    <!-- the logo -->
                    <Logo/>
                    <!-- the name with copyright -->
                    <div class="flex flex-col justify-center gap-0">
                        <!-- the name -->
                        <div class="text-2xl text-gray-200">
                            C5 Online Caffe
                        </div>
                        <div class="text-gray-300">
                            <span>&copy;</span> 2015 E.C
                        </div>
                    </div>
                </div>
                <!-- the right content -->
                <div class="w-1/2 py-2 px-4 h-full flex items-center justify-center">
                    <p class="text-sm leading-tight">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium vitae facilis perferendis tempora, recusandae odio animi. Eum laboriosam facere aperiam!
                    </p>
                </div>
            </div>
        </div>
    </footer>
</template>