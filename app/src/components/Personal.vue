<template>
  <div id="app">
    Personal.vue
  </div>
</template>

<script setup>
  import {hello} from "@/services/api_blog.js";
  import { ref } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  const router = useRouter()
  const route = useRoute();

  async function sayHello(){
    await hello()
      .then(data => {
        console.log(data)
      })
      .catch(error =>{
        console.log("token expired or not found")
        router.push("/login")
      })
  }
  sayHello()

</script>

<style>
/* Tus estilos aquí */
</style>