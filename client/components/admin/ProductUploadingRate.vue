<script setup>
import Chart from 'chart.js/auto'
const useChart_dataStore=chart_dataStore()
let chartInstance=null


onMounted(()=>{
    if(useChart_dataStore.$state.product_uploading_rate){
        drawGraph()
    }
})


watch(()=>useChart_dataStore.$state.product_uploading_rate,(newValue)=>{
    if(chartInstance){
        chartInstance.destroy()
    }
    drawGraph()
})

const drawGraph=()=>{
    chartInstance=new Chart(document.getElementById('ProductPostReport'),{
            type:'pie',
            data:{
                labels:useChart_dataStore.$state.product_uploading_rate.labels,
                datasets:[
                    {
                        label:"Product Posting Rate",
                        data:useChart_dataStore.$state.product_uploading_rate.data,
                        backgroundColor: ['#f57e16', '#f44336', '#9c27b0','#673ab7','#3f51b5','#2196f3','#03a9f4','#00bcd4','#009688','#4caf50','#8bc34a','#ffeb3b']
                    }
                ]
            },
            options:{
                responsive:true,
                maintainAspectRatio:false
            }
        })
}


</script>

<template>
    <canvas id="ProductPostReport"></canvas>
</template>