<script setup>
import Chart from 'chart.js/auto'

const useChart_dataStore=chart_dataStore()

onMounted(()=>{
    if(useChart_dataStore.$state.users_signedup_perweek){
        new Chart(document.getElementById('CircularSignedupUserReport'),{
            type:'doughnut',
            data:{
                labels:useChart_dataStore.$state.users_signedup_perweek.labels,
                datasets:[
                    {
                        label:'Signed up users/Month',
                        data:useChart_dataStore.$state.users_signedup_perweek.data,
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
    <canvas id="CircularSignedupUserReport"></canvas>
</template>