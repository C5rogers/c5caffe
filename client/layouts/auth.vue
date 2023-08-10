<script setup>
const router=useRouter()
const handleGoHome=()=>{
router.push('/')
}
</script>

<template>
  <!-- the whole container -->
  <div class="w-full h-screen flex">
    <!-- the left -->
    <div class="w-1/2 md:w-1/3 h-full flex items-center justify-center relative">
      <!-- the logo -->
      <div class="absolute top-3 left-3">
        <Logo @click="handleGoHome"/>
      </div>
      <!-- the image -->
      <img src="../assets/images/the cart.jpeg" class="w-full h-full object-cover" alt="">
    </div>
    <!-- the right -->
    <div class="p-10 flex items-center justify-center flex-col gap-10 w-1/2 md:w-2/3">
      <!-- the title -->
      <Authtitle/>
      <slot/>
    </div>
  </div>
</template>

<style scoped></style>
