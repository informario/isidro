<script setup>
import {cargarGastoCajaChica} from "@/services/api_personal.js";
import {ref} from "vue";
import {getAuthToken} from "@/services/api_blog.js";
const descripcion = ref("")
const monto = ref(0)
const MAX_GASTO_CAJA_CHICA = 10000
const botonCargarGastosCajaChica = async function (){
  await  cargarGastoCajaChica({descripcion:descripcion.value, monto:monto.value, username:localStorage.getItem("username")})
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
      <input class="input"  v-model="descripcion" placeholder="Descripcion">
      <div></div>
      <label >Monto: $</label>
      <input type="number" v-model="monto" min="0" max="MAX_GASTO_CAJA_CHICA">
      <div/>
      <button class="button" @click="botonCargarGastosCajaChica()">Cargar</button>
      <div class="text">
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>