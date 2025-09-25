<script setup>
import { ref } from 'vue';
import {enroll} from "@/services/personal.js";
import FormSocio from "@/components/personal/FormSocio.vue";

const formSocioRef = ref(null);


const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    await enroll({
      personalData: formSocioRef.value.personalData,
      medicalData: formSocioRef.value.medicalData,
      emergencyContact: formSocioRef.value.emergencyContact
    });
    alert('Inscripción enviada correctamente');
  } catch (error) {
    alert('Error al enviar la inscripción');
    console.error(error);
  }
};
</script>

<template>
  <FormSocio ref="formSocioRef"/>
  <button @click="handleSubmit" class="mt-2 px-6 py-1 bg-blue-600 text-white hover:bg-blue-700">Enviar</button>
</template>

<style scoped>

</style>