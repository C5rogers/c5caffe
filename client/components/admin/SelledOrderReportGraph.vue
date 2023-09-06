<script setup>
import Chart from 'chart.js/auto'

const useChart_dataStore=chart_dataStore()
onMounted(() => {
    if(useChart_dataStore.$state.selled_order_report){
        new Chart(document.getElementById('SellesReport'),{
            type:'line',
            data:{
                labels:useChart_dataStore.$state.selled_order_report.labels,
                datasets:[
                    {
                        label:'Sales Report',
                        data:useChart_dataStore.$state.selled_order_report.data,
                        borderColor: '#f57e16',
                        backgroundColor: '#f57e16',
                        fill: false,
                    }
                ]
            },
            options:{
                responsive: true,
                maintainAspectRatio: false,
            }
        })
    }
    
})

</script>

<template>
        <canvas id="SellesReport"></canvas>
</template>