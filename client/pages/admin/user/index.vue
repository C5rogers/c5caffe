<script setup>
import {useToast} from 'vue-toastification'
import {Ripple,initTE} from 'tw-elements'

const useChart_dataStore=chart_dataStore()
const useAdminUsersStore=adminUsersStore()

onMounted(async() => {
   await useChart_dataStore.getChartData()
   await useAdminUsersStore.getUsers('')
   initTE({
    Ripple
   })
})

const toast=useToast()

definePageMeta({
    layout:"admin"
})
</script>

<template>
    <Head>
        <Title>
            C5 Online Caffe | Admin | User
        </Title>
        <Meta name="description" content="This is where the admin get information about his client and there actirvity" />
    </Head>
    <div class="w-full h-full relative flex gap-3">
        <!-- the left one -->
        <div class="w-3/4 h-full mt-1 flex flex-col gap-2 justify-center">
            <div class="ml-1 capitalize font-Roboto">
                All Users 
            </div>
            <div
            class="w-full min-h-[70vh] overflow-y-auto"
            >
                <AdminAllUsersTable/>
            </div>
        </div>
        <!-- the right one -->
        <div class="w-1/4 mt-7 h-full rounded-xl p-3 pb-5 bg-white flex flex-col gap-1">
            <!-- the title -->
            <div class="w-full border-b font-Roboto font-light pb-1">
                Product Posting Report
            </div>
            <!-- the user signup report -->
            <div class="w-full h-full flex items-center">
                <AdminSignedUpUserRate/>
            </div>
            
        </div>
    </div>
</template>