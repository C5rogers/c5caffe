<script setup>

</script>

<template>
    <Header/>
    <!-- this is the main content of the list -->
    <div class="container w-full mx-auto">
        <slot/>
    <BackToTopButton/>
    </div>
    <Footer/>
</template>