
export default defineNuxtRouteMiddleware((to,from)=>{
    if(process.client){
        const useAuthStore=authStore()
        const isProtectedRoute=useAuthStore.isProtectedPage(to.name)
        if(isProtectedRoute==true){
         if(useAuthStore.isAuthed==true){
            return
         }else{
             abortNavigation()
             return navigateTo('/auth/login')
         }
        }   
    }
})

//can have multiple middleware without the .global. extension
//use tehme in the page using the definePageMeta({middleware:'name'})