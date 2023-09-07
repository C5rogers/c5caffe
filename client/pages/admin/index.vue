<script setup>

const useChart_dataStore=chart_dataStore()
onMounted(async()=>{
    await useChart_dataStore.getChartData()
})
definePageMeta({
    layout:"admin"
})
</script>

<template>
    <Head>
        <Title>
            C5 Online Caffe | Admin | Dashbord
        </Title>
        <Meta name="description" content="This is where all the activitys are controlled by the admin" />
    </Head>
    <div class="w-full h-full relative flex gap-3">
        <!-- the left  -->
        <div class="w-3/4 h-full flex flex-col gap-2 justify-center">
            <!-- the card and title container -->
            <div class="w-full h-fit flex flex-col gap-1 justify-center"> 
                <div class="text-xl ml-1 capitalize font-Roboto">
                    Overview 
                </div>
                <!-- the cards  -->
                <div class="w-full h-32 grid grid-cols-4 gap-3">
                    <!-- the users count -->
                    <div class="h-full w-full rounded-md bg-white flex flex-col">
                        <div class="w-full relative h-1/2 flex items-center pr-4">
                            <!-- the badge -->
                            <div class="absolute left-3 w-16 top-0 bottom-0 rounded-b-xl bg-gray-200 flex items-center justify-center">
                                <span
                                class="[&>svg]:h-7 [&>svg]:w-7 [&>svg]:text-gray-800 dark:[&>svg]:text-gray-300"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        class="h-3.5 w-3.5">
                                        <path
                                        fill-rule="evenodd"
                                        d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z"
                                        clip-rule="evenodd" />
                                        <path
                                        d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
                                    </svg>
                                </span>
                            </div>
                            <div class="ml-20 font-bold capitalize font-Roboto">
                                Users
                            </div>
                        </div>
                        <div class="w-full h-1/2 px-3 flex items-center">
                            <div class="w-full py-2 border-t flex items-center justify-between px-1 mt-auto">
                                <div class="text-xs font-bold font-Roboto">
                                    {{ useChart_dataStore.$state.users }}
                                </div>
                                <div class="text-xs font-bold font-Roboto text-gray-400 capitalize">
                                    customers
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- the product count -->
                    <div class="h-full rounded-md bg-white flex flex-col">
                        <div class="w-full relative h-1/2 flex items-center">
                            <div class="absolute left-3 w-16 top-0 bottom-0 rounded-b-xl bg-lime-200 flex items-center justify-center">
                                <span
                                class="[&>svg]:h-7 [&>svg]:w-7 [&>svg]:text-gray-800 dark:[&>svg]:text-gray-300"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        class="h-3.5 w-3.5">
                                        <path
                                        d="M21 6.375c0 2.692-4.03 4.875-9 4.875S3 9.067 3 6.375 7.03 1.5 12 1.5s9 2.183 9 4.875z" />
                                        <path
                                        d="M12 12.75c2.685 0 5.19-.586 7.078-1.609a8.283 8.283 0 001.897-1.384c.016.121.025.244.025.368C21 12.817 16.97 15 12 15s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.285 8.285 0 001.897 1.384C6.809 12.164 9.315 12.75 12 12.75z" />
                                        <path
                                        d="M12 16.5c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 001.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 001.897 1.384C6.809 15.914 9.315 16.5 12 16.5z" />
                                        <path
                                        d="M12 20.25c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 001.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 001.897 1.384C6.809 19.664 9.315 20.25 12 20.25z" />
                                    </svg>
                                </span>
                            </div>
                            <div class="ml-20 font-bold capitalize font-Roboto">
                                Products
                            </div>
                        </div>
                        <div class="w-full h-1/2 px-3 flex items-center">
                            <div class="w-full py-2 border-t flex items-center justify-between px-1 mt-auto">
                                <div class="text-xs font-bold font-Roboto">
                                    {{ useChart_dataStore.$state.products }}
                                </div>
                                <div class="text-xs font-bold font-Roboto text-lime-400 capitalize">
                                    Items
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- the rating count -->
                    <div class="h-full rounded-md bg-white flex flex-col">
                        <div class="w-full relative h-1/2 flex items-center">
                            <div class="absolute left-3 w-16 top-0 bottom-0 rounded-b-xl bg-red-200 flex items-center justify-center">
                                <span
                                class="[&>svg]:h-7 [&>svg]:w-7 [&>svg]:text-gray-800 dark:[&>svg]:text-gray-300"
                                >
                                    <svg 
                                        fill="currentColor"
                                        class="h-3.5 w-3.5"
                                        xmlns="http://www.w3.org/2000/svg" 
                                        viewBox="0 0 512 512"
                                        ><path fill="currentColor" d="M104 224H24c-13.255 0-24 10.745-24 24v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V248c0-13.255-10.745-24-24-24zM64 472c-13.255 0-24-10.745-24-24s10.745-24 24-24s24 10.745 24 24s-10.745 24-24 24zM384 81.452c0 42.416-25.97 66.208-33.277 94.548h101.723c33.397 0 59.397 27.746 59.553 58.098c.084 17.938-7.546 37.249-19.439 49.197l-.11.11c9.836 23.337 8.237 56.037-9.308 79.469c8.681 25.895-.069 57.704-16.382 74.757c4.298 17.598 2.244 32.575-6.148 44.632C440.202 511.587 389.616 512 346.839 512l-2.845-.001c-48.287-.017-87.806-17.598-119.56-31.725c-15.957-7.099-36.821-15.887-52.651-16.178c-6.54-.12-11.783-5.457-11.783-11.998v-213.77c0-3.2 1.282-6.271 3.558-8.521c39.614-39.144 56.648-80.587 89.117-113.111c14.804-14.832 20.188-37.236 25.393-58.902C282.515 39.293 291.817 0 312 0c24 0 72 8 72 81.452z"/>
                                    </svg>
                                </span>
                            </div>
                            <div class="ml-20 font-bold capitalize font-Roboto">
                                Ratings
                            </div>
                        </div>
                        <div class="w-full h-1/2 px-3 flex items-center">
                            <div class="w-full py-2 border-t flex items-center justify-between px-1 mt-auto">
                                <div class="text-xs font-bold font-Roboto">
                                    {{ useChart_dataStore.$state.product_ratings }}
                                </div>
                                <div class="text-xs font-bold font-Roboto text-red-400 capitalize">
                                    Product Ratings
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- the number of catagorys -->
                    <div class="h-full rounded-md bg-white flex flex-col">
                        <div class="w-full relative h-1/2 flex items-center">
                            <div class="absolute left-3 w-16 top-0 bottom-0 rounded-b-xl bg-blue-200 flex items-center justify-center">
                                <span
                                class="[&>svg]:h-7 [&>svg]:w-7 [&>svg]:text-gray-800 dark:[&>svg]:text-gray-300"
                                >
                                    <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    fill="currentColor"
                                    class="h-3.5 w-3.5"
                                    viewBox="0 0 640 512">
                                        <path fill="currentColor" d="M384 320H256c-17.67 0-32 14.33-32 32v128c0 17.67 14.33 32 32 32h128c17.67 0 32-14.33 32-32V352c0-17.67-14.33-32-32-32zM192 32c0-17.67-14.33-32-32-32H32C14.33 0 0 14.33 0 32v128c0 17.67 14.33 32 32 32h95.72l73.16 128.04C211.98 300.98 232.4 288 256 288h.28L192 175.51V128h224V64H192V32zM608 0H480c-17.67 0-32 14.33-32 32v128c0 17.67 14.33 32 32 32h128c17.67 0 32-14.33 32-32V32c0-17.67-14.33-32-32-32z"/>
                                    </svg>
                                </span>
                            </div>
                            <div class="ml-20 font-bold capitalize font-Roboto">
                                Catagorys
                            </div>
                        </div>
                        <div class="w-full h-1/2 px-3 flex items-center">
                            <div class="w-full py-2 border-t flex items-center justify-between px-1 mt-auto">
                                <div class="text-xs font-bold font-Roboto">
                                    {{ useChart_dataStore.$state.product_catagorys }}
                                </div>
                                <div class="text-xs font-bold font-Roboto text-blue-400 capitalize">
                                    Product Catagorys
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- the selles report graph -->
            <div class="w-full max-h-72 flex flex-col justify-center p-5 rounded-xl bg-white mt-2">
                <!-- the title -->
                <div class="font-Roboto ml-2 -mb-3 text-xl capitalize">
                    Sells Report
                </div>
                <AdminSelledOrderReportGraph/>
            </div>
            <!-- the button one  -->
            <div class="w-full flex flex-col h-fit gap-1 justify-center">
                <!-- the title -->
                <div class="text-xl ml-1 capitalize font-Roboto">
                    Current Services 
                </div>
                <div class="w-full h-32 grid grid-cols-4 gap-3">
                    <!-- the frist one -->
                    <div class="h-full w-full rounded-md bg-white flex flex-col justify-center items-center">
                        <!-- the image container -->
                        <div 
                        class="bg-gray-200 rounded-full w-16 h-16 [&>svg]:h-5 [&>svg]:w-5 flex justify-center items-center p-2 [&>svg]:text-gray-800 dark:[&>svg]:text-gray-300"
                        >
                            <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            class="h-3.5 w-3.5"
                            viewBox="0 0 512 512">
                                <path fill="currentColor" d="M192 208c0-17.67-14.33-32-32-32h-16c-35.35 0-64 28.65-64 64v48c0 35.35 28.65 64 64 64h16c17.67 0 32-14.33 32-32V208zm176 144c35.35 0 64-28.65 64-64v-48c0-35.35-28.65-64-64-64h-16c-17.67 0-32 14.33-32 32v112c0 17.67 14.33 32 32 32h16zM256 0C113.18 0 4.58 118.83 0 256v16c0 8.84 7.16 16 16 16h16c8.84 0 16-7.16 16-16v-16c0-114.69 93.31-208 208-208s208 93.31 208 208h-.12c.08 2.43.12 165.72.12 165.72c0 23.35-18.93 42.28-42.28 42.28H320c0-26.51-21.49-48-48-48h-32c-26.51 0-48 21.49-48 48s21.49 48 48 48h181.72c49.86 0 90.28-40.42 90.28-90.28V256C507.42 118.83 398.82 0 256 0z"/>
                            </svg>
                        </div>
                        <div
                        class="flex flex-col items-center font-Roboto justify-center gap-0"
                        >
                            <!-- the first title -->
                            <div class="text-xs capitalize font-bold">
                                Online Help & Guide
                            </div>
                            <div class="text-xs capitalize font-light">
                                24-7 support 
                            </div>
                        </div>
                    </div>
                    <!-- the second one -->
                    <div class="h-full w-full rounded-md bg-white flex flex-col justify-center items-center">
                        <!-- the image container -->
                        <div
                        class="bg-lime-200 rounded-full w-16 h-16 [&>svg]:h-5 [&>svg]:w-5 flex justify-center items-center p-2 [&>svg]:text-gray-800 dark:[&>svg]:text-gray-300"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" 
                            class="h-3.5 w-3.5"
                            viewBox="0 0 512 512">
                                <path fill="currentColor" d="M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4c32.7 12.3 69 19.4 107.4 19.4c141.4 0 256-93.1 256-208S397.4 32 256 32zM128 272c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32zm128 0c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32zm128 0c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32z"/>
                            </svg>
                        </div>
                        <div
                        class="flex flex-col items-center font-Roboto justify-center gap-0"
                        >
                            <!-- the first title -->
                            <div class="text-xs capitalize font-bold">
                                Real Time Chat
                            </div>
                            <div class="text-xs capitalize font-light">
                                Directly with the admin
                            </div>
                        </div>
                    </div>
                    <!-- the 3rd one -->
                    <div class="h-full w-full rounded-md bg-white flex flex-col justify-center items-center">
                        <!-- the image container -->
                        <div
                        class="bg-red-200 rounded-full w-16 h-16 [&>svg]:h-5 [&>svg]:w-5 flex justify-center items-center p-2 [&>svg]:text-gray-800 dark:[&>svg]:text-gray-300"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" 
                            class="h-3.5 w-3.5"
                            viewBox="0 0 576 512">
                                <path fill="currentColor" d="M504.717 320H211.572l6.545 32h268.418c15.401 0 26.816 14.301 23.403 29.319l-5.517 24.276C523.112 414.668 536 433.828 536 456c0 31.202-25.519 56.444-56.824 55.994c-29.823-.429-54.35-24.631-55.155-54.447c-.44-16.287 6.085-31.049 16.803-41.548H231.176C241.553 426.165 248 440.326 248 456c0 31.813-26.528 57.431-58.67 55.938c-28.54-1.325-51.751-24.385-53.251-52.917c-1.158-22.034 10.436-41.455 28.051-51.586L93.883 64H24C10.745 64 0 53.255 0 40V24C0 10.745 10.745 0 24 0h102.529c11.401 0 21.228 8.021 23.513 19.19L159.208 64H551.99c15.401 0 26.816 14.301 23.403 29.319l-47.273 208C525.637 312.246 515.923 320 504.717 320zM408 168h-48v-40c0-8.837-7.163-16-16-16h-16c-8.837 0-16 7.163-16 16v40h-48c-8.837 0-16 7.163-16 16v16c0 8.837 7.163 16 16 16h48v40c0 8.837 7.163 16 16 16h16c8.837 0 16-7.163 16-16v-40h48c8.837 0 16-7.163 16-16v-16c0-8.837-7.163-16-16-16z"/>
                            </svg>
                        </div>
                        <div
                        class="flex flex-col items-center font-Roboto justify-center gap-0"
                        >
                            <!-- the first title -->
                            <div class="text-xs capitalize font-bold">
                                Online Shooping
                            </div>
                            <div class="text-xs capitalize font-light">
                                without any limitations 
                            </div>
                        </div>
                    </div>
                    <!-- the 4th one -->
                    <div class="h-full w-full rounded-md bg-white flex flex-col justify-center items-center">
                        <!-- the image container -->
                        <div
                        class="bg-blue-200 rounded-full w-16 h-16 [&>svg]:h-5 [&>svg]:w-5 flex justify-center items-center p-2 [&>svg]:text-gray-800 dark:[&>svg]:text-gray-300"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" 
                            class="h-3.5 w-3.5" 
                            viewBox="0 0 448 512">
                                <path fill="currentColor" d="M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29c0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29c-6 6.45-8.66 14.16-8.61 21.71c.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32c.05-7.55-2.61-15.27-8.61-21.71z"/>
                            </svg>
                        </div>
                        <div
                        class="flex flex-col items-center font-Roboto justify-center gap-0"
                        >
                            <!-- the first title -->
                            <div class="text-xs capitalize font-bold">
                                Product Alerts
                            </div>
                            <div class="text-xs capitalize font-light">
                                fast and roubest
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- the right one -->
        <div class="w-1/4 mt-7 h-full rounded-xl pb-5 bg-white flex flex-col gap-1">
            <!-- the user report -->
            <div class="w-full flex items-center justify-center">
                <AdminUserCartUsageReport/>
            </div>
            <!-- some discription -->
            <div class="w-full mt-3 flex px-2 flex-col gap-1">
                <!-- the title -->
                <div class="py-1 px-2 border-b">
                    <div class="font-bold ml-2 font-Roboto capitalize">
                        Users Cart Usage Report
                    </div>
                </div>
            </div>
            <!-- the product rating report -->
            <div class="w-full flex items-center justify-center">
                <AdminCircularProductRating/>
            </div>
            <!-- some discription -->
            <div class="w-full mt-3 flex px-2 flex-col gap-1">
                <!-- the title -->
                <div class="py-1 px-2 border-b">
                    <div class="font-bold ml-2 font-Roboto capitalize">
                        Product Uploading Rate Report
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>