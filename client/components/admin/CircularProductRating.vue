<script setup>
import Chart from 'chart.js/auto'

const useChart_dataStore=chart_dataStore()
onMounted(()=>{
    if(useChart_dataStore.$state.product_rating_rate){
        new Chart(document.getElementById('CircularProductRating'),{
            type:'pie',
            data:{
                labels:useChart_dataStore.$state.product_rating_rate.labels,
                datasets:[
                    {
                        label:'Product Rating Analysis',
                        data:useChart_dataStore.$state.product_rating_rate.datasets.map(dataset=>dataset.data),
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
})

</script>

<template>
    <canvas id="CircularProductRating"></canvas>
</template>