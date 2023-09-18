<script setup>
import {Select,Ripple,initTE,Input} from 'tw-elements'
import {useToast} from 'vue-toastification'

const toast=useToast()
const search_controller=ref("")
const page_controller=ref(5)
const router=useRouter()

const reload_controller=ref(false)

const forUserDeleteConfirmation=ref({
    user:{},
    title:'',
    message:'',
    warning:''
})

const useAdminUsersStore=adminUsersStore()

onMounted(()=>{
    initTE({
        Select,
        Ripple,
        Input
    })
})

const resetSearch=async()=>{
    search_controller.value=''
    await useAdminUsersStore.getUsers('')
}

const handleChange=async()=>{
    useAdminUsersStore.setUsersPageLimit(page_controller.value)
    await useAdminUsersStore.getUsers(search_controller.value)
}


const handleChangePage=async(page)=>{
    useAdminUsersStore.setCurrentPage(page)
    await useAdminUsersStore.getUsers(search_controller.value)
}

const handleSearch=async()=>{
    await useAdminUsersStore.getUsers(search_controller.value)
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
const goToEditProduct=(user_id)=>{
    router.push(`/admin/user/edit/${user_id}`)
}

const confirmUserDeletion=(user)=>{
    forUserDeleteConfirmation.value.user=user
    forUserDeleteConfirmation.value.title=`Deleting ${user.username}`
    forUserDeleteConfirmation.value.message=`Re-inter the correct name of \"${user.username}\" to confirm`
    forUserDeleteConfirmation.value.warning=`Remember all the informations related to ${user.username} will going to be errased permanently!`
    setTimeout(() => {
        reload_controller.value=true
    }, 2000);
}
const handleUsersReload=async()=>{
    useAdminUsersStore.resetUsersNetworkError()
    await useAdminUsersStore.getUsers('')
}
const handleUserDeleteConfirmation=async(result)=>{
    if(result.confirmation_result==true){
        //make the request and show some toast
        const deletionResult=await useAdminUsersStore.deleteUser(result.user._id)
        if(deletionResult==true){
            if(useAdminUsersStore.$state.success_message){
                toast.success(useAdminUsersStore.$state.success_message,{
                    position:'top-left'
                })
                useAdminUsersStore.resetSuccessMessage()
            }else{
                toast.success(`${result.user.username} deleted successfully!`,{
                    position:'top-left'
                })
            }
            await useAdminUsersStore.getUsers(search_controller.value)
        }else{
            toast.error(`Unalble to delete ${result.user.username} from C5 Online caffe`,{
                position:'bottom-left'
            })
            if(useAdminUsersStore.$state.error_message){
                toast.error(useAdminUsersStore.$state.error_message,{
                    position:'bottom-left'
                })
                useAdminUsersStore.resetErrorMessage()
            }
        }
    }else if(result.confirmation_result==false){
        toast.error('Unable to confirm user deletion from C5 online caffe',{
            position:'bottom-left'
        })
    }
}

</script>

<template>
    <!-- the users container -->
    <div class="w-full h-full overflow-y-auto flex flex-col gap-1">
        <!-- the table controllers search and page controllers -->
        <div class="w-fit ml-auto flex gap-1 justify-between p-2">
            <!-- the pagination option -->
            <div>
                <select
                data-te-select-init
                name="pageLimit" id="ProductPageLimit"
                class="w-28 py-[9px] text-gray-600 border-[1px] bg-white  cursor-pointer border-gray-50 px-2 rounded-md text-center transition duration-200"
                @change="handleChange"
                v-model="page_controller"
                >
                    <option value="5">5</option>
                    <option value="15">15</option>
                    <option value="30">30</option>
                    <option value="50">50</option>
                    <option value="70">70</option>
                    <option value="100">100</option>
                </select>
            </div>
            <!-- the search input -->
            <div class="relative w-[14em] h-fit">
                <input type="text"
                v-model="search_controller"
                placeholder="Search..."
                @input="handleSearch"
                class="w-full py-2 rounded-md text-gray-600 border-[1px] transition duration-300 font-light px-8 bg-white focus:bg-gray-50 active:bg-gray-50 outline-none"
                >
                <div class="absolute left-2 top-3 text-gray-500 text-sm">
                    <i class="fa-solid fa-search"></i>
                </div>
                <!-- the cliear button -->
                <button
                class="absolute right-3 top-2 text-gray-500 text-sm"
                @click="resetSearch"
                v-show="search_controller.length>0"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="h-6 w-6 text-gray-500">
                        <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
        <!-- the table holder -->
        <div class="w-full h-full flex flex-col bg-white rounded-md  gap-1 ">
            <!-- the titles -->
            <div class="w-full grid gap-1 pl-1 py-2 px-1 grid-cols-7 rounded">
                <div class="font-bold text-gray-600 col-span-2">
                    Name
                </div>
                <div class="font-bold text-gray-600">
                    Email
                </div>
                <div class="font-bold text-gray-600">
                    Phone
                </div>
                <div class="font-bold text-gray-600">
                    Location
                </div>
                <div class="font-bold text-gray-600">
                    Roll
                </div>
                <div class="font-bold text-gray-600">
                    Actions
                </div>
            </div>
        </div>
        <!-- the users -->
        <div class="w-full min-h-[55vh] overflow-y-auto flex flex-col gap-[2px]" v-if="useAdminUsersStore.$state.is_users_loading==false&&useAdminUsersStore.$state.users.length>0 && useAdminUsersStore.$state.users_network_error==false">
            <!-- the rows -->
            <div
            class="w-full grid border-b-[1px] gap-1 pl-1 py-2 grid-cols-7 transition duration-200 rounded bg-gray-50 hover:bg-white"
            v-for="user in useAdminUsersStore.$state.users"
            :key="user._id"
            >
                <!-- the user -->
                <div class="flex col-span-2 items-center gap-2">
                    <!-- the image -->
                    <div class="w-8 h-8 flex justify-center items-center overflow-hidden rounded-full">
                        <img :src="user.profile" class="w-full h-full object-cover" :alt="user.username">
                    </div>
                    <!-- some details -->
                    <div class="flex flex-col gap-0 justify-center">
                        <!-- the name -->
                        <div class="font-bold text-sm text-gray-700 first-letter:capitalize">
                            {{ user.username }}
                        </div>
                        <!-- the sex -->
                        <div class="text-xs -mt-1 first-letter:capitalize text-gray-500">
                            <span v-if="user.gender">
                                <span v-if="user.gender=='m' || user.gender=='M'">
                                    Male
                                </span>
                                <span v-else>
                                    Female
                                </span>
                            </span>
                            <span v-else>
                                Unknown Gender
                            </span>
                        </div>
                        <div class="text-xs flex items-center gap-1 first-letter:capitalize text-gray-500">
                            <span class="h-2 w-2 rounded-full bg-green-500">

                            </span>
                            {{ handleDate(user.created_at) }}
                        </div>
                    </div>
                </div>
                <!-- the email -->
                <div class="text-gray-800 text-xs h-full w-full flex items-center font-light">
                    {{ user.email }}
                </div>
                <!-- the phone -->
                <div class="text-gray-800 text-xs h-full flex items-center font-light" v-if="user.phone">
                    {{ user.phone }}
                </div>
                <!-- the unknown phone -->
                <div class="text-gray-800 text-xs h-full flex items-center font-light" v-else>
                    Unknown
                </div>
                <!-- the location -->
                <div class="text-gray-800 text-xs h-full flex items-center font-light w-full" v-if="user.location">
                    {{ user.location }}
                </div>
                <!-- the unknown location -->
                <div class="text-gray-800 text-xs h-full flex items-center font-light" v-else>
                    Unknown
                </div>
                <!-- the roll -->
                <div class="text-gray-800 pl-2 text-xs h-full flex items-center font-light">
                    <span v-if="user.roll=='user'" class="w-fit flex items-center justify-center text-white bg-secondary rounded-full px-2">
                        {{ user.roll }}
                    </span>
                    <span v-else class="w-fit flex items-center justify-center text-white bg-green-400 rounded-full px-2">
                        {{ user.roll }}
                    </span>
                </div>
                <!-- the actions -->
                <div class="h-full flex gap-1 items-center">
                    <button
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        @click="goToEditProduct(user._id)"
                        class="flex px-2 text-white gap-1 items-center justify-center bg-green-600 py-1 rounded"
                        >
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" 
                                class="w-3 h-3"
                                viewBox="0 0 512 512">
                                    <path fill="currentColor" d="m497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4L.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3l262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3l-31.1-31.1L51.7 376H88v48z"/>
                                </svg>
                            </span>
                            <span class="text-xs">
                                Edit
                            </span>
                    </button>
                    <button
                        data-te-toggle="modal"
                        data-te-target="#userDeleteConfirmationModal"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        @click="confirmUserDeletion(user)"
                        class="flex px-2 text-white gap-1 items-center justify-center bg-red-400 py-1 rounded"
                        >
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" 
                                class="w-3 h-3" 
                                viewBox="0 0 448 512">
                                    <path fill="currentColor" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"/>
                                </svg>
                            </span>
                            <span class="text-xs">
                                Delete
                            </span>
                    </button>
                </div>
            </div>
        </div>
        <!-- the animation -->
        <div  class="min-h-[55vh] overflow-y-auto flex flex-col gap-[2px]" v-else-if="useAdminUsersStore.$state.is_users_loading==true && useAdminUsersStore.$state.users_network_error==false">
            <AnimationsAdminUsers/>
        </div>
        <!-- the empty one -->
        <div class="w-full h-[55vh] flex justify-center items-center" v-else-if="useAdminUsersStore.$state.users.length==0 && useAdminUsersStore.$state.is_users_loading==false && useAdminUsersStore.$state.users_network_error==false">
            <SharebleEmpty />
        </div>
        <!-- the network error -->
        <div class="min-h-[55vh] overflow-y-auto flex flex-col gap-[2px] items-center justify-center" v-else-if="useAdminUsersStore.$state.users_network_error==true&&useAdminUsersStore.$state.is_users_loading==false">
            <NetworkError @reload="handleUsersReload" />
        </div>
        <!-- the pagination holder -->
        <div class="w-full flex justify-end"
        v-if="useAdminUsersStore.$state.users.length>0 && useAdminUsersStore.$state.is_users_loading==false && useAdminUsersStore.$state.users_network_error==false"
        >
            <ShareblePagination :small-mode="true" :total-pages="parseToNumber(useAdminUsersStore.$state.users_total_page)" :initial-page="parseToNumber(useAdminUsersStore.$state.users_current_page)" :page-limit="4" @change_page="handleChangePage"/>
        </div>
    </div>
    <teleport to="body">
        <AdminDeleteUserConfirmation 
        :reload="reload_controller" 
        :user-information="forUserDeleteConfirmation.user" 
        :title="forUserDeleteConfirmation.title" 
        :message="forUserDeleteConfirmation.message" 
        @delete_user_confirmation_result="handleUserDeleteConfirmation"
        :warning="forUserDeleteConfirmation.warning" />
    </teleport>
</template>