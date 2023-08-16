<script setup>
const router=useRouter()
const handleGoHome=()=>{
router.push('/')
}
</script>

<template>
  <!-- the whole container -->
  <div class="w-full h-fit md:h-screen  flex">
    <!-- the left -->
    <div class="hidden w-1/2 md:w-1/3 h-full md:flex items-center justify-center relative">
      <!-- the logo -->
      <div class="absolute top-3 left-3">
        <Logo @click="handleGoHome"/>
      </div>
      <!-- the image -->
      <img src="../assets/images/the cart.jpeg" class="w-full h-full object-cover" alt="">
    </div>
    <!-- the absolute -->
    <div class="md:hidden absolute top-2 left-2 z-[1000px]">
      <Logo @click="handleGoHome"/>
    </div>
    <!-- the right -->
    <div class="px-10 py-5 flex items-center justify-center flex-col gap-5 w-full md:w-2/3">
      <!-- the title -->
      <Authtitle/>
      <slot/>
    </div>
  </div>
</template>

<style scoped></style>
