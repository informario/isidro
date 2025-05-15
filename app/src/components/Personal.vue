<template>
  <div id="app" class="container">
    <InscripcionSocio class="item"/>
    <RegistrarIngreso class="item"/>
    <BuscarSocio class="item"/>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import CargarGastos from "@/components/personal/CargarGastos.vue";
  import InscripcionSocio from "@/components/personal/InscripcionSocio.vue";
  import RegistrarIngreso from "@/components/personal/RegistrarIngreso.vue";
  import BuscarSocio from "@/components/personal/BuscarSocio.vue";
  import {isauth} from "@/services/auth.js";
  const router = useRouter()
  const route = useRoute();

  async function checkauth(){
    await isauth()
      .then(data => {
        console.log(data)
      })
      .catch(error =>{
        console.log("token expired or not found")
        router.push("/login")
        console.log("pushed")
      })
  }
  checkauth()
</script>

<style>
.container {
  display: flex;
  width: 100%;
  height: 100vh; /* Por ejemplo, para que ocupe toda la altura de la ventana */
  justify-content: space-between; /* Espacio entre elementos */
  align-items: center; /* Centra verticalmente los elementos */
  background-color: #f0f1f3;

}

.item {
  height: 70vh;
  flex: 1; /* Cada elemento ocupa la misma proporción del espacio */
  margin:30px;
  text-align: center; /* Opcional, para centrar texto */
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 3px;
  font-family: verdana, sans-serif;
  display: flex;
  flex-direction: column; /* Para alinear los elementos en una columna */
  justify-content: center; /* Alinea los elementos verticalmente */
  align-items: center;


}
.input{
   height: 30px;
   width: 270px;
   margin: 10px 50px ;
   border-radius: 3px;
   border-width: 1px;
   border-style: solid;
   border-color: darkgrey;
}
.button{
    margin: 30px auto;
    width: 90px;
    height: 30px;
    background-color: darkslateblue;
    color:white;
    border-style: none;
    border-radius: 3px;
}
</style>