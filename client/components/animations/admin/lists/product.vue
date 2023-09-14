<template>
    <!-- the row -->
    <div class="w-full grid border-b-[1px] gap-1 py-2 grid-cols-6 transition duration-200 rounded bg-gray-50">
        <!-- the product -->
        <div  class="flex col-span-2 items-center gap-1">
            <!-- the image -->
            <p
                class="w-10 rounded-md py-1 animate-[placeholder-wave_2s_linear_infinite] [mask-size:200%_100%]"
                style="
                -webkit-mask-image: linear-gradient(130deg, #000 55%, rgba(0, 0, 0, 0.8) 75%, #000 95%);
                mask-image: linear-gradient(130deg, #000 55%, rgba(0, 0, 0, 0.8) 75%, #000 95%);
                ">
                    <span
                        class="inline-block h-10 rounded-md w-full flex-auto cursor-wait bg-current align-middle text-base text-neutral-300 opacity-50 dark:text-neutral-50"></span>
            </p>
            <!-- some description -->
            <div class="flex flex-col gap-0 justify-center">
                <!-- the name -->
                <p
                    class="w-[6em] rounded-md animate-[placeholder-wave_2s_linear_infinite] [mask-size:200%_100%]"
                    style="
                    -webkit-mask-image: linear-gradient(130deg, #000 55%, rgba(0, 0, 0, 0.8) 75%, #000 95%);
                    mask-image: linear-gradient(130deg, #000 55%, rgba(0, 0, 0, 0.8) 75%, #000 95%);
                    ">
                        <span
                            class="inline-block h-3 rounded-md w-full flex-auto cursor-wait bg-current align-middle text-base text-neutral-300 opacity-50 dark:text-neutral-50"></span>
                    </p>
                <!-- the description -->
                <p
                class="w-[10em] rounded-md animate-[placeholder-wave_2s_linear_infinite] [mask-size:200%_100%]"
                style="
                -webkit-mask-image: linear-gradient(130deg, #000 55%, rgba(0, 0, 0, 0.8) 75%, #000 95%);
                mask-image: linear-gradient(130deg, #000 55%, rgba(0, 0, 0, 0.8) 75%, #000 95%);
                ">
                    <span
                        class="inline-block h-2  rounded-md w-full flex-auto cursor-wait bg-current align-middle text-base text-neutral-300 opacity-50 dark:text-neutral-50"></span>
                </p>
                <p
                class="w-[5em] rounded-md animate-[placeholder-wave_2s_linear_infinite] [mask-size:200%_100%]"
                style="
                -webkit-mask-image: linear-gradient(130deg, #000 55%, rgba(0, 0, 0, 0.8) 75%, #000 95%);
                mask-image: linear-gradient(130deg, #000 55%, rgba(0, 0, 0, 0.8) 75%, #000 95%);
                ">
                    <span
                        class="inline-block h-1  rounded-md w-full flex-auto cursor-wait bg-current align-middle text-base text-neutral-300 opacity-50 dark:text-neutral-50"></span>
                </p>
            </div>
        </div>
        <!-- the price -->
        <div class="text-gray-700 h-full flex items-center font-light">
            <p
                class="w-[3em] rounded-md animate-[placeholder-wave_2s_linear_infinite] [mask-size:200%_100%]"
                style="
                -webkit-mask-image: linear-gradient(130deg, #000 55%, rgba(0, 0, 0, 0.8) 75%, #000 95%);
                mask-image: linear-gradient(130deg, #000 55%, rgba(0, 0, 0, 0.8) 75%, #000 95%);
                ">
                    <span
                        class="inline-block h-2  rounded-md w-full flex-auto cursor-wait bg-current align-middle text-base text-neutral-300 opacity-50 dark:text-neutral-50"></span>
                </p>
        </div>
        <!-- the catagory -->
        <div class="h-full flex items-center">
            <p
                class="w-[4em] rounded-md animate-[placeholder-wave_2s_linear_infinite] [mask-size:200%_100%]"
                style="
                -webkit-mask-image: linear-gradient(130deg, #000 55%, rgba(0, 0, 0, 0.8) 75%, #000 95%);
                mask-image: linear-gradient(130deg, #000 55%, rgba(0, 0, 0, 0.8) 75%, #000 95%);
                ">
                    <span
                        class="inline-block h-2  rounded-md w-full flex-auto cursor-wait bg-current align-middle text-base text-neutral-300 opacity-50 dark:text-neutral-50"></span>
                </p>
        </div>
        <!-- the rating -->
        <div class="h-full flex items-center">
            <p
                class="w-[6em] rounded-md animate-[placeholder-wave_2s_linear_infinite] [mask-size:200%_100%]"
                style="
                -webkit-mask-image: linear-gradient(130deg, #000 55%, rgba(0, 0, 0, 0.8) 75%, #000 95%);
                mask-image: linear-gradient(130deg, #000 55%, rgba(0, 0, 0, 0.8) 75%, #000 95%);
                ">
                    <span
                        class="inline-block h-2  rounded-md w-full flex-auto cursor-wait bg-current align-middle text-base text-neutral-300 opacity-50 dark:text-neutral-50"></span>
                </p>
        </div>
        <!-- the action -->
        <div class="h-full flex gap-1 items-center">
            <p
                class="w-4 rounded-md animate-[placeholder-wave_2s_linear_infinite] [mask-size:200%_100%]"
                style="
                -webkit-mask-image: linear-gradient(130deg, #000 55%, rgba(0, 0, 0, 0.8) 75%, #000 95%);
                mask-image: linear-gradient(130deg, #000 55%, rgba(0, 0, 0, 0.8) 75%, #000 95%);
                ">
                    <span
                        class="inline-block h-2  rounded-md w-full flex-auto cursor-wait bg-current align-middle text-base text-neutral-300 opacity-50 dark:text-neutral-50"></span>
                </p>
                <p
                class="w-4 rounded-md animate-[placeholder-wave_2s_linear_infinite] [mask-size:200%_100%]"
                style="
                -webkit-mask-image: linear-gradient(130deg, #000 55%, rgba(0, 0, 0, 0.8) 75%, #000 95%);
                mask-image: linear-gradient(130deg, #000 55%, rgba(0, 0, 0, 0.8) 75%, #000 95%);
                ">
                    <span
                        class="inline-block h-2  rounded-md w-full flex-auto cursor-wait bg-current align-middle text-base text-neutral-300 opacity-50 dark:text-neutral-50"></span>
                </p>
        </div>
    </div>
</template>