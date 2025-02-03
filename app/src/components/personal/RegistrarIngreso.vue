<script setup>
import {ref} from "vue";

const dniref = ref("")
const typeref = ref("")
import {loadIncome} from "@/services/personal.js";

async function cargarIngreso(){
  if(dniref.value === ""){
    alert("Falta el DNI!")
    return
  }
  if(typeref.value === ""){
    alert("Falta especificar que tipo de ingreso es!")
    return
  }
  let dniClient = parseInt(dniref.value)
  let amount = 0
  switch (typeref.value) {
    case "Pileta":
      amount = 10;
      break
    case "Menu":
      amount = 20;
      break
    default:
      alert("error en el tipo de ingreso!");
      return
  }
  alert(await loadIncome({amount, dniClient}))
}
</script>

<template>
<div class="login">
  <div class="login-box">
    <h1 class="title">Registrar ingreso de dinero</h1>
    <input class="input" v-model="dniref" placeholder="DNI">
    <div/>
    <input type="radio" v-model="typeref" value="Pileta">Pileta
    <div/>
    <input type="radio" v-model="typeref" value="Menu">Menú
    <div/>
    <button class="button" @click="cargarIngreso()">Inscribir</button>
    <div class="text">
    </div>
  </div>
</div>
</template>

<style scoped>

</style>