<template>
  <div id="app">
    app.vue
    <router-view></router-view>
  </div>
</template>

<script setup>
  import sayHello from "@/services/api_blog.js";
  import { ref } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  const router = useRouter()
  console.log(router)
  const route = useRoute();
  sayHello()
      .then(data => {
        console.log("HOLA")
      })
      .catch(error =>{
        console.log("token expired or not found")
        router.push("/login")
      })
</script>

<style>
/* Tus estilos aquí */
</style>