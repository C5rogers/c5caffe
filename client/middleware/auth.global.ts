

export default defineNuxtRouteMiddleware((to,from)=>{
   const useAuthStore=authStore()
   const isProtectedRoute=useAuthStore.isProtectedPage(to.name)
   if(isProtectedRoute){
    if(useAuthStore.isAuthed){
        navigateTo(to.fullPath)
    }else{
        navigateTo('/auth/login')
    }
   }
})

//can have multiple middleware without the .global. extension
//use tehme in the page using the definePageMeta({middleware:'name'})