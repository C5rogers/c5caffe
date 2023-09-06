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
    <div class="w-full max-h-[93vh] grid grid-cols-3 grid-rows-2 gap-3">
        <!-- the first is selled order report -->
        <div class="w-full h-full flex flex-col bg-white pb-10 rounded-xl p-5">
            <!-- the title -->
            <div class="font-Roboto w-full border-b pb-1 pl-3 text-xl capitalize">
                    Sells Report
            </div>
            <AdminSelledOrderReportGraph/>
        </div>
        <div class="w-full h-full flex flex-col bg-white rounded-xl pb-10 p-5">
            <!-- the title -->
            <div class="font-Roboto w-full border-b pb-1 pl-3 text-xl capitalize">
                    Cart Usage Report
            </div>
            <AdminUserCartUsageReport/>
        </div>
        <div class="w-full h-full flex flex-col bg-white rounded-xl pb-10 p-5">
            <!-- the title -->
            <div class="font-Roboto w-full border-b pb-1 pl-3 text-xl capitalize">
                Admin Product Uploading Rate
            </div>
            <AdminProductUploadingRate/>
        </div>
    </div>
</template>