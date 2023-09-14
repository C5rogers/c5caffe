<script setup>
import Chart from 'chart.js/auto'

const useChart_dataStore=chart_dataStore()
let chartInstance=null


onMounted(()=>{
    if(useChart_dataStore.$state.product_catagory_rating_rate){
        drawGraph()
    }
})


watch(()=>useChart_dataStore.$state.product_catagory_rating_rate,(newValue)=>{
    if(chartInstance){
        chartInstance.destroy()
    }
    drawGraph()
})

const drawGraph=()=>{
    chartInstance=new Chart(document.getElementById('ProductCatagoryRatingReport'),{
            type:'bar',
            data:{
                labels:useChart_dataStore.$state.product_catagory_rating_rate.labels,
                datasets:[
                    {
                        label:"Product Catagory Rating Analysis",
                        data:useChart_dataStore.$state.product_catagory_rating_rate.datasets.map(dataset=>dataset.data),
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
    <canvas id="ProductCatagoryRatingReport"></canvas>
</template>