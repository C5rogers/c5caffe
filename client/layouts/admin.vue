<script setup>

</script>

<template>
    <!-- the whole container -->
    <div class="w-full relative h-fit md:h-screen  flex">
        <!-- the sidenav -->
        <div class="w-[20%] fixed top-0 bottom-0 left-0 bg-gray-900">

        </div>
        <!-- the small header -->
        <div class="w-[80%] fixed top-0 right-0 h-12">

        </div>
        <!-- the body -->
        <div class="w-[80%] mt-12 p-3 ml-auto min-h-[90vh] overflow-y-scroll bg-gray-50">
            <slot/>
        </div>
    </div>
</template>