<template>
  <div class="p-2 h-screen bg-gray-100">
    <div class="mb-2 h-1/20 flex items-center justify-between rounded-xl bg-white shadow-lg">
      <button class="p-2 m-2 border rounded bg-indigo-500 text-white" @click="sidebarVisible = !sidebarVisible">
        {{ sidebarVisible ? 'Ocultar menú' : 'Mostrar menú' }}
      </button>
      <Topbar/>
    </div>
    <div class="flex flex-row h-19/20">
      <transition name="slide">
        <div v-if="sidebarVisible" class="mr-2 mb-2 p-2 w-1/2 md:w-1/6 transition-all duration-300 rounded-xl bg-white shadow-lg">
          <div class="flex flex-col">
            <button @click="contentOption = 'Inscribir socio'">Inscribir socio</button>
            <button @click="contentOption = 'Buscar socio'">Buscar socio</button>
            <button @click="contentOption = 'Imprimir carnets'">Imprimir carnets</button>
            <button @click="contentOption = 'Ultimos cambios'">Ultimos cambios</button>
          </div>
        </div>
      </transition>
      <div :class="['mb-2 rounded-xl bg-white shadow-lg transition-all duration-300', sidebarVisible ? 'w-1/2 md:w-5/6' : 'w-full']">
        <div v-if="contentOption === 'Inscribir socio'">
          <InscripcionSocio/>
        </div>
        <div v-else-if="contentOption === 'Buscar socio'">
          <BuscarSocio/>
        </div>
        <div v-else-if="contentOption === 'Imprimir carnets'">
          <CarnetsPdfGenerator/>
        </div>
        <div v-else-if="contentOption === 'Ultimos cambios'">
          <UltimosCambios/>
        </div>
        <div v-else>
          Not A/B/C
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
  import { ref } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import InscripcionSocio from "@/components/personal/InscripcionSocio.vue";
  import BuscarSocio from "@/components/personal/BuscarSocio.vue";
  import UltimosCambios from "@/components/personal/UltimosCambios.vue";
  import {isauth} from "@/services/auth.js";
  import Topbar from '@/components/personal/Topbar.vue';
  import CarnetsPdfGenerator from "@/components/personal/CarnetsPdfGenerator.vue";
  const router = useRouter()
  const route = useRoute();
  const sidebarVisible = ref(true)
  const contentOption = ref("")
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
/* Animación opcional para la transición */
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}
.slide-enter-from, .slide-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
</style>