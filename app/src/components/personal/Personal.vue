<template>
  <div class="h-screen border border-2 border-indigo-500">
    <div class="h-1/20 border border-2 border-indigo-500 flex items-center justify-between">
      <!-- Botón para mostrar/ocultar Sidebar solo en móviles -->
      <button
        class="p-2 m-2 border rounded bg-indigo-500 text-white"
        @click="sidebarVisible = !sidebarVisible"
      >
        {{ sidebarVisible ? 'Ocultar menú' : 'Mostrar menú' }}
      </button>
      <Topbar/>
    </div>
    <div class="flex flex-row h-19/20 border border-2 border-indigo-500">
      <!-- Sidebar: visible según sidebarVisible -->
      <transition name="slide">
        <div
          v-if="sidebarVisible"
          class="border border-2 border-indigo-500 w-1/2 md:w-1/6 transition-all duration-300"
        >
          <Sidebar class="flex flex-column"/>
        </div>
      </transition>
      <div
        :class="[
          'border border-2 border-indigo-500 transition-all duration-300',
          sidebarVisible ? 'w-1/2 md:w-5/6' : 'w-full'
        ]"
      >
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
  const sidebarVisible = ref(true)
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