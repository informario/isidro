<template>
  <div class="page">
    <div class="topbar">
    <Topbar/>
  </div>
  <div class="contentsidebar">
    <div class="sidebar">
      <Sidebar/>
    </div>
    <div class="content">
      content
    </div>
  </div>
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
  import Topbar from '@/components/personal/Topbar.vue';
  import Sidebar from '@/components/personal/Sidebar.vue';
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
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden; /* opcional, según el caso */
}
.page{
  height: 100vh;
  border: solid yellow;
}
.topbar{
  height: 5%;
  border: solid green;
}
.contentsidebar{
  height:95%;
  border: solid magenta;
  display: flex;
  flex-direction: row;
}
.content{
  border: solid red;
}
.sidebar{
  border: solid blue;
  width: 200px;
}

</style>