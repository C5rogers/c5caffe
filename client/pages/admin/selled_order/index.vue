<script setup>
const useChart_dataStore=chart_dataStore()
const useAdminSelledOrderStore=adminSelledOrderStore()

onMounted(async()=>{
    await useChart_dataStore.getChartData()
    await useAdminSelledOrderStore.getSelledOrders('')
})

definePageMeta({
    layout:"admin"
})
</script>

<template>
    <Head>
        <Title>
            C5 Online Caffe | Admin | Selled Order
        </Title>
        <Meta name="description" content="This is where the admin get information about his products which is selled to the client successfully" />
    </Head>
    <!-- the whole container -->
    <div class="w-full h-full relative flex gap-3">
        <!-- the left one -->
        <div class="w-3/4 h-full mt-1 flex flex-col gap-2 justify-center">
            <!-- the title -->
            <div class="ml-1 capitalize font-Roboto">
                All Selled Orders 
            </div>
            <div
            class="w-full min-h-[70vh] overflow-y-auto"
            >
                <!-- the table here -->
                <AdminSelledOrderTable/>
            </div>
        </div>
        <!-- the right one -->
        <div class="w-1/4 mt-7 h-full rounded-xl p-3 pb-5 bg-white flex flex-col gap-1">
            <!-- the title -->
            <div class="w-full border-b font-Roboto font-light pb-1">
                Product Sales Report
            </div>
            <!-- the analisis -->
            <div class="w-full h-full flex items-center">
                <AdminSelledOrderReportGraph />
            </div>
        </div>
    </div>
</template>