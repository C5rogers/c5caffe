<script setup>
import Chart from 'chart.js/auto'

const useChart_dataStore=chart_dataStore()
let chartInstance=null

onMounted(() => {
    if(useChart_dataStore.$state.selled_order_report){
        drawGraph()
    }
    
})

watch(()=>useChart_dataStore.$state.selled_order_report,(newValue)=>{
    if(chartInstance){
        chartInstance.destroy()
    }
    drawGraph()
})

const drawGraph=()=>{
    chartInstance = new Chart(document.getElementById('SellesReport'),{
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

</script>

<template>
        <canvas id="SellesReport"></canvas>
</template>