<script setup>
import { ref } from 'vue';
const personalData = ref({
  dni: '',
  apellido: '',
  nombre: '',
  fecha_nacimiento: '',
  nacionalidad: '',
  sexo: '',
  direccion: {
    calle: '',
    numero: '',
    piso: '',
    departamento: '',
    partido: '',
    localidad: ''
  },
  contacto: {
    telefono: '',
    email: ''
  },
  observaciones: '',
  tiene_domicilio_en_san_isidro: false,
  causa_no_domicilio_san_isidro: '',
  inscripcion: '',
  suspendido_hasta: ''
});

const medicalData = ref({
  dosis_covid: '',
  obra_social: '',
  tipo_covertura_medica: '',
  condiciones: {
    marcapasos: false,
    infarto: false,
    anticoagulantes: false
  },
  enfermedades: '',
  discapacidades: '',
  grupo_sanguineo: ''
});

const emergencyContact = ref({
  nombre: '',
  parentesco: '',
  telefono: ''
});

defineExpose({
  personalData,
  medicalData,
  emergencyContact
});

</script>

<template>
  <form class="max-w-4xl mx-auto p-3 bg-white shadow">
      <div class="grid grid-cols-3 gap-2">
      <!-- Personal Data -->
      <div class="flex flex-col gap-2">
        <h2 class="text-lg font-semibold mb-1">Personal Data</h2>
        <input v-model="personalData.dni" type="number" placeholder="DNI" required class="input" />
        <input v-model="personalData.apellido" type="text" placeholder="Apellido" required class="input" />
        <input v-model="personalData.nombre" type="text" placeholder="Nombre" required class="input" />
        <input v-model="personalData.fecha_nacimiento" id="fecha_nacimiento" type="date" required class="input" />
        <select v-model="personalData.nacionalidad" required class="input">
          <option value="" disabled>Nacionalidad</option>
          <option value="Argentino">Argentino</option>
          <option value="otro">Otro</option>
        </select>
        <select v-model="personalData.sexo" required class="input">
          <option value="" disabled>Sexo</option>
          <option value="Hombre">Hombre</option>
          <option value="Mujer">Mujer</option>
          <option value="Otro">Otro</option>
        </select>
        <h3 class="font-medium mt-1">Dirección</h3>
        <input v-model="personalData.direccion.calle" type="text" placeholder="Calle" required class="input" />
        <input v-model="personalData.direccion.numero" type="number" placeholder="Número" required class="input" />
        <input v-model="personalData.direccion.piso" type="number" placeholder="Piso" class="input" />
        <input v-model="personalData.direccion.departamento" type="text" placeholder="Departamento" class="input" />
        <input v-model="personalData.direccion.partido" type="text" placeholder="Partido" required class="input" />
        <input v-model="personalData.direccion.localidad" type="text" placeholder="Localidad" required class="input" />
        <h3 class="font-medium mt-1">Contacto</h3>
        <input v-model="personalData.contacto.telefono" type="number" placeholder="Teléfono" required class="input" />
        <input v-model="personalData.contacto.email" type="email" placeholder="Email" class="input" />
        <input v-model="personalData.observaciones" type="text" placeholder="Observaciones" class="input" />
        <label class="flex items-center gap-1">
          <input v-model="personalData.tiene_domicilio_en_san_isidro" type="checkbox" class="checkbox" />
          ¿Domicilio en San Isidro?
        </label>
        <input v-model="personalData.causa_no_domicilio_san_isidro" type="text" placeholder="Causa no domicilio San Isidro" class="input" />
      </div>
      <!-- Medical Data -->
      <div class="flex flex-col gap-2">
        <h2 class="text-lg font-semibold mb-1">Medical Data</h2>
        <input v-model="medicalData.dosis_covid" type="number" placeholder="Dosis COVID" class="input" />
        <input v-model="medicalData.obra_social" type="text" placeholder="Obra social" class="input" />
        <input v-model="medicalData.tipo_covertura_medica" type="text" placeholder="Tipo cobertura médica" class="input" />
        <label class="flex items-center gap-2">
          <input v-model="medicalData.condiciones.marcapasos" type="checkbox" class="checkbox" />
          Marcapasos
        </label>
        <label class="flex items-center gap-2">
          <input v-model="medicalData.condiciones.infarto" type="checkbox" class="checkbox" />
          Infarto
        </label>
        <label class="flex items-center gap-2">
          <input v-model="medicalData.condiciones.anticoagulantes" type="checkbox" class="checkbox" />
          Anticoagulantes
        </label>
        <input v-model="medicalData.enfermedades" type="text" placeholder="Enfermedades" class="input" />
        <input v-model="medicalData.discapacidades" type="text" placeholder="Discapacidades" class="input" />
        <select v-model="medicalData.grupo_sanguineo" required class="input">
          <option value="" disabled>Grupo sanguíneo</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>
      </div>
      <!-- Emergency Contact -->
      <div class="flex flex-col gap-2">
        <h2 class="text-lg font-semibold mb-1">Emergency Contact</h2>
        <input v-model="emergencyContact.nombre" type="text" placeholder="Nombre" required class="input" />
        <input v-model="emergencyContact.parentesco" type="text" placeholder="Parentesco" class="input" />
        <input v-model="emergencyContact.telefono" type="number" placeholder="Teléfono" required class="input" />
      </div>
    </div>
  </form>
</template>

<style scoped>

</style>