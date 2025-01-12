<script setup>
import {ref} from "vue";
import {loadpettycashexpense} from "@/services/personal.js";
const description = ref("")
const amount = ref(0)
const MAX_GASTO_CAJA_CHICA = 10000
const botonCargarGastosCajaChica = async function (){
  await loadpettycashexpense({description:description.value, amount:amount.value})
      .then()
      .catch(error =>{
          console.log("Cargargastos, error cargando gasto", error)
      })
}
</script>

<template>
  <div class="login">
    <div class="login-box">
      <h1 class="title">Cargar gastos</h1>
      <input class="input"  v-model="description" placeholder="Descripcion">
      <div></div>
      <label >Monto: $</label>
      <input type="number" v-model="amount" min="0" max="MAX_GASTO_CAJA_CHICA">
      <div/>
      <button class="button" @click="botonCargarGastosCajaChica()">Cargar</button>
      <div class="text">
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>