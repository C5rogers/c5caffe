<script setup>


const useCartStore=cartStore()

onMounted(()=>{
    useCartStore.resetLogedUsersCartCount()
})

</script>

<template>
    <div class="h-screen">
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt, qui? A assumenda, voluptatum, quasi saepe exercitationem adipisci odio commodi excepturi aliquam ex velit, praesentium quo nisi non voluptate itaque fuga?</p>
    </div>
</template>