<script setup>
  import {ref} from "vue";
  import {getMemberByDNI} from "@/services/personal.js";
  const dni = ref("");
  const searchResult = ref("");

  const GetMemberByDNI = async function (){
    const data = {
      dni: dni.value,
    }
    await getMemberByDNI(data).then(response => {
      searchResult.value = response;
      console.log(response);
    })
    .catch(err => {
      console.log("BuscarSocio.vue: fallo busqueda: " + err)
      alert(err.response.data.error)
    })
  }
</script>

<template>
  <div class="login">
    <div class="login-box">
      <h1 class="title">Buscar Socio</h1>
      <p>Por DNI</p>
      <input class="input" placeholder="DNI" v-model="dni">
    </div>
      <button class="button" @click="GetMemberByDNI()">Inscribir</button>
  </div>
</template>

<style scoped>

</style>