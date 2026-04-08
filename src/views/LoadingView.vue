<template>
    <!-- <div class="relative z-50" role="dialog" aria-modal="true">
        <div class="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
            <img src="../assets/loading.png" class="h-20 w-20 animate-spin"/>
        </div>
        
    </div> -->

    <div class="relative z-50" role="dialog" aria-modal="true">
        <div class="fixed inset-0 bg-opacity-70 flex justify-center items-center bg-blue-600">
            <section class="relative place-items-center grid h-screen w-screen gap-4">   
            <!--   ITEM 1 -->
            <div class="bg-blue-500 w-48 h-48  absolute animate-ping rounded-full delay-5s shadow-xl"></div>
            <!--   ITEM 2 -->
            <div class="bg-blue-400 w-32 h-32 absolute animate-ping rounded-full shadow-xl"></div>
            <!--   ITEM 3 -->
            <div class="bg-white w-24 h-24 absolute rounded-full shadow-xl"></div>
            <!--   SVG LOGO -->
            <img src="../assets/logo.png" class="h-20 w-20 absolute"/>
                <!-- <svg xmlns="http://www.w3.org/2000/svg" class="text-blue-900 filter mix-blend-overlay h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg> -->

            </section>
        </div>
        
    </div>

    
</template>

<style scoped>
.fade {
    animation: fade 0.5s ease-in-out;
  }
</style>