<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { getMedicalData } from '@/services/seguridad.js';

const route = useRoute();
const dni = route.query.dni;

const result = ref(null);

// Make the API call and store the result
try {
  const data = await getMedicalData({ dni });
  result.value = data;
  console.log(data);
} catch (error) {
  console.error('Error fetching medical data:', error);
}
</script>

<template>
  <div>
    <h1>Datos Médicos</h1>
    <div v-if="result">
      <div>
        <strong>Condiciones:</strong>
        <ul>
          <li v-for="(value, key) in result.medicalData.condiciones" :key="key">
            <span v-if="value">{{ key }}</span>
          </li>
        </ul>
      </div>
      <p><strong>Enfermedades:</strong> {{ result.medicalData.enfermedades }}</p>
      <p><strong>Grupo sanguíneo:</strong> {{ result.medicalData.grupo_sanguineo }}</p>
      <p><strong>Obra social:</strong> {{ result.medicalData.obra_social }}</p>
    </div>
    <div v-else>
      <p>No se encontraron datos médicos para el DNI proporcionado.</p>
    </div>
  </div>
</template>

<style scoped>

</style>