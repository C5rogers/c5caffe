<script setup>
import {Select,initTE} from 'tw-elements'

onMounted(()=>{
    initTE({
        Select
    })
})

const router=useRouter()
const handleGoHome=()=>{
    router.push('/')
}
const route=useRoute()
const route_controller=ref(route.name)

watch(()=>route.name,(newName)=>{
    route_controller.value=newName
})

</script>

<template>

    <footer class=" w-full h-fit sm:h-80 bg-primary text-white mt-auto relative shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] border-t"
    :class="{'hidden ':route_controller=='product'}"
    >
        <!-- the right box -->
        <div class="w-full md:w-3/4 h-fit sm:h-56 bg-gray-100 sm:bg-white text-primary ml-auto md:rounded-tl-xl flex justify-between items-center px-3 gap-5 relative">
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
            <div class="w-full md:w-3/4  h-full py-5 flex flex-col sm:flex-row items-center justify-center gap-5 font-Roboto ">

                <!-- the left content -->
                <div class="h-full w-3/4 sm:w-1/2 flex flex-col gap-1 items-center sm:items-start justify-center">
                    <!-- the main title -->
                    <div class="text-xl md:text-3xl lg:text-clit-4xl font-bold">
                    {{ $t('c5') }} {{ $t('online caffe') }}.
                    </div>
                    <!-- the location -->
                    <div class="text-lg md:text-xl lg:text-2xl font-light">
                       {{ $t('ethiopia') }} | {{ $t('addis abeba') }} 
                    </div>
                    <!-- the social media links -->
                    <div class="w-full flex items-center justify-center sm:justify-normal">
                        <ul class="w-fit  flex items-center gap-3">
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
                    <!-- the change locale selct option -->
                    <div class="mt-1">
                        <form>
                            <select data-te-select-init name="language" id="language" class="w-14 p-0" v-model="$i18n.locale">
                                <option value="en" class="capitalize font-Roboto">{{ $t('english') }}</option>
                                <option value="am" class="capitalize font-Roboto">{{ $t('amharic') }}</option>
                            </select>
                            <label data-te-select-label-ref>{{ $t('language') }}</label>
                        </form>
                    </div>
                </div>
                <!-- the vertical line -->
                <div class=" w-full h-2 sm:h-full sm:w-2 bg-primary">

                </div>
                <!-- the right content -->
                <div class="h-full w-3/4 sm:w-1/2">
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
                            <span class="font-light text-sm sm:text-lg md:text-xl">{{ $t("ethiopia") }} | {{ $t('addis abeba') }}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- the bottom  -->
        <div class="mt-auto w-full h-1/4 flex items-center justify-center">
            <!-- the right one -->
            <div class="flex flex-col sm:flex-row md:w-2/3 items-center justify-center ml-auto">
                <!-- the left content -->
                <div class="flex w-1/2 h-fit gap-2  py-2 items-center justify-center">
                    <!-- the logo -->
                    <Logo/>
                    <!-- the name with copyright -->
                    <div class="flex flex-col justify-center gap-0">
                        <!-- the name -->
                        <div class="text-lg sm:text-2xl text-gray-200">
                            {{$t('c5')}} {{ $t('online caffe') }}
                        </div>
                        <div class="text-gray-300 text-xs sm:text-lg">
                            <span>&copy;</span> 2015 E.C
                        </div>
                    </div>
                </div>
                <!-- the horizontal -->
                <div class="sm:hidden w-3/4 h-[1px] bg-gray-600">

                </div>
                <!-- the right content -->
                <div class="sm:w-1/2 text-center sm:text-left text-gray-300 py-2 px-4 h-full flex items-center justify-center">
                    <p class="text-sm leading-tight">
                        {{ $t('user2 testimony') }}
                    </p>
                </div>
            </div>
        </div>
    </footer>
</template>