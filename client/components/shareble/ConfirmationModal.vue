<script setup>
import {
  Modal,
  Ripple,
  initTE,
} from "tw-elements";

onMounted(()=>{
    initTE({
        Modal,
        Ripple
    })
})
const emit=defineEmit(['confirmation-result'])

const props=defineProps({
    title:{
        type:String,
    },
    message:{
        type:String
    },
    leftMode:{
        type:Boolean,
        default:true
    }
})

</script>


<template>
    <!-- modal top left -->
    <div
    data-te-modal-init
    class="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
    id="leftTopModal"
    tabindex="-1"
    aria-labelledby="leftTopModalLabel"
    aria-hidden="true"
    v-if="leftMode"
    >
        <!-- the dialog box -->
        <div
        
        data-te-modal-dialog-ref
        class="pointer-events-none absolute left-7 h-auto w-full translate-x-[-100%] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]"
        >

        </div>
    </div>
</template>