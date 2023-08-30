<script setup>
import {Ripple, initTE} from 'tw-elements'

onMounted(()=>{
    initTE({
        Ripple
    })
})

const props=defineProps({
    initialPage:{
        type:Number,
        default:1
    },
    totalPages:{
        type:Number,
        required:true
    },
    pageLimit:{
        type:Number,
        default:3
    },
    smallMode:{
        type:Boolean,
        default:false
    }
})

const emit=defineEmits(['change_page'])


const current_page=ref(props.initialPage)
const desplayed_pages=computed(()=>{
    const totalPages=props.totalPages
    const pageLimit=props.pageLimit
    const currentPage=current_page.value
    const start_page=Math.max(1,currentPage-Math.floor(pageLimit/2))
    const end_page=Math.min(totalPages,start_page+pageLimit-1)
    return Array.from({length:end_page-start_page+1},(_,i)=>start_page+i)
})

watch(()=>props.totalPages,(newTotalPage)=>{
    if(current_page.value>newTotalPage){
        current_page.value=1
    }
})

const handlePageClicked=(pagenumber)=>{
    current_page.value=pagenumber
    emit('change_page',pagenumber)
}

</script>

<template>

    <!-- pagination holder -->
    <div class="flex gap-2 items-center">
        <button 
        type="button" 
        data-te-ripple-init
        data-te-ripple-color="light"
        :disabled="current_page==1"
        @click="handlePageClicked(current_page-1)"
        class="py-1 w-16 sm:w-20 text-xs sm:text-sm flex items-center justify-center gap-1 px-1 border-[1px] rounded-md transition transform duration-200 hover:scale-105 hover:shadow-sm"
        :class="{'text-white bg-secondary border-none':current_page==1}"
        v-if="!smallMode"
        >
            <i class="fa fa-angle-left text-gray-600 " :class="{'text-white':current_page==1}"></i>
            <span>Previous</span>
        </button>
        <button 
        data-te-ripple-init
        data-te-ripple-color="light"
        type="button"
        v-for="page in desplayed_pages"
        :key="page"
        class="p-1 flex w-7 h-7 text-xs  items-center justify-center rounded-full border border-secondary transition transform ease-out duration-200 hover:scale-105 hover:shadow-sm "
        :class="{'text-white font-bold shadow-md bg-secondary border-none':page==current_page}"
        @click="handlePageClicked(page)"
        v-if="!smallMode"
        >
            <span>{{ page }}</span>
        </button>
        <button 
        type="button"
        data-te-ripple-init
        data-te-ripple-color="light"
        :disabled="current_page==totalPages"
        class="py-1 w-16 sm:w-20 flex text-xs sm:text-sm items-center justify-center gap-1 px-1 border-[1px] rounded-md transition transform duration-200 hover:scale-105 hover:shadow-sm"
        @click="handlePageClicked(current_page+1)"
        :class="{'text-white bg-secondary border-none':current_page==totalPages}"
        v-if="!smallMode"
        >
            <span>Next</span>
            <i class="fa fa-angle-right text-gray-600 " :class="{'text-white':current_page==totalPages}"></i>
        </button>
        <button
        v-if="smallMode"
        type="button" 
        data-te-ripple-init
        data-te-ripple-color="light"
        :disabled="current_page==1"
        @click="handlePageClicked(current_page-1)"
        class="p-1 text-xs sm:text-sm flex items-center justify-center gap-1 px-1 border-[1px] rounded-md transition transform duration-200 hover:scale-105 hover:shadow-sm"
        :class="{'text-white bg-secondary border-none':current_page==1}"
        >
            <i class="fa fa-angle-left text-gray-600 " :class="{'text-white':current_page==1}"></i>
        </button>
        <button
        v-if="smallMode"
        data-te-ripple-init
        data-te-ripple-color="light"
        type="button"
        v-for="page in desplayed_pages"
        :key="page"
        class="p-1 flex  text-xs  items-center justify-center rounded-full transition transform ease-out duration-200 hover:scale-105 hover:shadow-sm "
        :class="{'text-white font-bold shadow-md bg-secondary border-none':page==current_page}"
        @click="handlePageClicked(page)"
        >
            <span>{{ page }}</span>
        </button>
        <button
        type="button"
        data-te-ripple-init
        data-te-ripple-color="light"
        :disabled="current_page==totalPages"
        class="p-1 flex text-xs sm:text-sm items-center justify-center gap-1 px-1 border-[1px] rounded-md transition transform duration-200 hover:scale-105 hover:shadow-sm"
        @click="handlePageClicked(current_page+1)"
        :class="{'text-white bg-secondary border-none':current_page==totalPages}"
        v-if="smallMode"
        >
            <i class="fa fa-angle-right text-gray-600 " :class="{'text-white':current_page==totalPages}"></i>
        </button>
    </div>

</template>