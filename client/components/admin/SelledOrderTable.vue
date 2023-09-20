<script setup>
    import {Ripple,initTE,Select,Input} from 'tw-elements'
    import {useToast} from 'vue-toastification'

    const useAdminSelledOrderStore=adminSelledOrderStore()
    const page_controller=ref(5)
    const search_controller=ref('')
    const router=useRouter()
    const toast=useToast()

    const forSelledOrderDeletion=ref({
        selled_order:{},
        title:'',
        message:'',
    })
    onMounted(()=>{
        initTE({
            Ripple,
            Select,
            Input
        })
    })

    const resetSearch=async()=>{
        search_controller.value=''
        await useAdminSelledOrderStore.getSelledOrders('')
    }

    const handlePageLimitChange=async()=>{
        useAdminSelledOrderStore.setSelledOrderPageLimit(page_controller.value)
        await useAdminSelledOrderStore.getSelledOrders(search_controller.value)
    }

    const handlePageChange=async(page)=>{
        useAdminSelledOrderStore.setSelledOrderCurrentPage(page)
        await useAdminSelledOrderStore.getSelledOrder(search_controller.value)
    }
    const handleSearchSelledOrder=async()=>{
       await useAdminSelledOrderStore.getSelledOrders(search_controller.value)
    }
    const handleDate=(date)=>{
        return date.substring(0,10)
    }
    const parseToNumber=(price)=>{
        const parsed=Number(price)
        if(isNaN(parsed)){
            return 0
        }else{
            return parsed
        }
    }

    const confirmSelledOrderDeletion=(selledOrder)=>{
        forSelledOrderDeletion.value.selled_order=selledOrder,
        forSelledOrderDeletion.value.title=`Deleting Selled Order!`,
        forSelledOrderDeletion.value.message=`Are you shure that you want to delete Selled Order with id ${selledOrder._id} ?`
    }
    const handleSelledOrderReload=async()=>{
        useAdminSelledOrderStore.resetSelledOrdersNetworkError()
        await useAdminSelledOrderStore.getSelledOrders('')
    }
    const handleSelledOrderDeletionConfirmation=async(result)=>{
        if(result.confirmation_result==true){
            const deletionResult=await useAdminSelledOrderStore.deleteSelledOrder(result.identifier._id)
            if(deletionResult==true){
                if(useAdminSelledOrderStore.$state.success_message){
                    toast.success(useAdminSelledOrderStore.$state.success_message,{
                        position:'top-left'
                    })
                    useAdminSelledOrderStore.resetSuccessMessage()
                }else{
                    toast.success(`Selled order with the id ${result.identifier._id} deleted successfully`,{
                        position:'top-left'
                    })
                }
                await useAdminSelledOrderStore.getSelledOrders(search_controller.value)
            }else{
                if(useAdminSelledOrderStore.$state.error_message){
                    toast.error(useAdminSelledOrderStore.$state.error_message,{
                        position:'bottom-left'
                    })
                    useAdminSelledOrderStore.resetErrorMessage()
                }else{
                    toast.error(`Unable to delete selled order with the id of ${result.identifier._id}!`)
                }
            }
        }
    }
</script>

<template>

</template>