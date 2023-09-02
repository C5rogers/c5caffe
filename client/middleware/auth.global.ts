
export default defineNuxtRouteMiddleware((to,from)=>{
    if(process.client){
        const useAuthStore=authStore()
        if(useAuthStore.$state.isAuthed==true){
            useAuthStore.getRoll()
            if(useAuthStore.$state.isAdmin=true && useAuthStore.$state.roll=='admin'){
                //for admin
                if(!(useAuthStore.isAdminPage(to.name))){
                    abortNavigation()
                    return navigateTo('/admin')
                }
            }else{
                //for user
                if(useAuthStore.isAdminPage(to.name)==true){
                    abortNavigation()
                    return navigateTo('/')
                }
            }
        }else{
            //for anonymous
            if(useAuthStore.isProtectedPage(to.name)==true  || useAuthStore.isAdminPage(to.name)==true){
                abortNavigation()
                return navigateTo('/auth/login')
            }
        }
    }
})

//can have multiple middleware without the .global. extension
//use tehme in the page using the definePageMeta({middleware:'name'})